import { DayPilotHabit } from "@/lib/store";

export function HabitCard({ habit }: { habit: DayPilotHabit }) {
  return (
    <article className="rounded-2xl border border-borderSubtle bg-bgCard p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{habit.name}</h3>
        <span className={`rounded-full px-2 py-1 text-xs ${habit.completedToday ? "bg-accentGreen/20 text-accentGreen" : "bg-white/10 text-textSecondary"}`}>
          {habit.completedToday ? "Done" : "Pending"}
        </span>
      </div>
      <p className="mt-2 text-sm text-textSecondary">Current streak: {habit.streak} days</p>
    </article>
  );
}
