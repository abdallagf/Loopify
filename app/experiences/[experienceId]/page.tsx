import { headers } from "next/headers";
import { whopsdk } from "@/lib/whop-sdk";

export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	const { experienceId } = await params;

	try {
		const headerStore = await headers();
		const headersPlain = Object.fromEntries(headerStore.entries());
		console.log("Headers received:", Object.keys(headersPlain)); // Debugging

		const { userId } = await whopsdk.verifyUserToken(headersPlain as any);
		const access = await whopsdk.users.checkAccess(experienceId, { id: userId });

		if (!access.has_access) {
			return (
				<div className="flex items-center justify-center h-screen bg-gray-50">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
						<p className="text-gray-500">You do not have access to this experience.</p>
					</div>
				</div>
			);
		}
	} catch (error: any) {
		return (
			<div className="p-4 bg-red-50 text-red-700">
				<h2 className="font-bold">Application Error</h2>
				<pre className="mt-2 text-sm overflow-auto">{JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}</pre>
				<p className="mt-2 text-xs">Message: {error.message}</p>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<div className="bg-white shadow rounded-lg overflow-hidden">
				<div className="px-4 py-5 sm:px-6 border-b border-gray-200">
					<h1 className="text-xl font-bold text-gray-900">Communication Preferences</h1>
					<p className="mt-1 text-sm text-gray-500">Manage how we contact you.</p>
				</div>

				<div className="px-4 py-5 sm:p-6 space-y-6">
					<div className="flex items-start">
						<div className="flex items-center h-5">
							<input
								id="email_marketing"
								name="email_marketing"
								type="checkbox"
								defaultChecked
								className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
							/>
						</div>
						<div className="ml-3 text-sm">
							<label htmlFor="email_marketing" className="font-medium text-gray-700">Email Marketing</label>
							<p className="text-gray-500">Receive updates, offers, and newsletters via email.</p>
						</div>
					</div>

					<div className="flex items-start">
						<div className="flex items-center h-5">
							<input
								id="sms_marketing"
								name="sms_marketing"
								type="checkbox"
								defaultChecked
								className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
							/>
						</div>
						<div className="ml-3 text-sm">
							<label htmlFor="sms_marketing" className="font-medium text-gray-700">SMS Notifications</label>
							<p className="text-gray-500">Receive urgent alerts and time-sensitive offers via text.</p>
						</div>
					</div>

					<div className="pt-4 border-t border-gray-200">
						<button className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							Save Preferences
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
