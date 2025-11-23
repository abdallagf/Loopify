"use client";

export function Header() {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
            <div className="flex-1">
                {/* Breadcrumbs or Page Title could go here */}
            </div>
            <div className="flex items-center space-x-4">
                {/* User Profile or Notifications could go here */}
            </div>
        </header>
    );
}
