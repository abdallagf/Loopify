import { NextResponse } from "next/server";

// Mock Database
let automations = [
    { id: 1, name: "Welcome Series", trigger: "New Member Join", status: "Active", active: 124, completed: 4500 },
    { id: 2, name: "Renewal Reminder", trigger: "Subscription Expiring (3 days)", status: "Active", active: 45, completed: 1200 },
    { id: 3, name: "Winback Flow", trigger: "Subscription Cancelled", status: "Paused", active: 0, completed: 890 },
];

export async function GET() {
    return NextResponse.json(automations);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newAutomation = {
        id: automations.length + 1,
        ...body,
        status: "Active",
        active: 0,
        completed: 0,
    };
    automations.push(newAutomation);
    return NextResponse.json(newAutomation, { status: 201 });
}
