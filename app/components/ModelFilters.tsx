
"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

type ModelFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  provider: string;
  setProvider: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
};

export default function ModelFilters({
  search,
  setSearch,
  provider,
  setProvider,
  category,
  setCategory,
  sort,
  setSort,
}: ModelFiltersProps) {
  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-violet-400" />
        <h2 className="text-base font-semibold text-white">
          Find AI Models
        </h2>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative min-w-0 sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search models..."
            aria-label="Search AI models"
            className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Provider */}
        <select
          value={provider}
          onChange={(event) => setProvider(event.target.value)}
          aria-label="Filter by provider"
          className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-violet-500"
        >
          <option value="all">All Providers</option>
          <option value="OpenAI">OpenAI</option>
          <option value="Anthropic">Anthropic</option>
          <option value="Google">Google</option>
          <option value="Meta">Meta</option>
          <option value="DeepSeek">DeepSeek</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
          className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-violet-500"
        >
          <option value="all">All Categories</option>
          <option value="Text">Text</option>
          <option value="Multimodal">Multimodal</option>
          <option value="Coding">Coding</option>
          <option value="Reasoning">Reasoning</option>
          <option value="Image">Image</option>
          <option value="Audio">Audio</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Sort models"
          className="h-11 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-violet-500"
        >
          <option value="newest">Newest First</option>
          <option value="name">Name: A to Z</option>
          <option value="price">Price: Low to High</option>
        </select>
      </div>
    </section>
  );
}
