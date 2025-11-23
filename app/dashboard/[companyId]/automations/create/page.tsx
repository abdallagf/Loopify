"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAutomationPage({
    params,
}: {
    params: Promise<{ companyId: string }>;
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [trigger, setTrigger] = useState("membership.created");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock API call
        await fetch("/api/automations", {
            method: "POST",
            body: JSON.stringify({ name, trigger }),
        });

        setLoading(false);
        // In a real app, we'd redirect to the list or the visual builder
        // For now, go back to list
        const { companyId } = await params;
        router.push(`/dashboard/${companyId}/automations`);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Automation</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Automation Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., Welcome Series"
                    />
                </div>

                <div>
                    <label htmlFor="trigger" className="block text-sm font-medium text-gray-700">
                        Trigger Event
                    </label>
                    <select
                        id="trigger"
                        value={trigger}
                        onChange={(e) => setTrigger(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    >
                        <option value="membership.created">New Member Join</option>
                        <option value="payment.succeeded">Payment Received</option>
                        <option value="payment.failed">Payment Failed</option>
                        <option value="membership.cancelled">Membership Cancelled</option>
                        <option value="membership.went_valid">Trial Converted</option>
                        <option value="membership.went_invalid">Access Revoked</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                        When this event happens on Whop, this automation will start.
                    </p>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Automation"}
                    </button>
                </div>
            </form>
        </div>
    );
}
