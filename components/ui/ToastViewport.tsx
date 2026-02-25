"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useDayPilotStore } from "@/lib/store";

export function ToastViewport() {
  const toasts = useDayPilotStore((s) => s.toasts);
  const dismissToast = useDayPilotStore((s) => s.dismissToast);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = setTimeout(() => dismissToast(toasts[0].id), 3200);
    return () => clearTimeout(timer);
  }, [toasts, dismissToast]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[90] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:w-auto">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-auto rounded-xl border border-accentGreen/60 bg-bgCard p-3 shadow-glowGreen"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description ? <p className="text-xs text-textSecondary">{toast.description}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-full text-textSecondary transition hover:bg-white/5 hover:text-white"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
