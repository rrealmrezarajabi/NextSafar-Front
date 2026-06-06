"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Plus, Route } from "lucide-react";
import { toast } from "sonner";

import {
  type CreateTripPayload,
} from "@/services/owner-trips.service";
import { JalaliDateInput } from "@/components/ui/JalaliDateInput";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useBuses } from "../../hooks/useBuses";
import { useCities } from "@/features/cities";
import { useCreateOwnerTrip } from "../../hooks/useCreateOwnerTrip";
import { useOwnerTrips } from "../../hooks/useOwnerTrips";

const initialForm: CreateTripPayload = {
  bus: 0,
  origin_city: 0,
  destination_city: 0,
  departure: "",
  arrival: "",
  price: 0,
};

export function OwnerTripsClient() {
  const { data: buses = [] } = useBuses();
  const { data: cities = [], isLoading: areCitiesLoading } = useCities();
  const { data: trips = [], isLoading, isError } = useOwnerTrips();
  const createTrip = useCreateOwnerTrip();
  const [form, setForm] = useState<CreateTripPayload>(initialForm);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.bus || !form.origin_city || !form.destination_city) {
      toast.error("اتوبوس، مبدا و مقصد الزامی هستند");
      return;
    }

    if (form.origin_city === form.destination_city) {
      toast.error("مبدا و مقصد نمی‌توانند یکسان باشند");
      return;
    }

    if (!form.departure || !form.arrival || !form.price) {
      toast.error("زمان حرکت، زمان رسیدن و قیمت را وارد کنید");
      return;
    }

    createTrip.mutate(form, {
      onSuccess: () => {
        toast.success("سفر اضافه شد");
        setForm(initialForm);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error), { position: "bottom-center" });
      },
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">مدیریت سفرها</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            سفرهای شرکت را ایجاد و بررسی کنید.
          </p>
        </div>

        <Link
          href="/owner/buses"
          className="inline-flex h-10 items-center justify-center rounded-xl border border-[#CBD5E1] px-4 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]"
        >
          مدیریت اتوبوس‌ها
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <form
          onSubmit={submit}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
        >
          <h2 className="mb-5 font-bold text-[#0F172A]">افزودن سفر</h2>

          {buses.length === 0 && (
            <div className="mb-4 rounded-xl bg-[#FEFCE8] p-4 text-sm text-[#A16207]">
              برای ساخت سفر، ابتدا یک اتوبوس ثبت کنید.
            </div>
          )}

          {cities.length === 0 && !areCitiesLoading && (
            <div className="mb-4 rounded-xl bg-[#FEFCE8] p-4 text-sm text-[#A16207]">
              هنوز شهری در سیستم ثبت نشده است. شهرها را از پنل ادمین اضافه کنید.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-[#0F172A]">اتوبوس</span>
              <select
                value={form.bus}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    bus: Number(event.target.value),
                  }))
                }
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              >
                <option value={0}>انتخاب اتوبوس</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {bus.name} - {bus.type.toUpperCase()} - {bus.seat_count} صندلی
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-[#0F172A]">شهر مبدا</span>
              <select
                value={form.origin_city || ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    origin_city: Number(event.target.value),
                  }))
                }
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              >
                <option value="">انتخاب مبدا</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-[#0F172A]">شهر مقصد</span>
              <select
                value={form.destination_city || ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    destination_city: Number(event.target.value),
                  }))
                }
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              >
                <option value="">انتخاب مقصد</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-[#0F172A]">زمان حرکت</span>
              <JalaliDateInput
                value={form.departure}
                onChange={(departure) =>
                  setForm((current) => ({
                    ...current,
                    departure,
                  }))
                }
                includeTime
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-[#0F172A]">زمان رسیدن</span>
              <JalaliDateInput
                value={form.arrival}
                onChange={(arrival) =>
                  setForm((current) => ({
                    ...current,
                    arrival,
                  }))
                }
                includeTime
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-[#0F172A]">قیمت</span>
              <input
                type="number"
                min={1}
                value={form.price || ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    price: Number(event.target.value),
                  }))
                }
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={createTrip.isPending || buses.length === 0 || cities.length === 0}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createTrip.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}
            ثبت سفر
          </button>
        </form>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h2 className="mb-5 font-bold text-[#0F172A]">سفرهای شرکت</h2>

          {isLoading && (
            <p className="text-sm text-[#64748B]">در حال دریافت سفرها...</p>
          )}

          {isError && (
            <div className="rounded-xl bg-[#FEF2F2] p-4 text-sm text-[#DC2626]">
              خطا در دریافت سفرها
            </div>
          )}

          {!isLoading && !isError && trips.length === 0 && (
            <div className="rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
              هنوز سفری ثبت نشده است.
            </div>
          )}

          <div className="space-y-3">
            {trips.map((trip) => (
              <article
                key={trip.id}
                className="rounded-xl border border-[#E2E8F0] p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#2563EB]">
                      <Route className="size-4" />
                      <h3 className="font-bold text-[#0F172A]">
                        {trip.origin_city_name ?? trip.origin_city} به{" "}
                        {trip.destination_city_name ?? trip.destination_city}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-[#64748B]">
                      حرکت:{" "}
                      {new Date(trip.departure).toLocaleString("fa-IR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[#16A34A]">
                    {Number(trip.price).toLocaleString("fa-IR")} تومان
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
