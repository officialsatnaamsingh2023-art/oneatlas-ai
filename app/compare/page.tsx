
"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { models } from "../data/models";
import { GitCompareArrows } from "lucide-react";

export default function ComparePage() {
  const [first, setFirst] = useState("1");
  const [second, setSecond] = useState("2");

  const modelA = models.find((m) => m.id === Number(first))!;
  const modelB = models.find((m) => m.id === Number(second))!;

  const rows = [
    ["Provider", modelA.provider, modelB.provider],
    ["Category", modelA.category, modelB.category],
    ["Context Window", modelA.context, modelB.context],
    ["Input Price / 1M tokens", modelA.inputPrice, modelB.inputPrice],
    ["Output Price / 1M tokens", modelA.outputPrice, modelB.outputPrice],
    ["Description", modelA.description, modelB.description],
  ];

  return (
    <div className="flex min-h-screen bg-[#090d18]">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Navbar />
        <div className="mx-auto max-w-6xl space-y-7 p-6 lg:p-8">
          <div>
            <p className="text-sm text-violet-400">MODEL ANALYSIS</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Compare AI Models</h1>
            <p className="mt-2 text-sm text-slate-400">
              Compare model capabilities, providers, context windows, and pricing.
            </p>
          </div>

          <section className="grid gap-5 md:grid-cols-2">
            {[{ value: first, setter: setFirst, label: "First Model" },
              { value: second, setter: setSecond, label: "Second Model" }].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                <label className="mb-3 block text-sm text-slate-400">{item.label}</label>
                <select
                  value={item.value}
                  onChange={(e) => item.setter(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-[#090d18] p-3 text-white outline-none"
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </section>

          {first === second ? (
            <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
              Please select two different models to compare.
            </p>
          ) : (
            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
              <div className="flex items-center gap-2 border-b border-slate-800 p-5 text-white">
                <GitCompareArrows className="text-violet-400" />
                <h2 className="font-semibold">Comparison results</h2>
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
                      <tr key={label} className="border-t border-slate-800 text-slate-300">
                        <td className="p-4 font-medium text-slate-400">{label}</td>
                        <td className="p-4">{a}</td>
                        <td className="p-4">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
