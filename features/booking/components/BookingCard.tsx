import Link from "next/link";
import { CalendarDays, CreditCard, RotateCcw, XCircle } from "lucide-react";

import type { Booking, BookingStatus } from "@/types/booking.types";

interface BookingCardProps {
  booking: Booking;
  isCancelling: boolean;
  onCancel: (bookingId: number) => void;
  compact?: boolean;
}

const statusLabels: Record<BookingStatus, string> = {
  pending_payment: "در انتظار پرداخت",
  paid: "پرداخت‌شده",
  expired: "منقضی‌شده",
  canceled: "لغوشده",
};

const statusClassNames: Record<BookingStatus, string> = {
  pending_payment: "bg-[#FEFCE8] text-[#A16207]",
  paid: "bg-[#F0FDF4] text-[#16A34A]",
  expired: "bg-[#F1F5F9] text-[#64748B]",
  canceled: "bg-[#FEF2F2] text-[#DC2626]",
};

export function BookingCard({
  booking,
  isCancelling,
  onCancel,
  compact = false,
}: BookingCardProps) {
  const trip = booking.trip_details;
  const departure = trip ? new Date(trip.departure) : null;
  const canContinuePayment = booking.status === "pending_payment";
  const canCancel = booking.status === "pending_payment";

  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-[#0F172A]">
              رزرو #{booking.id}
            </h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusClassNames[booking.status]
              }`}
            >
              {statusLabels[booking.status]}
            </span>
          </div>

          <p className="mt-3 text-sm font-semibold text-[#0F172A]">
            {trip
              ? `${trip.origin_city} به ${trip.destination_city}`
              : `سفر #${booking.trip}`}
          </p>

          {departure && (
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#64748B]">
              <CalendarDays className="size-4" />
              {departure.toLocaleDateString("fa-IR")} -{" "}
              {departure.toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>

        <div className="grid gap-3 text-sm md:min-w-60">
          <div className="rounded-xl bg-[#F8FAFC] px-4 py-3">
            <p className="text-[#64748B]">تعداد مسافر</p>
            <p className="mt-1 font-bold text-[#0F172A]">
              {booking.passenger_count ?? "-"} نفر
            </p>
          </div>

          <div className="rounded-xl bg-[#F8FAFC] px-4 py-3">
            <p className="text-[#64748B]">مبلغ</p>
            <p className="mt-1 font-bold text-[#16A34A]">
              {Number(booking.total_price).toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {canContinuePayment && (
            <Link
              href={`/payment/${booking.id}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <CreditCard className="size-4" />
              ادامه پرداخت
            </Link>
          )}

          {booking.status === "paid" && (
            <Link
              href="/user/tickets"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] px-4 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]"
            >
              مشاهده بلیت‌ها
            </Link>
          )}

          {canCancel && (
            <button
              type="button"
              disabled={isCancelling}
              onClick={() => onCancel(booking.id)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#FCA5A5] px-4 text-sm font-medium text-[#DC2626] transition hover:bg-[#FEF2F2] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCancelling ? (
                <RotateCcw className="size-4 animate-spin" />
              ) : (
                <XCircle className="size-4" />
              )}
              لغو رزرو
            </button>
          )}
        </div>
      )}
    </article>
  );
}
