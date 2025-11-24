import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
        return NextResponse.json({ error: "Company ID required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('message_logs')
        .select(`
            *,
            campaigns (name),
            automations (name)
        `)
        .eq('company_id', companyId)
        .order('sent_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to flatten relations
    const formattedData = data.map((log: any) => ({
        id: log.id,
        recipient: log.recipient,
        type: log.type,
        campaign: log.campaigns?.name || log.automations?.name || '-',
        status: log.status,
        sentAt: new Date(log.sent_at).toLocaleString()
    }));

    return NextResponse.json(formattedData);
}
