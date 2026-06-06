"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserCircle } from "lucide-react";

import { useMe } from "@/features/auth";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const hasToken = Boolean(Cookies.get("access_token") || Cookies.get("refresh_token"));
  const { data: profile } = useMe();
  const dashboardHref =
    profile?.role === "owner" ? "/owner/dashboard" : "/user/dashboard";

  const logoutAndRedirect = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={100} height={300} />
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

          {hasToken && profile?.role === "user" && (
            <>
              <Link
                href="/user/bookings"
                className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
              >
                رزروهای من
              </Link>
              <Link
                href="/user/tickets"
                className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
              >
                بلیت‌های من
              </Link>
            </>
          )}

          {hasToken && profile?.role === "owner" && (
            <>
              <Link
                href="/owner/dashboard"
                className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
              >
                آمار شرکت
              </Link>
              <Link
                href="/owner/bookings"
                className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
              >
                رزروهای شرکت
              </Link>
              <Link
                href="/owner/trips"
                className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
              >
                سفرها
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {hasToken ? (
            <>
              <Link
                href={dashboardHref}
                className={`hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition sm:inline-flex ${
                  pathname === dashboardHref
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
              >
                <UserCircle className="size-4" />
                {profile?.first_name ?? "حساب کاربری"}
              </Link>

              <button
                type="button"
                onClick={logoutAndRedirect}
                className="inline-flex items-center gap-2 rounded-xl border border-[#FCA5A5] px-3 py-2 text-sm font-medium text-[#DC2626] transition hover:bg-[#FEF2F2]"
              >
                <LogOut className="size-4" />
                خروج
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
