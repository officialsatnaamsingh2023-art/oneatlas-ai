"use client";

import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModelCard from "../components/ModelCard";

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

export default function ModelsPage() {
  const [allModels, setAllModels] = useState<AIModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [provider, setProvider] = useState("All");
  const [sort, setSort] = useState("name");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all models once to populate filter options.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchAllModels() {
      try {
        const response = await fetch("/api/models", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load model filter options.");
        }

        const result: ModelsResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to load models.");
        }

        setAllModels(result.data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      }
    }

    fetchAllModels();

    return () => controller.abort();
  }, []);

  // Fetch models from the API whenever search or filters change.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchFilteredModels() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (provider !== "All") {
          params.set("provider", provider);
        }

        if (category !== "All") {
          params.set("category", category);
        }

        // Provider sorting is handled locally because the API
        // currently supports name, price, and newest sorting.
        params.set("sort", sort === "provider" ? "name" : sort);

        const response = await fetch(
          `/api/models?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch AI models.");
        }

        const result: ModelsResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch models.");
        }

        let models = result.data;

        if (sort === "provider") {
          models = [...models].sort((a, b) =>
            a.provider.localeCompare(b.provider)
          );
        }

        setFilteredModels(models);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setFilteredModels([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchFilteredModels();

    return () => controller.abort();
  }, [search, category, provider, sort]);

  const categories = [
    "All",
    ...Array.from(new Set(allModels.map((model) => model.category))),
  ];

  const providers = [
    "All",
    ...Array.from(new Set(allModels.map((model) => model.provider))),
  ];

  return (
    <div className="flex min-h-screen bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto max-w-7xl space-y-7 p-6 lg:p-8">
          <section>
            <p className="text-sm font-medium text-violet-400">
              MODEL DIRECTORY
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Explore AI Models
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Discover and explore AI models from different providers.
              Find the right model for your next project.
            </p>
          </section>

          {/* Search and filters */}
          <section className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-700 bg-[#090d18] px-4 py-3">
                <Search size={19} className="text-slate-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by model, provider or description..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <SlidersHorizontal size={18} />
                <span className="text-sm">Filters</span>
              </div>

              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="rounded-xl border border-slate-700 bg-[#090d18] px-4 py-3 text-sm text-white outline-none"
              >
                {providers.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Providers" : item}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-700 bg-[#090d18] px-4 py-3 text-sm text-white outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="provider">Sort by Provider</option>
                <option value="price">Sort by Input Price</option>
                <option value="newest">Sort by Newest</option>
              </select>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Model Categories
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      category === item
                        ? "border-violet-500 bg-violet-600 text-white"
                        : "border-slate-700 bg-slate-900 text-slate-400 hover:border-violet-500 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Model results */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Available Models
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {loading
                    ? "Loading models..."
                    : `Showing ${filteredModels.length} models`}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <ArrowUpDown size={16} />
                {sort === "name"
                  ? "Name order"
                  : sort === "provider"
                    ? "Provider order"
                    : sort === "price"
                      ? "Price order"
                      : "Newest first"}
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
                <p className="font-medium text-red-300">
                  Something went wrong
                </p>
                <p className="mt-2 text-sm text-slate-300">{error}</p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
                >
                  Try again
                </button>
              </div>
            ) : loading ? (
              <div className="rounded-2xl border border-slate-800 bg-[#111827] px-5 py-16 text-center text-slate-400">
                Loading AI models...
              </div>
            ) : filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredModels.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-[#111827] px-5 py-16 text-center">
                <Search size={32} className="mx-auto text-slate-500" />

                <h3 className="mt-4 text-lg font-semibold text-white">
                  No models found
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setProvider("All");
                    setSort("name");
                  }}
                  className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}