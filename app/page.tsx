
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CirclePlay,
  Clock3,
  Globe2,
  Layers3,
  LockKeyhole,
  MousePointer2,
  Workflow,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Visual workflow builder",
    description:
      "Build browser automations with a visual, node-based editor. Connect steps and design workflows without unnecessary complexity.",
  },
  {
    icon: Bot,
    title: "AI-powered automation",
    description:
      "Use AI agents to handle browser tasks, interpret instructions, and help automate repetitive work.",
  },
  {
    icon: Clock3,
    title: "Automate repetitive work",
    description:
      "Spend less time repeating browser actions and more time on the work that matters.",
  },
  {
    icon: LockKeyhole,
    title: "Built for your workspace",
    description:
      "Keep your workflows organized in your workspace, with authentication and access managed through your account.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create a workflow",
    description:
      "Start with a blank canvas and add the steps you want your browser to perform.",
  },
  {
    number: "02",
    title: "Connect your actions",
    description:
      "Arrange your workflow, configure the nodes, and define how each step connects.",
  },
  {
    number: "03",
    title: "Run your automation",
    description:
      "Launch your workflow and manage its execution from your dashboard.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b12] text-white">
      {/* Navigation */}
      <header className="relative z-10 border-b border-white/[0.08]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-white">
              <Workflow size={21} />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              BrowserFlow
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden rounded-lg px-4 py-2.5 text-sm text-gray-300 transition hover:text-white sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-200"
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/[0.15] blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3.5 py-2 text-sm text-violet-200">
              <Zap size={15} />
              Browser automation, reimagined
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Let your browser
              <span className="block bg-gradient-to-r from-violet-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                do the busywork.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
              Build AI-powered browser workflows visually. Automate repetitive
              tasks, connect actions, and manage your workflows from one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 font-semibold transition hover:bg-violet-400"
              >
                Start building <ArrowRight size={18} />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 font-medium text-gray-300 transition hover:border-white/25 hover:text-white"
              >
                <CirclePlay size={18} />
                See how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-violet-400" />
                Visual workflows
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-violet-400" />
                AI-powered actions
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-violet-400" />
                One workspace
              </span>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-violet-500/[0.12] blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1320] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="ml-3 text-xs text-gray-400">
                    Workflow canvas
                  </span>
                </div>
                <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                  Ready
                </span>
              </div>

              <div className="relative min-h-[380px] overflow-hidden p-5 sm:p-8">
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#a5b4fc 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative flex justify-center">
                  <div className="w-56 rounded-xl border border-violet-400/30 bg-[#17152a] p-4 shadow-lg shadow-violet-950/30">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
                        <MousePointer2 size={19} />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Start workflow</p>
                        <p className="mt-1 text-xs text-gray-500">
                          Trigger
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex h-12 justify-center">
                  <div className="w-px bg-gradient-to-b from-violet-400 to-indigo-400" />
                </div>

                <div className="relative flex justify-center">
                  <div className="w-56 rounded-xl border border-indigo-400/30 bg-[#141a2b] p-4 shadow-lg shadow-indigo-950/30">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                        <Globe2 size={19} />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Open website</p>
                        <p className="mt-1 text-xs text-gray-500">
                          Browser action
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex h-12 justify-center">
                  <div className="w-px bg-gradient-to-b from-indigo-400 to-fuchsia-400" />
                </div>

                <div className="relative flex justify-center">
                  <div className="w-56 rounded-xl border border-fuchsia-400/30 bg-[#20152b] p-4 shadow-lg shadow-fuchsia-950/30">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-fuchsia-500/20 text-fuchsia-300">
                        <Bot size={19} />
                      </span>
                      <div>
                        <p className="text-sm font-medium">AI agent</p>
                        <p className="mt-1 text-xs text-gray-500">
                          Process task
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg border border-white/10 bg-[#121725] px-3 py-2 text-xs text-gray-400">
                  <Layers3 size={14} />
                  Visual workflow
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#141a27] p-3 shadow-xl sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
                <Check size={19} />
              </span>
              <div>
                <p className="text-sm font-medium">Workflow designed</p>
                <p className="mt-1 text-xs text-gray-500">
                  Ready to configure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-white/[0.08] bg-white/[0.015] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Made for getting things done
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Less repetition.
              <br />
              More meaningful work.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-400">
              Everything you need to design, organize, and run browser
              automations in a single workspace.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#0e1320] p-6 transition hover:-translate-y-1 hover:border-violet-400/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                From idea to
                <span className="block text-gray-500">automation.</span>
              </h2>
              <p className="mt-5 max-w-lg leading-7 text-gray-400">
                Turn a repetitive browser task into a workflow you can
                configure and manage in a few straightforward steps.
              </p>
              <Link
                href="/sign-up"
                className="mt-8 inline-flex items-center gap-2 font-medium text-violet-300 transition hover:text-violet-200"
              >
                Build your first workflow <ChevronRight size={18} />
              </Link>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7"
                >
                  <span className="pt-1 text-sm font-semibold text-violet-300">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-7 text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 sm:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/70 via-[#15132a] to-[#101625] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Ready to automate your browser?
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-300">
              Create your account and start building workflows for the tasks
              you repeat every day.
            </p>
            <Link
              href="/sign-up"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-950 transition hover:bg-gray-200"
            >
              Get started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-gray-300">
            <Workflow size={18} className="text-violet-300" />
            <span className="font-medium">BrowserFlow</span>
          </Link>
          <p>Build workflows. Automate the repetitive.</p>
          <div className="flex gap-5">
            <Link href="/sign-in" className="transition hover:text-white">
              Sign in
            </Link>
            <Link href="/sign-up" className="transition hover:text-white">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}