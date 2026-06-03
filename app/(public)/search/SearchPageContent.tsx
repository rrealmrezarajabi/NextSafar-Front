"use client";

import { useSearchParams } from "next/navigation";

import { TripCard } from "@/features/trips/components/TripCard";
import { TripSearchForm } from "@/features/trips/components/TripSearchForm";
import { useSearchTrips } from "@/features/trips/hooks/useSearchTrips";

export function SearchPageContent() {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin") ?? "";
  const destination = searchParams.get("destination") ?? "";
  const date = searchParams.get("date") ?? "";

  const {
    data: trips,
    isLoading,
    isError,
  } = useSearchTrips({
    origin,
    destination,
    date,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">نتایج جستجوی سفر</h1>

        <p className="mt-2 text-sm text-[#64748B]">
          مسیر {origin || "همه مبداها"} به {destination || "همه مقصدها"}
        </p>
      </div>

      <TripSearchForm />

      <div className="mt-8 space-y-4">
        {isLoading && (
          <p className="text-sm text-[#64748B]">در حال دریافت سفرها...</p>
        )}

        {isError && (
          <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-sm text-[#DC2626]">
            خطا در دریافت لیست سفرها
          </div>
        )}

        {!isLoading && !isError && trips?.length === 0 && (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center">
            <h2 className="font-bold text-[#0F172A]">سفری پیدا نشد</h2>

            <p className="mt-2 text-sm text-[#64748B]">
              لطفاً مبدا، مقصد یا تاریخ را تغییر دهید.
            </p>
          </div>
        )}

        {trips?.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
