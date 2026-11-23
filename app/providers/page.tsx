
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { models } from "../data/models";
import { Building2, BrainCircuit } from "lucide-react";

export default function ProvidersPage() {
  const providers = Array.from(
    new Set(models.map((model) => model.provider))
  ).map((name) => ({
    name,
    providerModels: models.filter((model) => model.provider === name),
  }));

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
          <div>
            <p className="text-xs text-violet-400 sm:text-sm">
              AI ECOSYSTEM
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              AI Providers
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Discover AI companies and explore their available models.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
              <Building2 className="text-violet-400" />
              <p className="mt-4 text-2xl font-bold text-white">
                {providers.length}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Sample providers
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
              <BrainCircuit className="text-violet-400" />
              <p className="mt-4 text-2xl font-bold text-white">
                {models.length}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Listed models
              </p>
            </div>
          </div>

          <section className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">
            {providers.map((provider) => (
              <article
                key={provider.name}
                className="min-w-0 rounded-2xl border border-slate-800 bg-[#111827] p-4 sm:p-6"
              >
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 sm:h-12 sm:w-12">
                    <Building2 size={24} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="break-words text-base font-semibold text-white sm:text-lg">
                      {provider.name}
                    </h2>
                    <p className="text-xs text-slate-400 sm:text-sm">
                      {provider.providerModels.length} listed model(s)
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-800 pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Available models
                  </p>

                  <div className="space-y-1">
                    {provider.providerModels.map((model) => (
                      <div
                        key={model.id}
                        className="flex min-w-0 flex-wrap items-center justify-between gap-2 py-2"
                      >
                        <span className="min-w-0 flex-1 break-words text-sm text-slate-300">
                          {model.name}
                        </span>
                        <span className="shrink-0 rounded-lg bg-slate-800 px-2 py-1 text-xs text-violet-300">
                          {model.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
