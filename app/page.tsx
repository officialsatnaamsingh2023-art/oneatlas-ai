
import Link from "next/link";
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
import { models } from "./data/models";

const stats = [
  { label: "AI Models", value: "120+", icon: Cpu },
  { label: "Providers", value: "25+", icon: Building2 },
  { label: "Categories", value: "08", icon: Layers3 },
  { label: "Trending Models", value: "12", icon: TrendingUp },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
          <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950 via-[#171638] to-[#111827] p-7 sm:p-10">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Your AI discovery workspace
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Find the right AI model for your next project.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Explore, compare, and discover AI models from leading
                providers—all in one place.
              </p>

              <Link
                href="/models"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Explore models <ArrowRight size={17} />
              </Link>
            </div>

            <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border border-violet-400/20" />
            <div className="pointer-events-none absolute -right-5 -top-12 h-60 w-60 rounded-full border border-violet-400/20" />
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-800 bg-[#111827] p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <Icon size={19} className="text-violet-400" />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-violet-400">DISCOVER</p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Featured AI models
                </h2>
              </div>

              <Link
                href="/models"
                className="flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {models.slice(0, 3).map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
