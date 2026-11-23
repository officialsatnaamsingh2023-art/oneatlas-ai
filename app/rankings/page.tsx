
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
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
          <div>
            <p className="text-xs text-violet-400 sm:text-sm">
              MODEL PERFORMANCE
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              AI Model Rankings
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Explore the sample leaderboard of featured AI models.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950 to-[#111827] p-5 sm:p-6">
            <Trophy size={30} className="text-amber-400 sm:h-8 sm:w-8" />
            <h2 className="mt-4 text-lg font-bold text-white sm:text-xl">
              Top AI Models
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Compare featured models using illustrative scores for this prototype.
            </p>
          </div>

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
            <div className="border-b border-slate-800 p-4 sm:p-5">
              <h2 className="font-semibold text-white">Leaderboard</h2>
            </div>

            {rankedModels.map((model, index) => (
              <div
                key={model.id}
                className="flex min-w-0 flex-wrap items-center gap-3 border-b border-slate-800 p-4 last:border-0 sm:gap-4 sm:p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white sm:h-10 sm:w-10">
                  {index === 0 ? (
                    <Trophy className="h-5 w-5 text-amber-400" />
                  ) : (
                    <Medal className="h-5 w-5 text-violet-300" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-semibold text-white sm:text-base">
                    {index + 1}. {model.name}
                  </h3>
                  <p className="mt-1 break-words text-xs text-slate-400 sm:text-sm">
                    {model.provider} · {model.category}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-violet-300 sm:text-xl">
                    {model.score}
                  </p>
                  <p className="text-[10px] text-slate-500 sm:text-xs">
                    Sample score / 100
                  </p>
                </div>
              </div>
            ))}
          </section>

          <p className="text-xs leading-5 text-slate-500">
            Note: These are illustrative prototype scores, not independently
            verified benchmark results.
          </p>
        </div>
      </main>
    </div>
  );
}
