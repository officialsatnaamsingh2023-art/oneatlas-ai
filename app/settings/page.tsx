"use client";

import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useApp } from "../components/AppProviders";
import { Download, RotateCcw, Settings2, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const { favorites, preferences, updatePreferences } = useApp();
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function exportPreferences() {
    const payload = {
      application: "OneAtlas AI",
      exportedAt: new Date().toISOString(),
      preferences,
      favoriteModelIds: favorites,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "oneatlas-ai-settings.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function resetPreferences() {
    updatePreferences({ defaultSort: "name", compactCards: false, reduceMotion: false, currency: "USD" });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />
      <main className="min-w-0 flex-1"><Navbar />
        <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
          <div><p className="text-xs font-medium tracking-wide text-violet-400">PREFERENCES</p><h1 className="mt-2 text-3xl font-bold text-white">Settings</h1><p className="mt-2 text-sm text-slate-400">Customize how OneAtlas AI displays your model workspace.</p></div>
          <section className="rounded-2xl border border-slate-800 bg-[#111827] p-5 sm:p-7">
            <div className="flex items-center gap-3"><Settings2 className="text-violet-300" /><h2 className="text-lg font-semibold text-white">Display preferences</h2></div>
            <div className="mt-6 grid gap-6">
              <label className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between"><span><strong className="block text-white">Default model sorting</strong><span className="text-xs text-slate-500">Initial order when browsing models</span></span><select value={preferences.defaultSort} onChange={(e) => updatePreferences({ defaultSort: e.target.value as "name" | "newest" | "price" })} className="rounded-xl border border-slate-700 bg-[#090d18] px-3 py-2.5 text-white"><option value="name">Name: A to Z</option><option value="newest">Newest first</option><option value="price">Lowest input price</option></select></label>
              <label className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between"><span><strong className="block text-white">Price display currency</strong><span className="text-xs text-slate-500">INR uses a fixed illustrative conversion of ₹83 per USD</span></span><select value={preferences.currency} onChange={(e) => updatePreferences({ currency: e.target.value as "USD" | "INR" })} className="rounded-xl border border-slate-700 bg-[#090d18] px-3 py-2.5 text-white"><option value="USD">USD ($)</option><option value="INR">INR (₹)</option></select></label>
              <label className="flex items-center justify-between gap-4 text-sm text-slate-300"><span><strong className="block text-white">Compact model cards</strong><span className="text-xs text-slate-500">Reduce spacing in model cards</span></span><input type="checkbox" checked={preferences.compactCards} onChange={(e) => updatePreferences({ compactCards: e.target.checked })} className="h-5 w-5 accent-violet-500" /></label>
              <label className="flex items-center justify-between gap-4 text-sm text-slate-300"><span><strong className="block text-white">Reduce motion</strong><span className="text-xs text-slate-500">Preference is saved for future motion-aware components</span></span><input type="checkbox" checked={preferences.reduceMotion} onChange={(e) => updatePreferences({ reduceMotion: e.target.checked })} className="h-5 w-5 accent-violet-500" /></label>
            </div>
            {saved && <p role="status" className="mt-5 flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 size={17} /> Preferences restored to defaults.</p>}
          </section>
          <section className="rounded-2xl border border-slate-800 bg-[#111827] p-5 sm:p-7">
            <h2 className="text-lg font-semibold text-white">Your local data</h2><p className="mt-2 text-sm leading-6 text-slate-400">Favorites and display preferences are stored in this browser only. They are not synced between devices or accounts.</p>
            <div className="mt-5 flex flex-wrap gap-3"><button onClick={exportPreferences} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500"><Download size={16} /> Export settings</button><button onClick={resetPreferences} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:border-violet-500"><RotateCcw size={16} /> Reset preferences</button></div>
            <p className="mt-4 text-xs text-slate-500">Saved favorites: {favorites.length}</p>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" />
          </section>
          <section className="rounded-2xl border border-slate-800 bg-[#111827] p-5 sm:p-7"><h2 className="text-lg font-semibold text-white">System status</h2><p className="mt-2 text-sm text-slate-400">The health endpoint checks whether the application can reach its configured PostgreSQL database.</p><a href="/api/health" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-violet-300 hover:border-violet-500">Open health check ↗</a></section>
        </div>
      </main>
    </div>
  );
}
