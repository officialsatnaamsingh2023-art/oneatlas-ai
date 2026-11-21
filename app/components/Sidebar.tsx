
"use client";

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

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0d1321] px-5 py-6">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
          <Sparkles size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">OneAtlas AI</h1>
          <p className="text-xs text-slate-400">AI Model Intelligence</p>
        </div>
      </Link>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Workspace
      </p>

      <nav className="flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                active
                  ? "bg-violet-600/15 font-medium text-violet-300"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Settings size={19} />
          Settings
        </Link>
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm font-semibold text-white">OneAtlas AI</p>
          <p className="mt-1 text-xs text-slate-400">
            Discover the right AI model for every task.
          </p>
        </div>
      </div>
    </aside>
  );
}
