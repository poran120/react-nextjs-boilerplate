"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navSections = [
  {
    title: "Getting Started",
    items: [
      { label: "Quick Start", href: "/docs" },
      { label: "Installation", href: "/docs#installation" },
      { label: "Environment Setup", href: "/docs#environment" },
      { label: "Scripts", href: "/docs#scripts" },
      { label: "Deployment", href: "/docs#deployment" },
    ],
  },
  {
    title: "Architecture",
    items: [
      { label: "Folder Structure", href: "/docs/architecture#structure" },
      { label: "Key Utilities", href: "/docs/architecture#utilities" },
      { label: "Server Actions", href: "/docs/architecture#server-actions" },
      { label: "Hooks", href: "/docs/architecture#hooks" },
      { label: "Styling System", href: "/docs/architecture#styling" },
      { label: "Commit Convention", href: "/docs/architecture#commits" },
    ],
  },
];

function Sidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-8">
      {navSections.map((section) => (
        <div key={section.title}>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 px-3">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const base = item.href.split("#")[0];
              const active = pathname === base;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                      active
                        ? "bg-main/10 text-main font-medium"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-white/60 hover:text-white transition"
          >
            &larr; Home
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/docs"
              className={`text-sm transition ${
                pathname === "/docs"
                  ? "text-main font-medium"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Get Started
            </Link>
            <Link
              href="/docs/architecture"
              className={`text-sm transition ${
                pathname === "/docs/architecture"
                  ? "text-main font-medium"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Architecture
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/50 hover:text-white transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-72 bg-[#0a0a0a] border-r border-white/10 p-6 overflow-y-auto transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
        />
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-white/10 p-6 overflow-y-auto">
          <Sidebar pathname={pathname} />
        </aside>

        {/* Page content */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-12 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}
