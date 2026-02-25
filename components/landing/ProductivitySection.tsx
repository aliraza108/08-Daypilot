"use client";

import { motion } from "framer-motion";
import { TimerReset, Brain, NotebookText } from "lucide-react";

const modules = [
  {
    icon: TimerReset,
    title: "Deep Focus Engine",
    description: "Pomodoro-style sprint planning with distraction shields and recovery pacing."
  },
  {
    icon: NotebookText,
    title: "Weekly Review Assistant",
    description: "Auto-generated insights on wins, misses, and next-week priorities."
  },
  {
    icon: Brain,
    title: "Decision Load Optimizer",
    description: "Ranks tasks by impact so you spend willpower where it matters most."
  }
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function ProductivitySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <motion.h2
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-8 font-heading text-4xl font-bold sm:text-5xl"
      >
        Built for elite productivity systems.
      </motion.h2>
      <div className="grid gap-4 md:grid-cols-3">
        {modules.map((item, idx) => (
          <motion.article
            key={item.title}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-2xl border border-borderSubtle bg-bgCard p-5"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accentGreen/15 text-accentGreen">
              <item.icon size={20} />
            </div>
            <h3 className="mt-4 font-heading text-2xl font-bold">{item.title}</h3>
            <p className="mt-2 text-textSecondary">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
