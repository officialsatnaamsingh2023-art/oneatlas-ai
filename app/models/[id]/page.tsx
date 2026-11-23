
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "../../components/AppProviders";
import {
  ArrowLeft,
  BrainCircuit,
  Database,
  Zap,
  DollarSign,
} from "lucide-react";

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

type ModelResponse = {
  success: boolean;
  data?: AIModel;
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

function ModelDetailsContent() {
  const { preferences } = useApp();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [model, setModel] = useState<AIModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchModel() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/models/${params.id}`, {
          signal: controller.signal,
        });

        const result: ModelResponse = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || "Model not found");
        }

        setModel(result.data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchModel();

    return () => controller.abort();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b1120] flex items-center justify-center text-white">
        Loading model details...
      </main>
    );
  }

  if (error || !model) {
    return (
      <main className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center gap-4 px-5 text-white">
        <h1 className="text-2xl font-bold">Model Not Found</h1>

        <p className="text-center text-slate-400">
          {error || "This model does not exist."}
        </p>

        <Link
          href="/models"
          className="rounded-xl bg-violet-600 px-5 py-3 hover:bg-violet-700"
        >
          Back to Models
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1120] px-5 py-10 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 md:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
            <BrainCircuit size={32} />
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
              {model.category}
            </span>

            {model.featured && (
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                Featured
              </span>
            )}

            {model.openSource && (
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">
                Open Source
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-bold md:text-5xl">
            {model.name}
          </h1>

          <p className="mt-3 text-lg text-violet-300">
            {model.provider}
          </p>

          <p className="mt-6 max-w-3xl leading-8 text-slate-400">
            {model.description}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
              <Database className="mb-4 text-violet-300" />
              <p className="text-sm text-slate-400">Context Window</p>
              <h2 className="mt-2 text-2xl font-bold">
                {formatContext(model.context)}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
              <Zap className="mb-4 text-violet-300" />
              <p className="text-sm text-slate-400">Speed</p>
              <h2 className="mt-2 text-2xl font-bold">
                {model.speed}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
              <DollarSign className="mb-4 text-violet-300" />
              <p className="text-sm text-slate-400">
                Input Price / 1M Tokens
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {formatPrice(model.inputPrice, preferences.currency)}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
              <DollarSign className="mb-4 text-violet-300" />
              <p className="text-sm text-slate-400">
                Output Price / 1M Tokens
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {formatPrice(model.outputPrice, preferences.currency)}
              </h2>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/models"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm hover:border-violet-500"
            >
              Explore More Models
            </Link>

            <Link
              href="/compare"
              className="rounded-xl bg-violet-600 px-5 py-3 text-sm hover:bg-violet-700"
            >
              Compare Models
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ModelDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0b1120] flex items-center justify-center text-white">
          Loading model details...
        </main>
      }
    >
      <ModelDetailsContent />
    </Suspense>
  );
}
