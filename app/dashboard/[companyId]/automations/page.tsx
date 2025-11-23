import Link from "next/link";

export default function AutomationsPage() {
    // Mock Data
    const automations = [
        { id: 1, name: "Welcome Series", trigger: "New Member Join", status: "Active", active: 124, completed: 4500 },
        { id: 2, name: "Renewal Reminder", trigger: "Subscription Expiring (3 days)", status: "Active", active: 45, completed: 1200 },
        { id: 3, name: "Winback Flow", trigger: "Subscription Cancelled", status: "Paused", active: 0, completed: 890 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
                    <p className="text-gray-500">Set up trigger-based email/SMS flows.</p>
                </div>
                <Link href="automations/create">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                        Create Automation
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {automations.map((flow) => (
                    <div key={flow.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${flow.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                ${flow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {flow.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-1">{flow.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">Trigger: {flow.trigger}</p>

                        <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                            <div>
                                <span className="font-medium text-gray-900">{flow.active}</span> Active
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">{flow.completed}</span> Completed
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Edit Flow &rarr;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
