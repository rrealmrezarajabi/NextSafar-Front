import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white">
            🚌
          </div>

          <div>
            <p className="text-sm font-bold text-[#0F172A]">BusTicket</p>
            <p className="text-xs text-[#64748B]">رزرو بلیط اتوبوس</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
          >
            خانه
          </Link>

          <Link
            href="/search"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
          >
            جستجوی سفر
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-[#2563EB] transition hover:bg-[#EFF6FF]"
          >
            ورود
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            ثبت‌نام
          </Link>
        </div>
      </nav>
    </header>
  );
}
