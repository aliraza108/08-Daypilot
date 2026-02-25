import { DayPilotGoal } from "@/lib/store";

export function GoalCard({ goal }: { goal: DayPilotGoal }) {
  return (
    <article className="rounded-2xl border border-borderSubtle bg-bgCard p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium text-white">{goal.title}</h3>
        <span className="text-xs text-textSecondary">{goal.progress}%</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-bgSecondary">
        <div className="h-2 rounded-full bg-accentGreen" style={{ width: `${Math.min(Math.max(goal.progress, 0), 100)}%` }} />
      </div>
      {goal.deadline ? <p className="mt-3 text-xs text-textSecondary">Deadline: {goal.deadline}</p> : null}
    </article>
  );
}
