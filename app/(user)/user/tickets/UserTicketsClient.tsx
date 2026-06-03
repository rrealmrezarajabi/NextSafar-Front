"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { TicketCard } from "@/features/tickets/components/TicketCard";
import { useTickets } from "@/features/tickets/hooks/useTickets";

export function UserTicketsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: tickets = [], isLoading, isError, error } = useTickets();

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.info("برای مشاهده بلیت‌ها وارد حساب کاربری شوید");
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [error, pathname, router]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">بلیت‌های من</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            بلیت‌هایی که پس از پرداخت موفق صادر شده‌اند.
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2563EB] px-4 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          جستجوی سفر جدید
        </Link>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
          در حال دریافت بلیت‌ها...
        </div>
      )}

      {isError && !(error instanceof AxiosError && error.response?.status === 401) && (
        <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-6 text-sm text-[#DC2626]">
          خطا در دریافت بلیت‌ها
        </div>
      )}

      {!isLoading && !isError && tickets.length === 0 && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
          <h2 className="font-bold text-[#0F172A]">هنوز بلیتی ندارید</h2>
          <p className="mt-2 text-sm text-[#64748B]">
            بعد از پرداخت موفق، بلیت‌های شما اینجا نمایش داده می‌شوند.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
}
