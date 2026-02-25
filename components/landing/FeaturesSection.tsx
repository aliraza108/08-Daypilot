"use client";

import { motion } from "framer-motion";
import { Flame, Gamepad2, Goal, Repeat, Sparkles, CalendarDays } from "lucide-react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const features = [
  {
    icon: CalendarDays,
    title: "AI Daily Schedule",
    description: "Time-blocked plans that match your energy levels."
  },
  {
    icon: Goal,
    title: "Goal Roadmaps",
    description: "Step-by-step execution plans with weekly milestones."
  },
  {
    icon: Sparkles,
    title: "Habit Formation",
    description: "Atomic habits aligned to your goals with streak tracking."
  },
  {
    icon: Repeat,
    title: "Adaptive Reschedule",
    description: "Missed a task? AI rebuilds your day automatically."
  },
  {
    icon: Flame,
    title: "Burnout Detection",
    description: "Real-time risk scoring before you hit a wall."
  },
  {
    icon: Gamepad2,
    title: "What-If Simulator",
    description: "Project outcomes before committing to a schedule change."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <motion.h2
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 max-w-2xl font-heading text-4xl font-bold sm:text-5xl"
      >
        Everything you need to perform at your peak.
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.article
            key={feature.title}
            variants={fadeUpVariants}
            className="group rounded-2xl border border-borderSubtle bg-bgCard p-5 transition hover:border-accentGreen hover:shadow-glowGreen"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accentGreen/20 text-accentGreen">
              <feature.icon size={18} />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-textSecondary">{feature.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
