"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModelCard from "../components/ModelCard";
import { useApp } from "../components/AppProviders";

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

type SortOption = "name" | "newest" | "price" | "provider";

type ModelsResponse = {
  success: boolean;
  count: number;
  data: AIModel[];
  message?: string;
};

function getInitialQueryValue(key: "search" | "provider"): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) ?? "";
}

export default function ModelsPage() {
  const { preferences } = useApp();
  const [allModels, setAllModels] = useState<AIModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);

  // AppProviders renders its children after restoring localStorage, so these
  // initial values are available on the first render without syncing effects.
  const [search, setSearch] = useState(() => getInitialQueryValue("search"));
  const [category, setCategory] = useState("All");
  const [provider, setProvider] = useState(() =>
    getInitialQueryValue("provider") || "All"
  );
  const [sort, setSort] = useState<SortOption>(preferences.defaultSort);
  const [openSourceOnly, setOpenSourceOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFilteredModels() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        if (search.trim()) params.set("search", search.trim());
        if (provider !== "All") params.set("provider", provider);
        if (category !== "All") params.set("category", category);
        if (openSourceOnly) params.set("openSource", "true");
        if (featuredOnly) params.set("featured", "true");

        // Provider sorting is performed in the browser after the API response.
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
  }, [search, category, provider, sort, openSourceOnly, featuredOnly]);

  const categories = [
    "All",
    ...Array.from(new Set(allModels.map((model) => model.category))),
  ];

  const providers = [
    "All",
    ...Array.from(new Set(allModels.map((model) => model.provider))),
  ];

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 w-full flex-1">
        <Navbar />

        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
          <section className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-violet-400 sm:text-sm">
              MODEL DIRECTORY
            </p>

            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Explore AI Models
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Discover and explore AI models from different providers.
              Find the right model for your next project.
            </p>
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-800 bg-[#111827] p-4 sm:p-5">
            <div className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-700 bg-[#090d18] px-3 py-3 sm:px-4">
                <Search size={19} className="shrink-0 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search models or providers..."
                  className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <SlidersHorizontal size={18} />
                <span className="text-sm">Filters</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:contents">
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full min-w-0 rounded-xl border border-slate-700 bg-[#090d18] px-3 py-3 text-sm text-white outline-none focus:border-violet-500 sm:px-4"
                >
                  {providers.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Providers" : item}
                    </option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full min-w-0 rounded-xl border border-slate-700 bg-[#090d18] px-3 py-3 text-sm text-white outline-none focus:border-violet-500 sm:px-4"
                >
                  <option value="name">Sort by Name</option>
                  <option value="provider">Sort by Provider</option>
                  <option value="price">Sort by Input Price</option>
                  <option value="newest">Sort by Newest</option>
                </select>
              </div>
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
                    className={`max-w-full rounded-full border px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
                      category === item
                        ? "border-violet-500 bg-violet-600 text-white"
                        : "border-slate-700 bg-slate-900 text-slate-400 hover:border-violet-500 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-800 pt-4">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={openSourceOnly}
                    onChange={(e) => setOpenSourceOnly(e.target.checked)}
                    className="h-4 w-4 accent-violet-500"
                  />
                  Open-weight only
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="h-4 w-4 accent-violet-500"
                  />
                  Featured only
                </label>
              </div>
            </div>
          </section>

          <section className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Available Models
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {loading
                    ? "Loading models..."
                    : `Showing ${filteredModels.length} models`}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
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
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center sm:p-6">
                <p className="font-medium text-red-300">
                  Something went wrong
                </p>
                <p className="mt-2 break-words text-sm text-slate-300">
                  {error}
                </p>
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
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                    setOpenSourceOnly(false);
                    setFeaturedOnly(false);
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
