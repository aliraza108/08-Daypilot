"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { ScheduleCard } from "@/components/dashboard/ScheduleCard";
import { useDayPilotStore } from "@/lib/store";

export default function SchedulePage() {
  const schedule = useDayPilotStore((s) => s.schedule);
  const fetchSchedule = useDayPilotStore((s) => s.fetchSchedule);

  useEffect(() => {
    if (!schedule.length) void fetchSchedule();
  }, [schedule.length, fetchSchedule]);

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">Daily Schedule</h1>
        <p className="text-textSecondary">Time-blocked execution plan built by DayPilot AI.</p>
        <div className="space-y-3">
          {schedule.map((task) => (
            <ScheduleCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
