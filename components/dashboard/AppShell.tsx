"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, Goal, House, MessageSquare, Repeat2 } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/goals", label: "Goals", icon: Goal },
  { href: "/habits", label: "Habits", icon: Repeat2 },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/chat", label: "AI Coach", icon: MessageSquare }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bgPrimary text-white">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-24 pt-6 sm:px-6 md:pt-8">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] min-w-[220px] rounded-2xl border border-borderSubtle bg-bgSecondary p-4 md:block">
          <p className="px-2 pb-5 font-heading text-sm tracking-[0.22em]">DAYPILOT.</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition ${
                    active ? "bg-accentGreen/20 text-accentGreen" : "text-textSecondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="w-full">{children}</div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-borderSubtle bg-bgSecondary/95 p-2 backdrop-blur-lg md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-6 gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 flex-col items-center justify-center rounded-xl text-[10px] ${
                  active ? "text-accentGreen" : "text-textSecondary"
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
