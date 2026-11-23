
import Link from "next/link";
import { Suspense } from "react";

import {
  ArrowRight,
  Cpu,
  Layers3,
  Building2,
  TrendingUp,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ModelCard from "./components/ModelCard";

import { prisma } from "@/lib/prisma";

async function DashboardContent() {
  const [
    totalModels,
    providers,
    categories,
    featuredCount,
    featuredModels,
  ] = await Promise.all([
    prisma.aIModel.count(),

    prisma.aIModel.groupBy({
      by: ["provider"],
    }),

    prisma.aIModel.groupBy({
      by: ["category"],
    }),

    prisma.aIModel.count({
      where: { featured: true },
    }),

    prisma.aIModel.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  const models =
    featuredModels.length > 0
      ? featuredModels
      : await prisma.aIModel.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
        });

  const stats = [
    {
      label: "AI Models",
      value: totalModels.toLocaleString(),
      icon: Cpu,
    },
    {
      label: "Providers",
      value: providers.length.toString(),
      icon: Building2,
    },
    {
      label: "Categories",
      value: categories.length.toString().padStart(2, "0"),
      icon: Layers3,
    },
    {
      label: "Featured Models",
      value: featuredCount.toString(),
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex min-h-screen min-w-0 w-full overflow-x-clip bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">

          {/* Hero Section */}

          <section className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950 via-[#171638] to-[#111827] p-5 sm:rounded-3xl sm:p-8 lg:p-10">
            <div className="relative z-10 max-w-2xl">

              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                Your AI discovery workspace
              </span>

              <h1 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                Find the right AI model for your next project.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                Explore, compare, and discover AI models from leading
                providers—all in one place.
              </p>

              <Link
                href="/models"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 sm:mt-7"
              >
                Explore models
                <ArrowRight size={17} />
              </Link>

            </div>

            <div className="pointer-events-none absolute -right-16 -top-24 hidden h-80 w-80 rounded-full border border-violet-400/20 sm:block" />

            <div className="pointer-events-none absolute -right-5 -top-12 hidden h-60 w-60 rounded-full border border-violet-400/20 sm:block" />
          </section>

          {/* Statistics Section */}

          <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-xl border border-slate-800 bg-[#111827] p-3 sm:rounded-2xl sm:p-5"
                >
                  <div className="flex min-w-0 items-center justify-between gap-2">
                    <p className="min-w-0 text-xs leading-5 text-slate-400 sm:text-sm">
                      {stat.label}
                    </p>

                    <Icon
                      size={18}
                      className="shrink-0 text-violet-400 sm:h-5 sm:w-5"
                    />
                  </div>

                  <p className="mt-3 break-words text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </p>
                </div>
              );
            })}

          </section>

          {/* Featured Models Section */}

          <section className="min-w-0">

            <div className="mb-5 flex min-w-0 items-center justify-between gap-3">

              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-violet-400 sm:text-sm">
                  DISCOVER
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                  Featured AI models
                </h2>
              </div>

              <Link
                href="/models"
                className="flex shrink-0 items-center gap-1 text-xs text-violet-300 hover:text-violet-200 sm:gap-2 sm:text-sm"
              >
                View all
                <ArrowRight size={15} />
              </Link>

            </div>

            {models.length > 0 ? (
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">

                {models.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                  />
                ))}

              </div>
            ) : (
              <p className="rounded-2xl border border-slate-800 bg-[#111827] p-6 text-sm text-slate-400">
                No AI models are available yet.
              </p>
            )}

          </section>

        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#090d18] px-4 text-center text-slate-300">
          Loading OneAtlas AI...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
