"use client";

import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { ScheduleCard } from "@/components/dashboard/ScheduleCard";
import { GoalCard } from "@/components/dashboard/GoalCard";
import { HabitCard } from "@/components/dashboard/HabitCard";
import { useDayPilotStore } from "@/lib/store";

export default function DashboardPage() {
  const userName = useDayPilotStore((s) => s.userName);
  const userEmail = useDayPilotStore((s) => s.userEmail);
  const userId = useDayPilotStore((s) => s.userId);
  const schedule = useDayPilotStore((s) => s.schedule);
  const goals = useDayPilotStore((s) => s.goals);
  const habits = useDayPilotStore((s) => s.habits);
  const loading = useDayPilotStore((s) => s.loading);
  const quickNotes = useDayPilotStore((s) => s.quickNotes);
  const focusMinutes = useDayPilotStore((s) => s.focusMinutes);
  const fetchGoals = useDayPilotStore((s) => s.fetchGoals);
  const fetchHabits = useDayPilotStore((s) => s.fetchHabits);
  const fetchSchedule = useDayPilotStore((s) => s.fetchSchedule);
  const addTask = useDayPilotStore((s) => s.addTask);
  const toggleTaskStatus = useDayPilotStore((s) => s.toggleTaskStatus);
  const addQuickNote = useDayPilotStore((s) => s.addQuickNote);
  const startFocusSprint = useDayPilotStore((s) => s.startFocusSprint);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStart, setTaskStart] = useState("09:00");
  const [taskEnd, setTaskEnd] = useState("10:00");
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    void fetchGoals();
    void fetchHabits();
    void fetchSchedule();
  }, [fetchGoals, fetchHabits, fetchSchedule]);

  const handleTaskAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask({ title: taskTitle.trim(), start: taskStart, end: taskEnd });
    setTaskTitle("");
  };

  const handleQuickNote = (e: FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addQuickNote(noteInput.trim());
    setNoteInput("");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">Good morning, {userName || "there"}</h1>
          <p className="mt-1 text-sm text-textSecondary">{userEmail ? `${userEmail} ` : ""} {userId ? `| ID: ${userId}` : "| Guest session"}</p>
        </div>

        <div className="grid items-stretch gap-4 xl:grid-cols-3">
          <section className="h-full rounded-2xl border border-borderSubtle bg-bgCard p-5 xl:col-span-2">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Add Task</h2>
            <form onSubmit={handleTaskAdd} className="mt-4 grid gap-3 sm:grid-cols-[2fr,1fr,1fr,auto]">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Write next high-impact task"
                className="h-11 rounded-xl border border-borderSubtle bg-bgSecondary px-3 text-sm outline-none transition focus:border-accentGreen"
              />
              <input
                type="time"
                value={taskStart}
                onChange={(e) => setTaskStart(e.target.value)}
                className="h-11 rounded-xl border border-borderSubtle bg-bgSecondary px-3 text-sm outline-none transition focus:border-accentGreen"
              />
              <input
                type="time"
                value={taskEnd}
                onChange={(e) => setTaskEnd(e.target.value)}
                className="h-11 rounded-xl border border-borderSubtle bg-bgSecondary px-3 text-sm outline-none transition focus:border-accentGreen"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accentGreen px-5 text-sm font-semibold text-black transition hover:scale-[1.03]"
              >
                Add
              </button>
            </form>
          </section>

          <section className="flex h-full flex-col rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-textSecondary">Focus Sprint</p>
            <p className="mt-3 font-heading text-4xl text-accentGreen">{focusMinutes}m</p>
            <p className="mt-1 text-sm text-textSecondary">Total focused this session</p>
            <div className="mt-auto flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => startFocusSprint(25)}
                className="inline-flex min-h-11 items-center rounded-full border border-borderSubtle px-4 text-sm transition hover:border-accentGreen"
              >
                +25
              </button>
              <button
                type="button"
                onClick={() => startFocusSprint(50)}
                className="inline-flex min-h-11 items-center rounded-full border border-borderSubtle px-4 text-sm transition hover:border-accentGreen"
              >
                +50
              </button>
            </div>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Today&apos;s Schedule</h2>
            {loading && !schedule.length ? <div className="shimmer h-24 rounded-2xl bg-bgCard" /> : null}
            {schedule.map((task) => (
              <ScheduleCard key={task.id} task={task} onToggle={() => toggleTaskStatus(task.id)} />
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

        <div className="grid items-stretch gap-4 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Habit Streaks</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </section>
          <section className="flex h-full flex-col rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-textSecondary">Burnout Risk Score</p>
            <p className="mt-6 font-heading text-5xl font-extrabold text-accentGreen">28%</p>
            <p className="mt-2 text-sm text-textSecondary">Stable. Keep one long break in your afternoon block.</p>
          </section>
        </div>

        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <section className="h-full rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Priority Matrix</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-red-500/40 bg-red-500/10 p-3">
                <p className="text-xs text-red-200">Urgent + Important</p>
                <p className="mt-2 text-sm">Finish investor metrics deck.</p>
              </article>
              <article className="rounded-xl border border-accentGreen/40 bg-accentGreen/10 p-3">
                <p className="text-xs text-accentGreen">Important + Not Urgent</p>
                <p className="mt-2 text-sm">Ship onboarding polish improvements.</p>
              </article>
              <article className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3">
                <p className="text-xs text-yellow-200">Urgent + Low Value</p>
                <p className="mt-2 text-sm">Inbox cleanup and admin chores.</p>
              </article>
              <article className="rounded-xl border border-borderSubtle bg-bgSecondary p-3">
                <p className="text-xs text-textSecondary">Not Urgent + Low Value</p>
                <p className="mt-2 text-sm">Social feed scrolling.</p>
              </article>
            </div>
          </section>

          <section className="flex h-full flex-col rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <h2 className="text-sm uppercase tracking-[0.18em] text-textSecondary">Quick Capture</h2>
            <form onSubmit={handleQuickNote} className="mt-4 flex gap-2">
              <input
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Capture idea, blocker, or reminder"
                className="h-11 w-full rounded-xl border border-borderSubtle bg-bgSecondary px-3 text-sm outline-none transition focus:border-accentGreen"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center rounded-full bg-accentGreen px-4 text-sm font-semibold text-black transition hover:scale-[1.03]"
              >
                Save
              </button>
            </form>
            <div className="mt-4 space-y-2">
              {quickNotes.length ? (
                quickNotes.map((note, i) => (
                  <article key={`${note}-${i}`} className="rounded-xl border border-borderSubtle bg-bgSecondary px-3 py-2 text-sm">
                    {note}
                  </article>
                ))
              ) : (
                <p className="text-sm text-textSecondary">No notes yet. Capture your first thought.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
