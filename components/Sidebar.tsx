"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  companyId: string;
}

export function Sidebar({ companyId }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: `/dashboard/${companyId}`, label: "Overview" },
    { href: `/dashboard/${companyId}/campaigns`, label: "Campaigns" },
    { href: `/dashboard/${companyId}/automations`, label: "Automations" },
    { href: `/dashboard/${companyId}/history`, label: "History" },
    { href: `/dashboard/${companyId}/audience`, label: "Audience" },
    { href: `/dashboard/${companyId}/settings`, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Loopify</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
