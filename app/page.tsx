import { Button } from "@whop/react/components";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
	// For MVP, we'll redirect to a demo dashboard
	// In production, you'd check auth and redirect to the user's company
	redirect("/dashboard/demo");

	return (
		<div className="flex items-center justify-center h-screen">
			<p>Redirecting to dashboard...</p>
		</div>
	);
}
