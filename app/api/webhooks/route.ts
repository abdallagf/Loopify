import { waitUntil } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { whopsdk } from "@/lib/whop-sdk";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";
import { sendSMS } from "@/lib/twilio";

export async function POST(request: NextRequest): Promise<Response> {
	try {
		// 1. Validate the webhook
		const requestBodyText = await request.text();
		const headers = Object.fromEntries(request.headers);

		// Whop SDK verifies the signature automatically here
		const webhookData = whopsdk.webhooks.unwrap(requestBodyText, { headers });

		// 2. Handle specific events
		if (webhookData.type === "membership.activated") {
			waitUntil(handleMembershipActivated(webhookData.data));
		}

		return new Response("OK", { status: 200 });
	} catch (error: any) {
		console.error("Webhook Error:", error.message);
		return new Response(`Webhook Error: ${error.message}`, { status: 400 });
	}
}

async function handleMembershipActivated(membership: any) {
	console.log("[MEMBERSHIP ACTIVATED]", membership.id);

	const companyId = membership.company_id;
	if (!companyId) return;

	// 1. Find Active Automations for this trigger
	const { data: automations, error } = await supabase
		.from('automations')
		.select('*')
		.eq('company_id', companyId)
		.eq('trigger_type', 'membership.activated')
		.eq('status', 'Active');

	if (error || !automations || automations.length === 0) {
		console.log("No active automations found for membership.activated");
		return;
	}

	// 2. Execute Automations
	for (const automation of automations) {
		console.log(`Executing automation: ${automation.name}`);

		// Parse the flow data to find the action
		// For MVP, we assume a simple 2-node flow: Trigger -> Action
		// In a real app, you'd traverse the graph.
		const flow = automation.flow_data;
		if (!flow || !flow.nodes) continue;

		// Find the action node (simplified logic)
		const actionNode = flow.nodes.find((n: any) => n.type === 'action');

		if (actionNode) {
			const actionType = actionNode.data?.type; // 'email' or 'sms'
			const recipientEmail = membership.email || membership.user?.email;
			// const recipientPhone = ... (if available)

			if (actionType === 'email' && recipientEmail) {
				try {
					await sendEmail({
						to: recipientEmail,
						subject: `Welcome to ${membership.company?.name || 'the community'}!`, // Dynamic subject
						html: `<p>Thanks for joining! We're glad to have you.</p>`, // Dynamic content
					});

					// Log success
					await supabase.from('message_logs').insert({
						company_id: companyId,
						recipient: recipientEmail,
						type: 'Email',
						automation_id: automation.id,
						status: 'Delivered'
					});

					// Update automation stats
					await supabase.rpc('increment_automation_stats', { automation_id: automation.id });

				} catch (err) {
					console.error("Failed to send automation email", err);
					await supabase.from('message_logs').insert({
						company_id: companyId,
						recipient: recipientEmail,
						type: 'Email',
						automation_id: automation.id,
						status: 'Failed'
					});
				}
			}
		}
	}
}
