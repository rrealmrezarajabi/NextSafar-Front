import Link from "next/link";
import type { Trip } from "@/types/trip.types";

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const origin = trip.origin_city_name ?? String(trip.origin_city);

  const destination =
    trip.destination_city_name ?? String(trip.destination_city);

  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:border-[#2563EB]/40 hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-[#0F172A]">
              {origin} به {destination}
            </h3>

            <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#2563EB]">
              {trip.bus_type}
            </span>
          </div>

          <p className="mt-2 text-sm text-[#64748B]">
            شرکت: {trip.company_name ?? `Company #${trip.company}`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4 md:text-center">
          <div>
            <p className="text-[#64748B]">حرکت</p>
            <p className="mt-1 font-semibold text-[#0F172A]">
              {new Date(trip.departure).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div>
            <p className="text-[#64748B]">رسیدن</p>
            <p className="mt-1 font-semibold text-[#0F172A]">
              {new Date(trip.arrival).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div>
            <p className="text-[#64748B]">ظرفیت</p>
            <p className="mt-1 font-semibold text-[#0F172A]">
              {trip.available_seats} صندلی
            </p>
          </div>

          <div>
            <p className="text-[#64748B]">قیمت</p>
            <p className="mt-1 font-bold text-[#16A34A]">
              {Number(trip.price).toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>

        <Link
          href={`/trip/${trip.id}`}
          className="rounded-xl bg-[#2563EB] px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700"
        >
          مشاهده و رزرو
        </Link>
      </div>
    </article>
  );
}
