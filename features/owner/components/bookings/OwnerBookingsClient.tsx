"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useMe } from "@/features/auth";
import { BookingCard } from "@/features/booking/components/BookingCard";
import { useBookings } from "@/features/booking/hooks/useBookings";
import { useCancelBooking } from "@/features/booking/hooks/useCancelBooking";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { BookingStatus } from "@/types/booking.types";

const statusOptions: Array<{ label: string; value: BookingStatus | "" }> = [
  { label: "همه", value: "" },
  { label: "در انتظار پرداخت", value: "pending_payment" },
  { label: "پرداخت‌شده", value: "paid" },
  { label: "لغوشده", value: "canceled" },
  { label: "منقضی‌شده", value: "expired" },
];

export function OwnerBookingsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<BookingStatus | "">("");
  const { data: profile, error: profileError } = useMe();
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useBookings({ status });
  const cancelBooking = useCancelBooking();

  useEffect(() => {
    const errors = [profileError, error];

    if (
      errors.some(
        (item) => item instanceof AxiosError && item.response?.status === 401,
      )
    ) {
      toast.info("برای مشاهده رزروهای شرکت وارد حساب مالک شوید");
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [error, pathname, profileError, router]);

  useEffect(() => {
    if (profile && profile.role !== "owner") {
      toast.error("این بخش مخصوص مالک شرکت است");
      router.push("/user/dashboard");
    }
  }, [profile, router]);

  const cancel = (bookingId: number) => {
    cancelBooking.mutate(bookingId, {
      onSuccess: () => {
        toast.success("رزرو شرکت لغو شد");
      },
      onError: (cancelError) => {
        toast.error(getErrorMessage(cancelError), { position: "bottom-center" });
      },
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">رزروهای شرکت</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            رزروهای مربوط به سفرهای شرکت {profile?.company_name ?? ""}.
          </p>
        </div>

        <Link
          href="/owner/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-xl border border-[#CBD5E1] px-4 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]"
        >
          بازگشت به آمار
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value || "all"}
            type="button"
            onClick={() => setStatus(option.value)}
            className={`h-9 rounded-xl px-4 text-sm font-medium transition ${
              status === option.value
                ? "bg-[#2563EB] text-white"
                : "border border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
          در حال دریافت رزروهای شرکت...
        </div>
      )}

      {isError && !(error instanceof AxiosError && error.response?.status === 401) && (
        <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-6 text-sm text-[#DC2626]">
          خطا در دریافت رزروهای شرکت
        </div>
      )}

      {!isLoading && !isError && bookings.length === 0 && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
          <h2 className="font-bold text-[#0F172A]">رزروی پیدا نشد</h2>
          <p className="mt-2 text-sm text-[#64748B]">
            وقتی مسافران از سفرهای شرکت رزرو بسازند، اینجا نمایش داده می‌شود.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            isCancelling={cancelBooking.isPending}
            onCancel={cancel}
          />
        ))}
      </div>
    </section>
  );
}
