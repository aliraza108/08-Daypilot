"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Smartphone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const DISMISS_KEY = "daypilot_install_dismissed";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPromptModal() {
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  const isIos = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY) === "true";
    if (dismissed) return;

    const timer = window.setTimeout(() => setShowModal(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as InstallPromptEvent);
      setShowModal(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const close = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setShowModal(false);
  };

  const handleInstall = async () => {
    if (isIos || !deferredPrompt) {
      close();
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/55 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            className="relative w-full max-w-md rounded-2xl border border-accentGreen bg-bgCard p-6"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-textSecondary transition hover:bg-white/5 hover:text-white"
              aria-label="Close install modal"
            >
              <X size={18} />
            </button>

            <div className="space-y-4 pr-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accentGreen/15 text-accentGreen">
                <Smartphone />
              </div>
              <h3 className="font-heading text-2xl font-bold">Install DayPilot</h3>
              <p className="text-sm text-textSecondary">
                Add to your home screen for the full app experience. Works offline and no app store is needed.
              </p>
              {isIos ? (
                <p className="rounded-lg border border-borderSubtle bg-bgSecondary p-3 text-xs text-textSecondary">
                  iOS Safari: tap the Share icon, then choose Add to Home Screen.
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleInstall}
                className="inline-flex min-h-11 items-center rounded-full bg-accentGreen px-5 py-2 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-accentGreenDim"
              >
                Install App
              </button>
              <button
                type="button"
                onClick={close}
                className="inline-flex min-h-11 items-center rounded-full border border-borderSubtle px-5 py-2 text-sm text-textSecondary transition hover:text-white"
              >
                Not now
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
