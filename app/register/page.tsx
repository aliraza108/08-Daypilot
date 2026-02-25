"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useDayPilotStore } from "@/lib/store";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Use at least 6 characters")
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useDayPilotStore((s) => s.setUser);
  const pushToast = useDayPilotStore((s) => s.pushToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await api.post("/api/users/register", {
        name: values.name,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
      });
      const user = res.data?.user ?? res.data ?? {};
      const userId = user.id ?? user.user_id ?? user._id ?? "demo-user";
      const userName = user.name ?? values.name;
      const userEmail = user.email ?? values.email;
      setUser({ userId, userName, userEmail });
      pushToast({ title: "Welcome to DayPilot", description: "Your account is ready." });
      router.push("/dashboard");
    } catch {
      setUser({ userId: "demo-user", userName: values.name, userEmail: values.email });
      pushToast({ title: "API unavailable", description: "Continuing in demo mode." });
      router.push("/dashboard");
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-bgPrimary px-4">
      <div className="w-full max-w-md rounded-2xl border border-borderSubtle bg-bgCard p-6 sm:p-8">
        <h1 className="font-heading text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-textSecondary">Start building your AI-driven day plan.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-textSecondary">Name</span>
            <input
              {...register("name")}
              className="h-11 w-full rounded-xl border border-borderSubtle bg-bgSecondary px-3 outline-none transition focus:border-accentGreen"
            />
            {errors.name ? <span className="text-xs text-red-300">{errors.name.message}</span> : null}
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-textSecondary">Email</span>
            <input
              {...register("email")}
              type="email"
              className="h-11 w-full rounded-xl border border-borderSubtle bg-bgSecondary px-3 outline-none transition focus:border-accentGreen"
            />
            {errors.email ? <span className="text-xs text-red-300">{errors.email.message}</span> : null}
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-textSecondary">Password</span>
            <input
              {...register("password")}
              type="password"
              className="h-11 w-full rounded-xl border border-borderSubtle bg-bgSecondary px-3 outline-none transition focus:border-accentGreen"
            />
            {errors.password ? <span className="text-xs text-red-300">{errors.password.message}</span> : null}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accentGreen px-4 font-semibold text-black transition hover:scale-[1.03] disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
