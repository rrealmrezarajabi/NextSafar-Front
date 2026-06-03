"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Hourglass,
  XCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useMe } from "@/features/auth";
import { useBookingStats } from "../hooks/useBookingStats";

function StatCard({
  title,
  value,
  icon,
  tone = "blue",
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "slate";
}) {
  const tones = {
    blue: "bg-[#EFF6FF] text-[#2563EB]",
    green: "bg-[#F0FDF4] text-[#16A34A]",
    amber: "bg-[#FEFCE8] text-[#A16207]",
    red: "bg-[#FEF2F2] text-[#DC2626]",
    slate: "bg-[#F1F5F9] text-[#64748B]",
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#64748B]">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{value}</p>
        </div>
        <div className={`flex size-11 items-center justify-center rounded-xl ${tones[tone]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export function OwnerDashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: profile, error: profileError } = useMe();
  const { data: stats, isLoading, isError, error } = useBookingStats();

  useEffect(() => {
    const errors = [profileError, error];

    if (
      errors.some(
        (item) => item instanceof AxiosError && item.response?.status === 401,
      )
    ) {
      toast.info("برای مشاهده پنل شرکت وارد حساب مالک شوید");
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [error, pathname, profileError, router]);

  useEffect(() => {
    if (profile && profile.role !== "owner") {
      toast.error("این بخش مخصوص مالک شرکت است");
      router.push("/user/dashboard");
    }
  }, [profile, router]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">داشبورد شرکت</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            {profile?.company_name
              ? `آمار رزروهای ${profile.company_name}`
              : "آمار رزروها و درآمد شرکت"}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/owner/bookings"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#CBD5E1] px-4 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]"
          >
            رزروهای شرکت
          </Link>
          <Link
            href="/owner/trips"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2563EB] px-4 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            مدیریت سفرها
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
          در حال دریافت آمار...
        </div>
      )}

      {isError && !(error instanceof AxiosError && error.response?.status === 401) && (
        <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-6 text-sm text-[#DC2626]">
          خطا در دریافت آمار شرکت
        </div>
      )}

      {stats && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="کل رزروها"
              value={stats.total_bookings}
              icon={<BarChart3 className="size-5" />}
            />
            <StatCard
              title="پرداخت‌شده"
              value={stats.paid_bookings}
              icon={<CheckCircle2 className="size-5" />}
              tone="green"
            />
            <StatCard
              title="در انتظار پرداخت"
              value={stats.pending_bookings}
              icon={<Hourglass className="size-5" />}
              tone="amber"
            />
            <StatCard
              title="لغوشده"
              value={stats.cancelled_bookings}
              icon={<XCircle className="size-5" />}
              tone="red"
            />
            <StatCard
              title="منقضی‌شده"
              value={stats.expired_bookings}
              icon={<CalendarClock className="size-5" />}
              tone="slate"
            />
            <StatCard
              title="درآمد کل"
              value={`${Number(stats.total_revenue ?? 0).toLocaleString("fa-IR")} تومان`}
              icon={<CircleDollarSign className="size-5" />}
              tone="green"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="font-bold text-[#0F172A]">قدم‌های بعدی مدیریت شرکت</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <Link
                href="/owner/buses"
                className="rounded-xl border border-[#E2E8F0] p-4 text-sm font-medium text-[#0F172A] transition hover:border-[#2563EB] hover:bg-[#F8FAFC]"
              >
                مدیریت اتوبوس‌ها
              </Link>
              <Link
                href="/owner/trips"
                className="rounded-xl border border-[#E2E8F0] p-4 text-sm font-medium text-[#0F172A] transition hover:border-[#2563EB] hover:bg-[#F8FAFC]"
              >
                مدیریت سفرها
              </Link>
              <Link
                href="/owner/bookings"
                className="rounded-xl border border-[#E2E8F0] p-4 text-sm font-medium text-[#0F172A] transition hover:border-[#2563EB] hover:bg-[#F8FAFC]"
              >
                رزروهای شرکت
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
