
"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
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

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ComparePage() {
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
      ["Input Price / 1M tokens", formatPrice(modelA.inputPrice), formatPrice(modelB.inputPrice)],
      ["Output Price / 1M tokens", formatPrice(modelA.outputPrice), formatPrice(modelB.outputPrice)],
      ["Open Source", modelA.openSource ? "Yes" : "No", modelB.openSource ? "Yes" : "No"],
      ["Featured", modelA.featured ? "Yes" : "No", modelB.featured ? "Yes" : "No"],
      ["Description", modelA.description, modelB.description],
    ];
  }, [modelA, modelB]);

  function clearComparison() {
    setFirst("");
    setSecond("");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#090d18]">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Navbar />
          <div className="flex min-h-[70vh] items-center justify-center text-slate-300">
            <RefreshCw className="mr-3 animate-spin text-violet-400" size={20} />
            Loading models from database...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto max-w-6xl space-y-7 p-6 lg:p-8">
          <div>
            <p className="text-sm text-violet-400">MODEL ANALYSIS</p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Compare AI Models
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Compare model capabilities, providers, context windows, and pricing.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
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
              <section className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                  <label className="mb-3 block text-sm text-slate-400">
                    First Model
                  </label>

                  <select
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-[#090d18] p-3 text-white outline-none focus:border-violet-500"
                  >
                    <option value="">Select first model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} - {model.provider}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                  <label className="mb-3 block text-sm text-slate-400">
                    Second Model
                  </label>

                  <select
                    value={second}
                    onChange={(e) => setSecond(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-[#090d18] p-3 text-white outline-none focus:border-violet-500"
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

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-400">
                  {models.length} models available in your database
                </p>

                <button
                  onClick={clearComparison}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-red-500 hover:text-red-300"
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
                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
                  <div className="flex items-center gap-2 border-b border-slate-800 p-5 text-white">
                    <GitCompareArrows className="text-violet-400" />
                    <h2 className="font-semibold">Comparison Results</h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-900 text-slate-300">
                        <tr>
                          <th className="p-4">Specification</th>
                          <th className="p-4">{modelA.name}</th>
                          <th className="p-4">{modelB.name}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {rows.map(([label, a, b]) => (
                          <tr
                            key={label}
                            className="border-t border-slate-800 text-slate-300"
                          >
                            <td className="p-4 font-medium text-slate-400">
                              {label}
                            </td>
                            <td className="max-w-sm p-4">{a}</td>
                            <td className="max-w-sm p-4">{b}</td>
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
