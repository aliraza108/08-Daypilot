"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, Goal, House, LogIn } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const navIcons = [
  { icon: House, label: "HOME" },
  { icon: CalendarClock, label: "SCHEDULE" },
  { icon: Goal, label: "GOALS" },
  { icon: LogIn, label: "LOG IN" }
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-bgPrimary px-4 pb-12 pt-24 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(0,255,148,0.12),transparent_50%),radial-gradient(circle_at_75%_20%,rgba(123,97,255,0.15),transparent_45%)]" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[88px,1fr]">
        <aside className="hidden flex-col items-center gap-4 rounded-2xl border border-borderSubtle bg-bgSecondary/60 px-2 py-4 lg:flex">
          {navIcons.map((item) => (
            <button
              type="button"
              key={item.label}
              className="group flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10px] tracking-[0.18em] text-textMuted transition hover:bg-white/5 hover:text-white"
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        <div className="relative z-10 flex flex-col justify-center">
          <div className="mb-8 flex justify-start lg:justify-end">
            <span className="inline-flex rounded-full border border-accentGreen/40 bg-accentGreen/10 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-accentGreen">
              #DAYPILOT · AI SCHEDULE PLANNER
            </span>
          </div>
          <motion.div variants={container} initial="hidden" animate="visible" className="space-y-3">
            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl"
            >
              Plan Your Day.
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl"
            >
              Achieve Your Goals.
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl"
            >
              Stay Consistent.
            </motion.h1>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-3xl text-base text-textSecondary md:text-lg"
          >
            The AI productivity planner that builds dynamic personalized schedules engineered for high-performance
            individuals.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/register"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.03]"
            >
              START FREE
            </Link>
            <a
              href="#features"
              className="inline-flex min-h-11 items-center rounded-full border border-borderSubtle px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:border-accentGreen"
            >
              WATCH DEMO
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
