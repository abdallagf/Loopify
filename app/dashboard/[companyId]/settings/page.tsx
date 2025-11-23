export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Configure your email and SMS providers.</p>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Email Provider (SendGrid)</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="sendgrid-api-key" className="block text-sm font-medium text-gray-700">
                            API Key
                        </label>
                        <input
                            type="password"
                            id="sendgrid-api-key"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="SG.xxxxxxxxxxxxxxxx"
                        />
                    </div>
                    <div>
                        <label htmlFor="from-email" className="block text-sm font-medium text-gray-700">
                            From Email
                        </label>
                        <input
                            type="email"
                            id="from-email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="hello@yourbrand.com"
                        />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 text-sm">
                        Save Email Settings
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">SMS Provider (Twilio)</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="twilio-sid" className="block text-sm font-medium text-gray-700">
                            Account SID
                        </label>
                        <input
                            type="text"
                            id="twilio-sid"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="ACxxxxxxxxxxxxxxxx"
                        />
                    </div>
                    <div>
                        <label htmlFor="twilio-token" className="block text-sm font-medium text-gray-700">
                            Auth Token
                        </label>
                        <input
                            type="password"
                            id="twilio-token"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="xxxxxxxxxxxxxxxx"
                        />
                    </div>
                    <div>
                        <label htmlFor="from-number" className="block text-sm font-medium text-gray-700">
                            From Number
                        </label>
                        <input
                            type="text"
                            id="from-number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="+1234567890"
                        />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 text-sm">
                        Save SMS Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
