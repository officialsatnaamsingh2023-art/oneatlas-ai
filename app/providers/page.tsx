import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Building2, BrainCircuit, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProvidersPage() {
  let providers: { provider: string; _count: { provider: number } }[] = [];
  let totalModels = 0;
  let error = false;
  try {
    const [groups, count] = await Promise.all([
      prisma.aIModel.groupBy({ by: ["provider"], _count: { provider: true }, orderBy: { provider: "asc" } }),
      prisma.aIModel.count(),
    ]);
    providers = groups;
    totalModels = count;
  } catch (err) {
    console.error("Providers page database error:", err);
    error = true;
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />
      <main className="min-w-0 flex-1"><Navbar />
        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
          <div><p className="text-xs text-violet-400">AI ECOSYSTEM</p><h1 className="mt-2 text-3xl font-bold text-white">AI Providers</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Explore the providers represented in your OneAtlas AI catalog.</p></div>
          {error ? <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-200">The provider directory could not connect to the database. Check DATABASE_URL and run the Prisma migrations.</div> : <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-slate-800 bg-[#111827] p-5"><Building2 className="text-violet-400" /><p className="mt-4 text-2xl font-bold text-white">{providers.length}</p><p className="mt-1 text-sm text-slate-400">Providers in database</p></div><div className="rounded-2xl border border-slate-800 bg-[#111827] p-5"><BrainCircuit className="text-violet-400" /><p className="mt-4 text-2xl font-bold text-white">{totalModels}</p><p className="mt-1 text-sm text-slate-400">Catalogued models</p></div></div>
            {providers.length ? <section className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">{providers.map((provider) => <article key={provider.provider} className="rounded-2xl border border-slate-800 bg-[#111827] p-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300"><Building2 /></div><div><h2 className="font-semibold text-white">{provider.provider}</h2><p className="text-xs text-slate-400">{provider._count.provider} models</p></div></div><Link href={`/models?provider=${encodeURIComponent(provider.provider)}`} aria-label={`Explore ${provider.provider} models`} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-violet-500 hover:text-violet-300"><ArrowUpRight size={17} /></Link></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-violet-500" style={{ width: `${Math.max(5, provider._count.provider / Math.max(1, totalModels) * 100)}%` }} /></div></article>)}</section> : <p className="rounded-2xl border border-slate-800 bg-[#111827] p-8 text-center text-sm text-slate-400">No providers yet. Add models to your database to populate this directory.</p>}
          </>}
        </div>
      </main>
    </div>
  );
}
