"use client";

import Link from "next/link";
import { AxiosError } from "axios";
import { CalendarCheck2, Search, TicketCheck, WalletCards } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useMe } from "@/features/auth";
import { BookingCard } from "@/features/booking/components/BookingCard";
import { useBookings } from "@/features/booking/hooks/useBookings";
import { TicketCard } from "@/features/tickets/components/TicketCard";
import { useTickets } from "@/features/tickets/hooks/useTickets";

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#64748B]">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{value}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function UserDashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: profile, error: profileError } = useMe();
  const { data: bookings = [], error: bookingsError } = useBookings();
  const { data: tickets = [], error: ticketsError } = useTickets();

  useEffect(() => {
    const errors = [profileError, bookingsError, ticketsError];

    if (
      errors.some(
        (error) => error instanceof AxiosError && error.response?.status === 401,
      )
    ) {
      toast.info("برای مشاهده داشبورد وارد حساب کاربری شوید");
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [bookingsError, pathname, profileError, router, ticketsError]);

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending_payment",
  );
  const recentBookings = bookings.slice(0, 2);
  const recentTickets = tickets.slice(0, 2);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            سلام {profile?.first_name ?? "مسافر"}
          </h1>
          <p className="mt-2 text-sm text-[#64748B]">
            خلاصه رزروها، پرداخت‌ها و بلیت‌های شما
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Search className="size-4" />
          جستجوی سفر
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="کل رزروها"
          value={bookings.length}
          icon={<CalendarCheck2 className="size-5" />}
        />
        <StatCard
          title="در انتظار پرداخت"
          value={pendingBookings.length}
          icon={<WalletCards className="size-5" />}
        />
        <StatCard
          title="بلیت‌ها"
          value={tickets.length}
          icon={<TicketCheck className="size-5" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A]">رزروهای اخیر</h2>
            <Link
              href="/user/bookings"
              className="text-sm font-medium text-[#2563EB]"
            >
              مشاهده همه
            </Link>
          </div>

          <div className="space-y-4">
            {recentBookings.length ? (
              recentBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isCancelling={false}
                  onCancel={() => undefined}
                  compact
                />
              ))
            ) : (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
                هنوز رزروی ندارید.
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A]">بلیت‌های اخیر</h2>
            <Link
              href="/user/tickets"
              className="text-sm font-medium text-[#2563EB]"
            >
              مشاهده همه
            </Link>
          </div>

          <div className="space-y-4">
            {recentTickets.length ? (
              recentTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
                هنوز بلیتی صادر نشده است.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
