import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-bgPrimary px-6 text-center">
      <div className="space-y-4">
        <h1 className="font-heading text-7xl font-extrabold text-accentGreen md:text-9xl">404</h1>
        <p className="text-textSecondary">This page drifted off schedule.</p>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full bg-accentGreen px-6 py-2 font-semibold text-black transition hover:scale-[1.03] hover:bg-accentGreenDim"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
