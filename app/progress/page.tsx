import { AppShell } from "@/components/dashboard/AppShell";

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <h1 className="font-heading text-3xl font-bold">Progress Analytics</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <p className="text-sm text-textSecondary">Weekly Completion</p>
            <p className="mt-3 font-heading text-4xl text-accentGreen">84%</p>
          </article>
          <article className="rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <p className="text-sm text-textSecondary">Focus Hours</p>
            <p className="mt-3 font-heading text-4xl text-white">27.5h</p>
          </article>
          <article className="rounded-2xl border border-borderSubtle bg-bgCard p-5">
            <p className="text-sm text-textSecondary">Consistency Score</p>
            <p className="mt-3 font-heading text-4xl text-accentGreen">9.1</p>
          </article>
        </div>
      </div>
    </AppShell>
  );
}
