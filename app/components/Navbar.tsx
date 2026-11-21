
import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-800 bg-[#090d18] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-400">OPERATIONS WORKSPACE</p>
        <h2 className="mt-1 text-xl font-semibold text-white">
          AI Model Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 sm:w-64 sm:flex-none">
          <Search size={17} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search models..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <button
          aria-label="Notifications"
          className="rounded-xl border border-slate-700 p-2.5 text-slate-300 hover:bg-slate-800"
        >
          <Bell size={18} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
          OA
        </div>
      </div>
    </header>
  );
}
