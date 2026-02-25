"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { ScheduleCard } from "@/components/dashboard/ScheduleCard";
import { GoalCard } from "@/components/dashboard/GoalCard";
import { HabitCard } from "@/components/dashboard/HabitCard";
import { useDayPilotStore } from "@/lib/store";

export default function DashboardPage() {
  const userName = useDayPilotStore((s) => s.userName);
  const schedule = useDayPilotStore((s) => s.schedule);
  const goals = useDayPilotStore((s) => s.goals);
  const habits = useDayPilotStore((s) => s.habits);
  const loading = useDayPilotStore((s) => s.loading);
  const fetchGoals = useDayPilotStore((s) => s.fetchGoals);
  const fetchSchedule = useDayPilotStore((s) => s.fetchSchedule);

  useEffect(() => {
    void fetchGoals();
    void fetchSchedule();
  }, [fetchGoals, fetchSchedule]);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Good morning, {userName} 👋</h1>
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Today&apos;s Schedule</h2>
            {loading && !schedule.length ? <div className="shimmer h-24 rounded-2xl bg-bgCard" /> : null}
            {schedule.map((task) => (
              <ScheduleCard key={task.id} task={task} />
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Goal Cards</h2>
            {loading && !goals.length ? <div className="shimmer h-24 rounded-2xl bg-bgCard" /> : null}
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Habit Streaks</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-textSecondary">Burnout Risk Score</p>
            <p className="mt-6 font-heading text-5xl font-extrabold text-accentGreen">28%</p>
            <p className="mt-2 text-sm text-textSecondary">Stable. Keep one long break in your afternoon block.</p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
