import Link from "next/link";

import { getTripStatusLabel, type Trip } from "@/types/trip.types";

interface TripDetailsCardProps {
  trip: Trip;
}

export function TripDetailsCard({ trip }: TripDetailsCardProps) {
  const departureDate = new Date(trip.departure);
  const arrivalDate = new Date(trip.arrival);

  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="border-b border-[#E2E8F0] pb-6">
        <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#2563EB]">
          {trip.bus_type}
        </span>

        <h1 className="mt-4 text-2xl font-bold text-[#0F172A]">
          {trip.origin_city_name} به {trip.destination_city_name}
        </h1>

        <p className="mt-2 text-sm text-[#64748B]">کد سفر: {trip.id}</p>
      </div>

      <div className="grid gap-4 border-b border-[#E2E8F0] py-6 md:grid-cols-2">
        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <p className="text-sm text-[#64748B]">مبدا</p>
          <p className="mt-1 font-bold text-[#0F172A]">
            {trip.origin_city_name}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <p className="text-sm text-[#64748B]">مقصد</p>
          <p className="mt-1 font-bold text-[#0F172A]">
            {trip.destination_city_name}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <p className="text-sm text-[#64748B]">زمان حرکت</p>
          <p className="mt-1 font-bold text-[#0F172A]">
            {departureDate.toLocaleDateString("fa-IR")} -{" "}
            {departureDate.toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <p className="text-sm text-[#64748B]">زمان رسیدن</p>
          <p className="mt-1 font-bold text-[#0F172A]">
            {arrivalDate.toLocaleDateString("fa-IR")} -{" "}
            {arrivalDate.toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <p className="text-sm text-[#64748B]">ظرفیت باقی‌مانده</p>
          <p className="mt-1 font-bold text-[#0F172A]">
            {trip.available_seats} صندلی
          </p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <p className="text-sm text-[#64748B]">وضعیت سفر</p>
          <p className="mt-1 font-bold text-[#0F172A]">
            {getTripStatusLabel(trip.status)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-[#64748B]">قیمت هر نفر</p>
          <p className="mt-1 text-2xl font-bold text-[#16A34A]">
            {Number(trip.price).toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <Link
          href={`/booking/${trip.id}`}
          className="rounded-xl bg-[#2563EB] px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700"
        >
          ادامه و انتخاب صندلی
        </Link>
      </div>
    </article>
  );
}
