import { NextResponse } from "next/server";
import { whopsdk } from "@/lib/whop-sdk";

export async function middleware(request: Request) {
    try {
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
