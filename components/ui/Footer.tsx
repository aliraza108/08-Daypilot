import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-borderSubtle bg-bgPrimary">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-textSecondary sm:flex-row">
        <p>© {new Date().getFullYear()} DayPilot. High-performance planning.</p>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <a href="https://08-daypilot-api.vercel.app/docs" target="_blank" rel="noreferrer" className="transition hover:text-white">
            API Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
