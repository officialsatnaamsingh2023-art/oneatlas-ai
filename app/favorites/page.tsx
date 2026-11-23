"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModelCard from "../components/ModelCard";
import { useApp } from "../components/AppProviders";
import type { AIModel, ApiResponse } from "@/lib/types";
import { Heart, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useApp();
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/models?limit=100", { signal: controller.signal });
        const result = await response.json() as ApiResponse<AIModel[]>;
        if (!response.ok || !result.success) throw new Error(result.message || "Unable to load favorites.");
        setModels((result.data || []).filter((model) => favorites.includes(model.id)));
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [favorites]);

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />
      <main className="min-w-0 flex-1"><Navbar />
        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          <div><p className="text-xs text-violet-400">YOUR WORKSPACE</p><h1 className="mt-2 text-3xl font-bold text-white">Favorite Models</h1><p className="mt-2 text-sm text-slate-400">Keep your shortlisted AI models together on this device.</p></div>
          {loading ? <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#111827] p-8 text-slate-300"><RefreshCw className="animate-spin" /> Loading favorites...</div> :
            error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</p> :
            models.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{models.map((model) => <ModelCard key={model.id} model={model} />)}</div> :
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-10 text-center"><Heart className="mx-auto text-pink-300" size={32} /><h2 className="mt-4 text-xl font-semibold text-white">No favorites yet</h2><p className="mt-2 text-sm text-slate-400">Use the heart on any model card to save it here.</p><Link href="/models" className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">Explore models</Link></div>}
        </div>
      </main>
    </div>
  );
}
