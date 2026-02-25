"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,148,0.2),transparent_55%)]" />
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <h2 className="font-heading text-4xl font-extrabold sm:text-6xl">Ready to take control of your time?</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex min-h-11 items-center rounded-full bg-accentGreen px-6 py-3 font-semibold text-black transition hover:scale-[1.03] hover:bg-accentGreenDim"
          >
            START FOR FREE
          </Link>
          <a
            href="https://08-daypilot-api.vercel.app/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-borderSubtle px-6 py-3 text-textSecondary transition hover:text-white"
          >
            View API Docs
          </a>
        </div>
      </motion.div>
    </section>
  );
}
