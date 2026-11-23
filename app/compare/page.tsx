
"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useApp } from "../components/AppProviders";
import { GitCompareArrows, X, RefreshCw } from "lucide-react";

type AIModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  category: string;
  context: number;
  inputPrice: number;
  outputPrice: number;
  speed: string;
  openSource: boolean;
  featured: boolean;
};

type ModelsResponse = {
  success: boolean;
  count: number;
  data: AIModel[];
  message?: string;
};

function formatContext(context: number) {
  if (context >= 1_000_000) return `${context / 1_000_000}M`;
  if (context >= 1_000) return `${context / 1_000}K`;
  return context.toLocaleString();
}

function formatPrice(price: number, currency: "USD" | "INR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ComparePage() {
  const { preferences } = useApp();
  const [models, setModels] = useState<AIModel[]>([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchModels() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/models?sort=name", {
          signal: controller.signal,
        });

        const result: ModelsResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to load models");
        }

        setModels(result.data);

        if (result.data.length > 0) {
          setFirst(result.data[0].id);
          setSecond(result.data.length > 1 ? result.data[1].id : "");
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchModels();
    return () => controller.abort();
  }, []);

  const modelA = models.find((model) => model.id === first);
  const modelB = models.find((model) => model.id === second);

  const rows = useMemo(() => {
    if (!modelA || !modelB) return [];

    return [
      ["Provider", modelA.provider, modelB.provider],
      ["Category", modelA.category, modelB.category],
      ["Context Window", formatContext(modelA.context), formatContext(modelB.context)],
      ["Speed", modelA.speed, modelB.speed],
      ["Input Price / 1M tokens", formatPrice(modelA.inputPrice, preferences.currency), formatPrice(modelB.inputPrice, preferences.currency)],
      ["Output Price / 1M tokens", formatPrice(modelA.outputPrice, preferences.currency), formatPrice(modelB.outputPrice, preferences.currency)],
      ["Open Source", modelA.openSource ? "Yes" : "No", modelB.openSource ? "Yes" : "No"],
      ["Featured", modelA.featured ? "Yes" : "No", modelB.featured ? "Yes" : "No"],
      ["Description", modelA.description, modelB.description],
    ];
  }, [modelA, modelB, preferences.currency]);

  function clearComparison() {
    setFirst("");
    setSecond("");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Navbar />
          <div className="flex min-h-[70vh] items-center justify-center px-4 text-sm text-slate-300">
            <RefreshCw className="mr-3 shrink-0 animate-spin text-violet-400" size={20} />
            Loading models from database...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
          <div>
            <p className="text-xs text-violet-400 sm:text-sm">MODEL ANALYSIS</p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Compare AI Models
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Compare model capabilities, providers, context windows, and pricing.
            </p>
          </div>

          {error && (
            <div className="break-words rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
              <button
                onClick={() => window.location.reload()}
                className="ml-3 underline"
              >
                Try again
              </button>
            </div>
          )}

          {!error && models.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-[#111827] p-6 text-center">
              <p className="text-slate-300">No AI models found.</p>
              <p className="mt-2 text-sm text-slate-500">
                Add models to your database before comparing.
              </p>
            </div>
          )}

          {models.length > 0 && (
            <>
              <section className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">
                <div className="min-w-0 rounded-2xl border border-slate-800 bg-[#111827] p-4 sm:p-5">
                  <label className="mb-3 block text-sm text-slate-400">
                    First Model
                  </label>
                  <select
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    className="w-full min-w-0 rounded-xl border border-slate-700 bg-[#090d18] p-3 text-sm text-white outline-none focus:border-violet-500"
                  >
                    <option value="">Select first model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} - {model.provider}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="min-w-0 rounded-2xl border border-slate-800 bg-[#111827] p-4 sm:p-5">
                  <label className="mb-3 block text-sm text-slate-400">
                    Second Model
                  </label>
                  <select
                    value={second}
                    onChange={(e) => setSecond(e.target.value)}
                    className="w-full min-w-0 rounded-xl border border-slate-700 bg-[#090d18] p-3 text-sm text-white outline-none focus:border-violet-500"
                  >
                    <option value="">Select second model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} - {model.provider}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-400">
                  {models.length} models available in your database
                </p>

                <button
                  onClick={clearComparison}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:border-red-500 hover:text-red-300 sm:w-auto"
                >
                  <X size={15} />
                  Clear comparison
                </button>
              </div>

              {first && second && first === second ? (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
                  Please select two different models to compare.
                </p>
              ) : !first || !second ? (
                <p className="rounded-xl border border-slate-800 bg-[#111827] p-5 text-sm text-slate-400">
                  Select two models above to see their comparison.
                </p>
              ) : modelA && modelB ? (
                <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
                  <div className="flex items-center gap-2 border-b border-slate-800 p-4 text-white sm:p-5">
                    <GitCompareArrows className="shrink-0 text-violet-400" />
                    <h2 className="font-semibold">Comparison Results</h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left text-sm">
                      <thead className="bg-slate-900 text-slate-300">
                        <tr>
                          <th className="w-1/4 p-3 sm:p-4">Specification</th>
                          <th className="p-3 sm:p-4">{modelA.name}</th>
                          <th className="p-3 sm:p-4">{modelB.name}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {rows.map(([label, a, b]) => (
                          <tr
                            key={label}
                            className="border-t border-slate-800 text-slate-300"
                          >
                            <td className="p-3 font-medium text-slate-400 sm:p-4">
                              {label}
                            </td>
                            <td className="max-w-sm break-words p-3 sm:p-4">{a}</td>
                            <td className="max-w-sm break-words p-3 sm:p-4">{b}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
