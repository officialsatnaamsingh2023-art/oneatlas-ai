"use client";

import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/models${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""}`);
  }

  return (
    <header className="w-full min-w-0 border-b border-slate-800 bg-[#090d18] px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="min-w-0 pl-14 md:pl-0">
          <p className="text-xs font-medium tracking-wide text-slate-400 sm:text-sm">OPERATIONS WORKSPACE</p>
          <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">AI Model Dashboard</h2>
        </div>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3 md:absolute md:right-6 md:top-5">
          <form onSubmit={submitSearch} className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 sm:flex-none md:w-64">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search models..." aria-label="Search models" className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
          </form>
          <button type="button" onClick={() => router.push("/settings")} aria-label="Open settings and notifications" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:bg-slate-800"><Bell size={18} /></button>
          <div aria-label="OneAtlas AI profile" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">OA</div>
        </div>
      </div>
    </header>
  );
}
