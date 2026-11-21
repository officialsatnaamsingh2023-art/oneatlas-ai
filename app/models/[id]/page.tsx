
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  DollarSign,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { models } from "../../data/models";
export const instant = false;
export default async function ModelDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = models.find((item) => item.id === Number(id));

  if (!model) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-[#090d18]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="mx-auto max-w-5xl space-y-7 p-6 lg:p-8">
          <Link
            href="/models"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300"
          >
            <ArrowLeft size={17} />
            Back to models
          </Link>

          <section className="rounded-3xl border border-slate-800 bg-[#111827] p-7 sm:p-9">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                <BrainCircuit size={34} />
              </div>

              <div>
                <p className="text-sm text-violet-300">{model.provider}</p>
                <h1 className="mt-1 text-3xl font-bold text-white">
                  {model.name}
                </h1>
              </div>

              <span className="ml-auto rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
                {model.badge}
              </span>
            </div>

            <p className="mt-7 max-w-3xl leading-7 text-slate-300">
              {model.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300">
                {model.category}
              </span>
              <span className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300">
                {model.context} context window
              </span>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Model specifications
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                <div className="flex items-center gap-3 text-violet-300">
                  <Database size={20} />
                  <span className="text-sm">Context Window</span>
                </div>
                <p className="mt-4 text-2xl font-bold text-white">
                  {model.context}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                <div className="flex items-center gap-3 text-violet-300">
                  <Code2 size={20} />
                  <span className="text-sm">Model Category</span>
                </div>
                <p className="mt-4 text-2xl font-bold text-white">
                  {model.category}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                <div className="flex items-center gap-3 text-violet-300">
                  <DollarSign size={20} />
                  <span className="text-sm">Input Price / 1M tokens</span>
                </div>
                <p className="mt-4 text-2xl font-bold text-white">
                  {model.inputPrice}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                <div className="flex items-center gap-3 text-violet-300">
                  <CheckCircle2 size={20} />
                  <span className="text-sm">Output Price / 1M tokens</span>
                </div>
                <p className="mt-4 text-2xl font-bold text-white">
                  {model.outputPrice}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
