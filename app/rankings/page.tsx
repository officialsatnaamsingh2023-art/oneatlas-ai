
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { models } from "../data/models";
import { Trophy, Medal } from "lucide-react";

export default function RankingsPage() {
  const rankedModels = [
    { ...models[0], score: 96 },
    { ...models[1], score: 94 },
    { ...models[2], score: 92 },
    { ...models[3], score: 89 },
  ];

  return (
    <div className="flex min-h-screen bg-[#090d18]">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Navbar />
        <div className="mx-auto max-w-6xl space-y-7 p-6 lg:p-8">
          <div>
            <p className="text-sm text-violet-400">MODEL PERFORMANCE</p>
            <h1 className="mt-2 text-3xl font-bold text-white">AI Model Rankings</h1>
            <p className="mt-2 text-sm text-slate-400">
              Explore the sample leaderboard of featured AI models.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950 to-[#111827] p-6">
            <Trophy size={32} className="text-amber-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Top AI Models</h2>
            <p className="mt-2 text-sm text-slate-300">
              Compare featured models using illustrative scores for this prototype.
            </p>
          </div>

          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
            <div className="border-b border-slate-800 p-5">
              <h2 className="font-semibold text-white">Leaderboard</h2>
            </div>
            {rankedModels.map((model, index) => (
              <div key={model.id} className="flex flex-wrap items-center gap-4 border-b border-slate-800 p-5 last:border-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white">
                  {index === 0 ? <Trophy className="text-amber-400" /> : <Medal className="text-violet-300" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">{index + 1}. {model.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{model.provider} · {model.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-violet-300">{model.score}</p>
                  <p className="text-xs text-slate-500">Sample score / 100</p>
                </div>
              </div>
            ))}
          </section>
          <p className="text-xs text-slate-500">
            Note: These are illustrative prototype scores, not independently verified benchmark results.
          </p>
        </div>
      </main>
    </div>
  );
}
