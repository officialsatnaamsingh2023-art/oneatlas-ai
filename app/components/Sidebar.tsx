
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  GitCompareArrows,
  Trophy,
  Building2,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Explore Models", href: "/models", icon: Compass },
  { name: "Compare Models", href: "/compare", icon: GitCompareArrows },
  { name: "Rankings", href: "/rankings", icon: Trophy },
  { name: "AI Providers", href: "/providers", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  const sidebarContent = (
    <>
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="mb-10 flex items-center gap-3"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600">
          <Sparkles size={23} className="text-white" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">OneAtlas AI</h1>
          <p className="text-xs text-slate-400">
            AI Model Intelligence
          </p>
        </div>
      </Link>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Workspace
      </p>

      <nav className="flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                active
                  ? "bg-violet-600/20 font-medium text-violet-300"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} className="shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <Link
          href="/settings"
          onClick={() => setOpen(false)}
          className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Settings size={19} />
          Settings
        </Link>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm font-semibold text-white">OneAtlas AI</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Discover the right AI model for every task.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-[#111827] text-white shadow-lg md:hidden"
      >
        <Menu size={23} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] bg-black/65 md:hidden"
        />
      )}

      {/* Mobile drawer */}
      <aside
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-[80] flex w-[min(82vw,300px)] flex-col overflow-y-auto border-r border-slate-800 bg-[#0d1321] px-5 py-6 shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0d1321] px-5 py-6 md:flex">
        {sidebarContent}
      </aside>
    </>
  );
}
