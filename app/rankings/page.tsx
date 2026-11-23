import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { prisma } from "@/lib/prisma";
import { Trophy, Medal, Info } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RankingsPage() {
  let rankedModels: Awaited<ReturnType<typeof prisma.aIModel.findMany>> = [];
  let error = false;
  try {
    rankedModels = await prisma.aIModel.findMany({ take: 20, orderBy: [{ featured: "desc" }, { inputPrice: "asc" }, { context: "desc" }] });
  } catch (err) {
    console.error("Rankings page database error:", err);
    error = true;
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />
      <main className="min-w-0 flex-1"><Navbar />
        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
          <div><p className="text-xs text-violet-400">MODEL DISCOVERY</p><h1 className="mt-2 text-3xl font-bold text-white">AI Model Rankings</h1><p className="mt-2 text-sm leading-6 text-slate-400">A transparent catalog ordering based on featured status, listed input price and context size—not third-party benchmark results.</p></div>
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950 to-[#111827] p-5 sm:p-6"><Trophy size={30} className="text-amber-400" /><h2 className="mt-4 text-xl font-bold text-white">Catalog leaderboard</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Models are ordered by featured status, then lower listed input cost, then larger context window. This is a browsing aid, not a quality score.</p></div>
          {error ? <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">Could not load rankings. Check the database connection.</p> : rankedModels.length ? <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]"><div className="border-b border-slate-800 p-4 sm:p-5"><h2 className="font-semibold text-white">Leaderboard · {rankedModels.length} models</h2></div>{rankedModels.map((model, index) => <div key={model.id} className="flex min-w-0 items-center gap-3 border-b border-slate-800 p-4 last:border-0 sm:gap-4 sm:p-5"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white">{index === 0 ? <Trophy className="h-5 w-5 text-amber-400" /> : <Medal className="h-5 w-5 text-violet-300" />}</div><div className="min-w-0 flex-1"><Link href={`/models/${model.id}`} className="break-words text-sm font-semibold text-white hover:text-violet-300 sm:text-base">{index + 1}. {model.name}</Link><p className="mt-1 break-words text-xs text-slate-400 sm:text-sm">{model.provider} · {model.category}</p></div><div className="shrink-0 text-right"><p className="text-sm font-semibold text-violet-300">{model.inputPrice === 0 ? "Free listed" : `$${model.inputPrice.toFixed(2)}`}</p><p className="text-[10px] text-slate-500">Input / 1M tokens</p></div></div>)}</section> : <p className="rounded-2xl border border-slate-800 bg-[#111827] p-8 text-center text-sm text-slate-400">No models are available to rank yet.</p>}
          <p className="flex items-start gap-2 text-xs leading-5 text-slate-500"><Info size={15} className="mt-0.5 shrink-0" />Pricing and context values are only as accurate as the records entered in your database. Confirm current rates with each provider before making purchasing decisions.</p>
        </div>
      </main>
    </div>
  );
}
