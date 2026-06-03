"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { CheckCircle2, CreditCard, Loader2, ReceiptText } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useBookingDetails } from "@/features/booking/hooks/useBookingDetails";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCreatePayment } from "../hooks/useCreatePayment";
import type { CreatePaymentResponse } from "@/types/payment.types";

interface PaymentClientProps {
  bookingId: string;
}

function getStatusLabel(status?: string) {
  if (status === "paid") return "پرداخت‌شده";
  if (status === "expired") return "منقضی‌شده";
  if (status === "canceled") return "لغوشده";

  return "در انتظار پرداخت";
}

export function PaymentClient({ bookingId }: PaymentClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const numericBookingId = Number(bookingId);
  const [paymentResult, setPaymentResult] = useState<CreatePaymentResponse | null>(
    null,
  );
  const {
    data: booking,
    isLoading,
    isError,
  } = useBookingDetails(bookingId);
  const createPayment = useCreatePayment(bookingId);

  const canPay = booking?.status === "pending_payment" && !paymentResult;

  const redirectToLogin = () => {
    router.push(`/login?next=${encodeURIComponent(pathname)}`);
  };

  const pay = () => {
    if (!Cookies.get("access_token") && !Cookies.get("refresh_token")) {
      toast.info("برای پرداخت ابتدا وارد حساب کاربری شوید");
      redirectToLogin();
      return;
    }

    createPayment.mutate(
      {
        booking: numericBookingId,
        method: "fake_gateway",
      },
      {
        onSuccess: (data) => {
          setPaymentResult(data);
          toast.success("پرداخت با موفقیت انجام شد");
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.status === 401) {
            toast.info("برای پرداخت ابتدا وارد حساب کاربری شوید");
            redirectToLogin();
            return;
          }

          toast.error(getErrorMessage(error), { position: "bottom-center" });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
          در حال دریافت اطلاعات پرداخت...
        </div>
      </section>
    );
  }

  if (isError || !booking) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-6 text-sm text-[#DC2626]">
          خطا در دریافت اطلاعات پرداخت
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ReceiptText className="mt-1 size-6 text-[#2563EB]" />
          <div>
            <h1 className="text-xl font-bold text-[#0F172A]">پرداخت رزرو</h1>
            <p className="mt-2 text-sm leading-7 text-[#64748B]">
              کد رزرو {bookingId} در وضعیت {getStatusLabel(booking.status)} است.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-xl bg-[#F8FAFC] p-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#64748B]">مبلغ رزرو</span>
            <span className="font-bold text-[#16A34A]">
              {Number(booking.total_price).toLocaleString("fa-IR")} تومان
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#64748B]">مهلت پرداخت</span>
            <span className="font-semibold text-[#0F172A]">
              {booking.expires_at
                ? new Date(booking.expires_at).toLocaleString("fa-IR")
                : "نامشخص"}
            </span>
          </div>
        </div>

        {paymentResult && (
          <div className="mt-6 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 text-[#16A34A]" />
              <div className="min-w-0">
                <h2 className="font-bold text-[#166534]">پرداخت موفق بود</h2>
                <p className="mt-2 break-all text-sm leading-7 text-[#166534]">
                  کد پیگیری: {paymentResult.payment.tracking_code}
                </p>
                <p className="mt-1 text-sm text-[#166534]">
                  بلیت‌ها:{" "}
                  {paymentResult.ticket_ids?.length
                    ? paymentResult.ticket_ids.join("، ")
                    : "در حال صدور"}
                </p>
              </div>
            </div>
          </div>
        )}

        {!canPay && !paymentResult && (
          <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
            این رزرو در حال حاضر قابل پرداخت نیست.
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={!canPay || createPayment.isPending}
            onClick={pay}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-[#94A3B8]"
          >
            {createPayment.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CreditCard className="size-4" />
            )}
            پرداخت آنلاین
          </button>
          {paymentResult && (
            <Link
              href="/user/tickets"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#16A34A] px-5 text-sm font-medium text-white transition hover:bg-green-700"
            >
              مشاهده بلیت‌ها
            </Link>
          )}
          <Link
            href="/search"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#CBD5E1] px-5 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]"
          >
            بازگشت به جستجو
          </Link>
        </div>
      </div>
    </section>
  );
}
