import { whopsdk } from "@/lib/whop-sdk";

export default async function AudiencePage({
    params,
}: {
    params: Promise<{ companyId: string }>;
}) {
    const { companyId } = await params;

    // Fetch real members from Whop
    let members: any[] = [];

    if (companyId === 'demo') {
        // Mock data for demo
        members = [
            { id: '1', name: "Demo User 1", email: "demo1@example.com", status: "Subscribed", joined: "11/24/2025", ltv: "$100" },
            { id: '2', name: "Demo User 2", email: "demo2@example.com", status: "Unsubscribed", joined: "11/20/2025", ltv: "$0" },
            { id: '3', name: "Demo User 3", email: "demo3@example.com", status: "Subscribed", joined: "11/15/2025", ltv: "$50" },
        ];
    } else {
        try {
            const memberships = await whopsdk.memberships.list({ company_id: companyId });
            members = memberships.data.map((m: any) => ({
                id: m.id,
                name: m.user?.name || m.user?.username || "Unknown",
                email: m.email || "No email",
                status: m.valid ? "Subscribed" : "Unsubscribed",
                joined: new Date(m.created_at * 1000).toLocaleDateString(),
                ltv: "$0",
            }));
        } catch (error) {
            console.error("Failed to fetch members:", error);
            // Fallback to empty or error state
        }
    }

    const segments = [
        { id: 1, name: "All Members", count: members.length },
        { id: 2, name: "VIP (LTV > $100)", count: 0 },
        { id: 3, name: "At Risk (No activity 30d)", count: 0 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Audience</h1>
                    <p className="text-gray-500">Manage your subscribers and segments.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50">
                        Import CSV
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                        Add Member
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Segments Sidebar */}
                <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4 h-fit">
                    <h3 className="font-semibold text-gray-900 mb-4">Segments</h3>
                    <ul className="space-y-2">
                        {segments.map((segment) => (
                            <li key={segment.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                <span className="text-sm text-gray-700">{segment.name}</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{segment.count}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-4 w-full text-sm text-blue-600 hover:text-blue-800 font-medium text-left">
                        + Create Segment
                    </button>
                </div>

                {/* Members List */}
                <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LTV</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.length > 0 ? (
                                members.map((member: any) => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                    <div className="text-sm text-gray-500">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${member.status === 'Subscribed' ? 'bg-green-100 text-green-800' :
                                                    member.status === 'Unsubscribed' ? 'bg-gray-100 text-gray-800' :
                                                        'bg-red-100 text-red-800'}`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {member.joined}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {member.ltv}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        No members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
