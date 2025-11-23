import { NextResponse } from "next/server";
import { whopsdk } from "@/lib/whop-sdk";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
        return NextResponse.json({ error: "Company ID is required" }, { status: 400 });
    }

    try {
        const memberships = await whopsdk.memberships.list({ company_id: companyId });

        // Transform to match our frontend model
        const members = memberships.data.map((m: any) => ({
            id: m.id,
            name: m.user?.name || m.user?.username || "Unknown",
            email: m.email || "No email",
            status: m.valid ? "Subscribed" : "Unsubscribed",
            joined: new Date(m.created_at * 1000).toLocaleDateString(),
            ltv: "$0", // Placeholder as LTV calculation might be complex
        }));

        return NextResponse.json(members);
    } catch (error) {
        console.error("Failed to fetch audience:", error);
        return NextResponse.json({ error: "Failed to fetch audience" }, { status: 500 });
    }
}
