"use client";

import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Heart } from "lucide-react";
import type { AIModel } from "@/lib/types";
import { useApp } from "./AppProviders";

function formatContext(context: number) {
  if (context >= 1_000_000) return `${context / 1_000_000}M`;
  if (context >= 1_000) return `${context / 1_000}K`;
  return context.toLocaleString();
}

function formatPrice(price: number, currency: "USD" | "INR") {
  const converted = currency === "INR" ? price * 83 : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(converted);
}

export default function ModelCard({ model }: { model: AIModel }) {
  const { isFavorite, toggleFavorite, preferences } = useApp();
  const favorite = isFavorite(model.id);

  return (
    <article className={`rounded-2xl border border-slate-800 bg-[#111827] transition hover:-translate-y-1 hover:border-violet-500/60 ${preferences.compactCards ? "p-4" : "p-5"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
          <BrainCircuit size={23} />
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
            {model.featured ? "Featured" : model.openSource ? "Open weight" : "AI Model"}
          </span>
          <button type="button" onClick={() => toggleFavorite(model.id)} aria-label={favorite ? `Remove ${model.name} from favorites` : `Add ${model.name} to favorites`} aria-pressed={favorite} className={`rounded-lg border p-2 transition ${favorite ? "border-pink-500/40 bg-pink-500/10 text-pink-300" : "border-slate-700 text-slate-400 hover:text-pink-300"}`}>
            <Heart size={17} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">{model.name}</h3>
        <p className="mt-1 text-sm text-violet-300">{model.provider}</p>
        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">{model.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300">{model.category}</span>
        <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300">{formatContext(model.context)} context</span>
        <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300">{model.speed}</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4">
        <div><p className="text-xs text-slate-500">Input / 1M tokens</p><p className="mt-1 font-semibold text-white">{formatPrice(model.inputPrice, preferences.currency)}</p></div>
        <div><p className="text-xs text-slate-500">Output / 1M tokens</p><p className="mt-1 font-semibold text-white">{formatPrice(model.outputPrice, preferences.currency)}</p></div>
      </div>

      <Link href={`/models/${model.id}`} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-2.5 text-sm font-medium text-slate-200 hover:border-violet-500 hover:bg-violet-500/10">
        View model <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
