
import Link from "next/link";
import { ArrowUpRight, BrainCircuit } from "lucide-react";

type Model = {
  id: number;
  name: string;
  provider: string;
  category: string;
  description: string;
  context: string;
  inputPrice: string;
  outputPrice: string;
  badge: string;
};

export default function ModelCard({ model }: { model: Model }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 transition hover:-translate-y-1 hover:border-violet-500/60">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
          <BrainCircuit size={23} />
        </div>
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
          {model.badge}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">{model.name}</h3>
        <p className="mt-1 text-sm text-violet-300">{model.provider}</p>
        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
          {model.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300">
          {model.category}
        </span>
        <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300">
          {model.context} context
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4">
        <div>
          <p className="text-xs text-slate-500">Input / 1M tokens</p>
          <p className="mt-1 font-semibold text-white">{model.inputPrice}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Output / 1M tokens</p>
          <p className="mt-1 font-semibold text-white">{model.outputPrice}</p>
        </div>
      </div>

      <Link
        href={`/models/${model.id}`}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-2.5 text-sm font-medium text-slate-200 hover:border-violet-500 hover:bg-violet-500/10"
      >
        View model <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
