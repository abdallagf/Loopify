import { NextResponse } from "next/server";

// Mock Database
let campaigns = [
    { id: 1, name: "Black Friday Sale", status: "Sent", sent: 12500, openRate: "24%", date: "Nov 24, 2025" },
    { id: 2, name: "Weekly Newsletter", status: "Scheduled", sent: 0, openRate: "-", date: "Nov 28, 2025" },
    { id: 3, name: "Product Launch", status: "Draft", sent: 0, openRate: "-", date: "-" },
];

export async function GET() {
    return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newCampaign = {
        id: campaigns.length + 1,
        ...body,
        status: "Draft",
        sent: 0,
        openRate: "-",
        date: new Date().toLocaleDateString(),
    };
    campaigns.push(newCampaign);
    return NextResponse.json(newCampaign, { status: 201 });
}
