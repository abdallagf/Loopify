import { headers } from "next/headers";
import { whopsdk } from "@/lib/whop-sdk";

export default async function DashboardPage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	const { companyId } = await params;
	const { userId } = await whopsdk.verifyUserToken(await headers());

	// Mock Data for MVP
	const stats = [
		{ label: "Total Revenue", value: "$12,450", change: "+12%" },
		{ label: "Emails Sent", value: "45,231", change: "+8%" },
		{ label: "Open Rate", value: "24.8%", change: "+2.1%" },
		{ label: "Active Automations", value: "4", change: "0" },
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
				<p className="text-gray-500">Welcome back! Here's what's happening with your marketing.</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<div key={stat.label} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
						<h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
						<div className="mt-2 flex items-baseline">
							<span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
							<span className={`ml-2 text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
								{stat.change}
							</span>
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
					<h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
					<div className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
								<div>
									<p className="text-sm font-medium text-gray-900">Campaign "Black Friday" sent</p>
									<p className="text-xs text-gray-500">2 hours ago</p>
								</div>
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
									Completed
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
					<h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
					<div className="space-y-3">
						<button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
							Create New Campaign
						</button>
						<button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
							View Audience
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
