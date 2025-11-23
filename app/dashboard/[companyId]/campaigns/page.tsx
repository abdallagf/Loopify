import Link from "next/link";

export default function CampaignsPage() {
    // Mock Data
    const campaigns = [
        { id: 1, name: "Black Friday Sale", status: "Sent", sent: 12500, openRate: "24%", date: "Nov 24, 2025" },
        { id: 2, name: "Weekly Newsletter", status: "Scheduled", sent: 0, openRate: "-", date: "Nov 28, 2025" },
        { id: 3, name: "Product Launch", status: "Draft", sent: 0, openRate: "-", date: "-" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
                    <p className="text-gray-500">Manage your email and SMS blasts.</p>
                </div>
                <Link href="campaigns/create">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                        Create Campaign
                    </button>
                </Link>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 relative">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                                            campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {campaign.sent > 0 ? campaign.sent.toLocaleString() : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {campaign.openRate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {campaign.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
