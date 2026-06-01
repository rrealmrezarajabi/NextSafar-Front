"use client";

import { useParams } from "next/navigation";

import { TripDetailsCard, useTripDetails } from "@/features/trips";

export default function TripDetailsPage() {
  const params = useParams<{ id: string }>();

  const { data: trip, isLoading, isError } = useTripDetails(params.id);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
          در حال دریافت اطلاعات سفر...
        </div>
      </section>
    );
  }

  if (isError || !trip) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-6 text-sm text-[#DC2626]">
          خطا در دریافت اطلاعات سفر
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">جزئیات سفر</h1>

        <p className="mt-2 text-sm text-[#64748B]">
          اطلاعات کامل سفر انتخاب‌شده را بررسی کنید.
        </p>
      </div>

      <TripDetailsCard trip={trip} />
    </section>
  );
}
