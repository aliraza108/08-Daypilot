"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Set Your Goals & Profile",
    description: "Tell DayPilot what you want to achieve and your available time."
  },
  {
    number: "02",
    title: "AI Builds Your Daily Plan",
    description: "Get a time-blocked schedule optimized for your energy, priorities, and deadlines."
  },
  {
    number: "03",
    title: "Track, Adapt, Achieve",
    description: "Check off tasks, log mood and energy. AI adjusts your plan in real-time."
  }
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-bgSecondary py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 font-heading text-4xl font-bold sm:text-5xl"
        >
          From goals to action in 3 steps.
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, idx) => (
            <motion.div key={step.number} variants={fadeUpVariants} className="relative rounded-2xl border border-borderSubtle bg-bgCard p-6">
              <p className="font-heading text-6xl font-extrabold text-accentGreen">{step.number}</p>
              <h3 className="mt-4 font-heading text-2xl font-bold">{step.title}</h3>
              <p className="mt-2 text-textSecondary">{step.description}</p>
              {idx < steps.length - 1 ? (
                <ArrowRight className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-accentGreen/70 md:block" />
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
