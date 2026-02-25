import { DayPilotTask } from "@/lib/store";

export function ScheduleCard({ task }: { task: DayPilotTask }) {
  return (
    <article className="rounded-2xl border border-borderSubtle bg-bgCard p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-wide text-textSecondary">
            {task.start} - {task.end}
          </p>
          <h3 className="mt-1 font-medium">{task.title}</h3>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            task.status === "done"
              ? "bg-accentGreen/20 text-accentGreen"
              : task.status === "missed"
                ? "bg-red-500/15 text-red-300"
                : "bg-white/10 text-textSecondary"
          }`}
        >
          {task.status}
        </span>
      </div>
    </article>
  );
}
