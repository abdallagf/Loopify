import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { sendSMS } from "@/lib/twilio";
import { whopsdk } from "@/lib/whop-sdk";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();

    // Handle "Send Now" action
    if (body.action === "send") {
        const campaignId = body.id;
        const companyId = body.companyId;

        if (!companyId) {
            return NextResponse.json({ error: "Company ID required" }, { status: 400 });
        }

        // 1. Fetch Campaign
        const { data: campaign, error: campaignError } = await supabase
            .from('campaigns')
            .select('*')
            .eq('id', campaignId)
            .single();

        if (campaignError || !campaign) {
            return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
        }

        try {
            // 2. Fetch Audience from Whop
            const memberships = await whopsdk.memberships.list({ company_id: companyId });
            const members = memberships.data;

            // 3. Send Messages & Log
            let sentCount = 0;
            const logs = [];

            for (const member of members) {
                const m = member as any;
                const email = m.email || m.user?.email;
                const name = m.user?.name || m.user?.username || "Member";

                if (email && campaign.type === 'email') {
                    try {
                        await sendEmail({
                            to: email,
                            subject: campaign.subject || "New Update",
                            html: campaign.content || "<p>Hello!</p>",
                        });
                        sentCount++;
                        logs.push({
                            company_id: companyId,
                            recipient: email,
                            type: 'Email',
                            campaign_id: campaignId,
                            status: 'Delivered'
                        });
                    } catch (err) {
                        console.error(`Failed to send to ${email}`, err);
                        logs.push({
                            company_id: companyId,
                            recipient: email,
                            type: 'Email',
                            campaign_id: campaignId,
                            status: 'Failed'
                        });
                    }
                }
            }

            // 4. Batch Insert Logs
            if (logs.length > 0) {
                await supabase.from('message_logs').insert(logs);
            }

            // 5. Update Campaign Status
            await supabase
                .from('campaigns')
                .update({
                    status: 'Sent',
                    sent_count: sentCount,
                    scheduled_at: new Date().toISOString() // Using scheduled_at as sent_at for now
                })
                .eq('id', campaignId);

            return NextResponse.json({ success: true, sent: sentCount });

        } catch (error) {
            console.error("Failed to send campaign:", error);
            return NextResponse.json({ error: "Failed to send campaign" }, { status: 500 });
        }
    }

    // Handle "Create Draft" action
    // Remove 'action' from body before inserting
    const { action, ...campaignData } = body;

    const { data, error } = await supabase
        .from('campaigns')
        .insert([campaignData])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}
