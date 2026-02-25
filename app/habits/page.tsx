"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { HabitCard } from "@/components/dashboard/HabitCard";
import { useDayPilotStore } from "@/lib/store";

export default function HabitsPage() {
  const habits = useDayPilotStore((s) => s.habits);
  const fetchHabits = useDayPilotStore((s) => s.fetchHabits);

  useEffect(() => {
    void fetchHabits();
  }, [fetchHabits]);

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">Habits</h1>
        <p className="text-textSecondary">Atomic habits aligned to your goals.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
