
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
    <div className="flex min-h-screen bg-[#090d18]">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Navbar />
        <div className="mx-auto max-w-6xl space-y-7 p-6 lg:p-8">
          <div>
            <p className="text-sm text-violet-400">AI ECOSYSTEM</p>
            <h1 className="mt-2 text-3xl font-bold text-white">AI Providers</h1>
            <p className="mt-2 text-sm text-slate-400">
              Discover AI companies and explore their available models.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
              <Building2 className="text-violet-400" />
              <p className="mt-4 text-2xl font-bold text-white">{providers.length}</p>
              <p className="mt-1 text-sm text-slate-400">Sample providers</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
              <BrainCircuit className="text-violet-400" />
              <p className="mt-4 text-2xl font-bold text-white">{models.length}</p>
              <p className="mt-1 text-sm text-slate-400">Listed models</p>
            </div>
          </div>

          <section className="grid gap-5 md:grid-cols-2">
            {providers.map((provider) => (
              <article key={provider.name} className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{provider.name}</h2>
                    <p className="text-sm text-slate-400">
                      {provider.providerModels.length} listed model(s)
                    </p>
                  </div>
                </div>
                <div className="mt-5 border-t border-slate-800 pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Available models
                  </p>
                  {provider.providerModels.map((model) => (
                    <div key={model.id} className="flex items-center justify-between gap-3 py-2">
                      <span className="text-sm text-slate-300">{model.name}</span>
                      <span className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-violet-300">
                        {model.category}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
