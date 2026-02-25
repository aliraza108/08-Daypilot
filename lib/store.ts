"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
  blockId?: string;
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
  userEmail: string;
  goals: DayPilotGoal[];
  habits: DayPilotHabit[];
  schedule: DayPilotTask[];
  quickNotes: string[];
  focusMinutes: number;
  loading: boolean;
  toasts: Toast[];
  setUser: (data: { userId: string; userName: string; userEmail?: string }) => void;
  dismissToast: (id: string) => void;
  pushToast: (toast: Omit<Toast, "id">) => void;
  fetchGoals: () => Promise<void>;
  fetchHabits: () => Promise<void>;
  fetchSchedule: () => Promise<void>;
  sendChatMessage: (message: string) => Promise<string>;
  addTask: (task: { title: string; start: string; end: string }) => void;
  toggleTaskStatus: (taskId: string) => Promise<void>;
  addQuickNote: (note: string) => void;
  startFocusSprint: (minutes: number) => void;
};

export const useDayPilotStore = create<DayPilotStore>()(
  persist(
    (set, get) => ({
      userId: "",
      userName: "",
      userEmail: "",
      goals: [],
      habits: [
        { id: "h-1", name: "Morning Deep Work", streak: 11, completedToday: true },
        { id: "h-2", name: "Workout 30 min", streak: 6, completedToday: false },
        { id: "h-3", name: "Evening Reflection", streak: 9, completedToday: true }
      ],
      schedule: [],
      quickNotes: [],
      focusMinutes: 0,
      loading: false,
      toasts: [],
      setUser: ({ userId, userName, userEmail }) => set({ userId, userName, userEmail: userEmail ?? "" }),
      dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
      pushToast: (toast) =>
        set((state) => ({
          toasts:
            state.toasts[0]?.title === toast.title && state.toasts[0]?.description === toast.description
              ? state.toasts
              : [...state.toasts, { ...toast, id: crypto.randomUUID() }]
        })),
      fetchGoals: async () => {
        const { userId, pushToast } = get();
        if (!userId) {
          set({
            goals: [
              { id: "g-1", title: "Create your first goal", progress: 0, deadline: "2026-03-15" },
              { id: "g-2", title: "Connect your account data", progress: 5, deadline: "2026-03-20" }
            ]
          });
          return;
        }
        set({ loading: true });
        try {
          const res = await api.get(`/api/goals/${userId}`);
          const rawGoals = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.goals) ? res.data.goals : [];
          set({
            goals: rawGoals.map((goal: any, i: number) => ({
              id: goal.id ?? goal.goal_id ?? `goal-${i}`,
              title: goal.title ?? "Untitled Goal",
              progress: Number(goal.progress ?? goal.progress_percent ?? 0),
              deadline: goal.deadline ?? goal.target_date
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
      fetchHabits: async () => {
        const { userId, pushToast } = get();
        if (!userId) return;
        try {
          const res = await api.get(`/api/habits/${userId}`);
          const rawHabits = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.habits) ? res.data.habits : [];
          set({
            habits: rawHabits.map((habit: any, i: number) => ({
              id: habit.id ?? habit.habit_id ?? `habit-${i}`,
              name: habit.title ?? habit.name ?? "Habit",
              streak: Number(habit.streak ?? habit.current_streak ?? 0),
              completedToday: Boolean(habit.completed_today ?? false)
            }))
          });
        } catch {
          pushToast({ title: "Could not load habits", description: "Showing demo habits instead." });
        }
      },
      fetchSchedule: async () => {
        set({ loading: true });
        const { pushToast, userId } = get();
        if (!userId) {
          set({ loading: false });
          return;
        }
        try {
          const today = new Date().toISOString().slice(0, 10);
          const res = await api.post("/api/schedule/generate", { user_id: userId, date: today, goals: [] });
          const rawTasks = Array.isArray(res.data?.tasks)
            ? res.data.tasks
            : Array.isArray(res.data?.schedule)
              ? res.data.schedule
              : Array.isArray(res.data)
                ? res.data
                : [];
          set({
            schedule: rawTasks.map((task: any, i: number) => ({
              id: task.id ?? task.block_id ?? `task-${i}`,
              blockId: task.block_id ?? task.id,
              title: task.title ?? task.task ?? "Task",
              start: task.start ?? task.start_time ?? "09:00",
              end: task.end ?? task.end_time ?? "10:00",
              status:
                task.status === "completed"
                  ? "done"
                  : task.status === "skipped"
                    ? "missed"
                    : "todo"
            }))
          });
        } catch (error: any) {
          const detail = error?.response?.data?.detail;
          pushToast({
            title: "Live schedule unavailable",
            description: typeof detail === "string" ? detail.slice(0, 120) : "Using a generated local schedule."
          });
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
        const { userId } = get();
        if (!userId) {
          return "Please register first so I can use your DayPilot profile context.";
        }
        try {
          const res = await api.post("/api/chat/message", { user_id: userId, message });
          return (
            res.data?.reply ??
            res.data?.response ??
            res.data?.message ??
            "AI Coach is ready. What should we optimize next?"
          );
        } catch (error: any) {
          const detail = error?.response?.data?.detail;
          if (typeof detail === "string" && detail.trim()) return `AI Coach error: ${detail}`;
          return "I could not reach the AI coach right now. Try again in a moment.";
        }
      },
      addTask: ({ title, start, end }) => {
        const { pushToast } = get();
        set((state) => ({
          schedule: [
            {
              id: `task-${Date.now()}`,
              title,
              start,
              end,
              status: "todo"
            },
            ...state.schedule
          ]
        }));
        pushToast({ title: "Task added", description: `${title} was added to your schedule.` });
      },
      toggleTaskStatus: async (taskId) => {
        const state = get();
        const task = state.schedule.find((t) => t.id === taskId);
        if (!task) return;

        const nextStatus = task.status === "todo" ? "done" : task.status === "done" ? "missed" : "todo";
        set((current) => ({
          schedule: current.schedule.map((item) => (item.id === taskId ? { ...item, status: nextStatus } : item))
        }));

        if (!state.userId || !task.blockId) return;
        try {
          await api.patch(`/api/schedule/${state.userId}/task`, {
            block_id: task.blockId,
            status: nextStatus === "done" ? "completed" : nextStatus === "missed" ? "skipped" : "in_progress"
          });
        } catch {
          state.pushToast({ title: "Could not sync task status", description: "Local update kept, API sync failed." });
        }
      },
      addQuickNote: (note) =>
        set((state) => ({
          quickNotes: [note, ...state.quickNotes].slice(0, 6)
        })),
      startFocusSprint: (minutes) => {
        set((state) => ({ focusMinutes: state.focusMinutes + minutes }));
        get().pushToast({ title: "Focus sprint started", description: `${minutes} minutes on the clock.` });
      }
    }),
    {
      name: "daypilot-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        userName: state.userName,
        userEmail: state.userEmail,
        quickNotes: state.quickNotes,
        focusMinutes: state.focusMinutes,
        schedule: state.schedule
      })
    }
  )
);
