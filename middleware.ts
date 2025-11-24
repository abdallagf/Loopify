import { NextResponse } from "next/server";
import { whopsdk } from "@/lib/whop-sdk";

export async function middleware(request: Request) {
    try {
        // Allow access to API routes for 'demo' company
        const url = new URL(request.url);
        const companyId = url.searchParams.get("companyId");
        if (companyId === "demo") {
            return NextResponse.next();
        }

        const { userId } = await whopsdk.verifyUserToken(request.headers);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export const config = {
    matcher: "/api/:path*",
};
