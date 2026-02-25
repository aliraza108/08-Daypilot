"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { GoalCard } from "@/components/dashboard/GoalCard";
import { useDayPilotStore } from "@/lib/store";

export default function GoalsPage() {
  const goals = useDayPilotStore((s) => s.goals);
  const fetchGoals = useDayPilotStore((s) => s.fetchGoals);

  useEffect(() => {
    if (!goals.length) void fetchGoals();
  }, [goals.length, fetchGoals]);

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">Goals</h1>
        <p className="text-textSecondary">Weekly milestones and long-term objective tracking.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {goals.length ? (
            goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
          ) : (
            <article className="rounded-2xl border border-borderSubtle bg-bgCard p-6">
              <p className="text-textSecondary">No goals yet. Add your first mission to get started.</p>
            </article>
          )}
        </div>
      </div>
    </AppShell>
  );
}
