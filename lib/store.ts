"use client";

import { create } from "zustand";
import api from "@/lib/api";

export type DayPilotGoal = {
  id: string;
  title: string;
  progress: number;
  deadline?: string;
};

export type DayPilotHabit = {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
};

export type DayPilotTask = {
  id: string;
  title: string;
  start: string;
  end: string;
  status: "todo" | "done" | "missed";
};

type Toast = {
  id: string;
  title: string;
  description?: string;
};

type DayPilotStore = {
  userId: string;
  userName: string;
  goals: DayPilotGoal[];
  habits: DayPilotHabit[];
  schedule: DayPilotTask[];
  loading: boolean;
  toasts: Toast[];
  setUser: (data: { userId: string; userName: string }) => void;
  dismissToast: (id: string) => void;
  pushToast: (toast: Omit<Toast, "id">) => void;
  fetchGoals: () => Promise<void>;
  fetchSchedule: () => Promise<void>;
  sendChatMessage: (message: string) => Promise<string>;
};

export const useDayPilotStore = create<DayPilotStore>((set, get) => ({
  userId: "demo-user",
  userName: "Alex",
  goals: [],
  habits: [
    { id: "h-1", name: "Morning Deep Work", streak: 11, completedToday: true },
    { id: "h-2", name: "Workout 30 min", streak: 6, completedToday: false },
    { id: "h-3", name: "Evening Reflection", streak: 9, completedToday: true }
  ],
  schedule: [],
  loading: false,
  toasts: [],
  setUser: ({ userId, userName }) => set({ userId, userName }),
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }]
    })),
  fetchGoals: async () => {
    const { userId, pushToast } = get();
    set({ loading: true });
    try {
      const res = await api.get(`/goals/${userId}`);
      const goals = Array.isArray(res.data?.goals) ? res.data.goals : [];
      set({
        goals: goals.map((goal: any, i: number) => ({
          id: goal.id ?? `goal-${i}`,
          title: goal.title ?? "Untitled Goal",
          progress: Number(goal.progress ?? 0),
          deadline: goal.deadline
        }))
      });
    } catch {
      pushToast({ title: "Could not load goals", description: "Showing local demo goals instead." });
      set({
        goals: [
          { id: "g-1", title: "Launch SaaS landing page", progress: 72, deadline: "2026-03-10" },
          { id: "g-2", title: "Run 5k in under 25 minutes", progress: 41, deadline: "2026-04-02" }
        ]
      });
    } finally {
      set({ loading: false });
    }
  },
  fetchSchedule: async () => {
    set({ loading: true });
    const { pushToast } = get();
    try {
      const res = await api.post("/schedule/generate", { mode: "today" });
      const schedule = Array.isArray(res.data?.tasks) ? res.data.tasks : [];
      set({
        schedule: schedule.map((task: any, i: number) => ({
          id: task.id ?? `task-${i}`,
          title: task.title ?? "Task",
          start: task.start ?? "09:00",
          end: task.end ?? "10:00",
          status: task.status ?? "todo"
        }))
      });
    } catch {
      pushToast({ title: "Live schedule unavailable", description: "Using a generated local schedule." });
      set({
        schedule: [
          { id: "t-1", title: "Deep Work: Product Spec", start: "08:00", end: "10:00", status: "todo" },
          { id: "t-2", title: "Team Sync", start: "10:30", end: "11:00", status: "done" },
          { id: "t-3", title: "Workout", start: "12:00", end: "12:40", status: "todo" },
          { id: "t-4", title: "Build Sprint", start: "14:00", end: "16:30", status: "todo" }
        ]
      });
    } finally {
      set({ loading: false });
    }
  },
  sendChatMessage: async (message: string) => {
    try {
      const res = await api.post("/chat/message", { message });
      return res.data?.reply ?? "AI Coach is ready. What should we optimize next?";
    } catch {
      return "I could not reach the AI coach right now. Try again in a moment.";
    }
  }
}));
