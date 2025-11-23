"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCampaignPage({
    params,
}: {
    params: Promise<{ companyId: string }>;
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock API call
        await fetch("/api/campaigns", {
            method: "POST",
            body: JSON.stringify({ name, subject, content }),
        });

        setLoading(false);
        const { companyId } = await params;
        router.push(`/dashboard/${companyId}/campaigns`);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Campaign</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Campaign Name (Internal)
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., Black Friday Sale"
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Email Subject Line
                    </label>
                    <input
                        type="text"
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., Don't miss out!"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Email Content
                    </label>
                    <textarea
                        id="content"
                        required
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="Write your email content here..."
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Campaign"}
                    </button>
                </div>
            </form>
        </div>
    );
}
