"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  tripSearchSchema,
  type TripSearchFormValues,
} from "@/schemas/trip.schema";
import { useCities } from "@/features/cities";

export function TripSearchForm() {
  const router = useRouter();
  const { data: cities = [], isLoading: areCitiesLoading } = useCities();

  const form = useForm<TripSearchFormValues>({
    resolver: zodResolver(tripSearchSchema),

    defaultValues: {
      origin: "",
      destination: "",
      date: "",
    },
  });

  const onSubmit = (values: TripSearchFormValues) => {
    const params = new URLSearchParams();

    params.set("origin", values.origin);
    params.set("destination", values.destination);
    params.set("date", values.date);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-8 grid gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:grid-cols-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0F172A]">مبدا</label>

        <select
          {...form.register("origin")}
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
        >
          <option value="">
            {areCitiesLoading ? "در حال دریافت شهرها..." : "انتخاب مبدا"}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        {form.formState.errors.origin && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.origin.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0F172A]">مقصد</label>

        <select
          {...form.register("destination")}
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
        >
          <option value="">
            {areCitiesLoading ? "در حال دریافت شهرها..." : "انتخاب مقصد"}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        {form.formState.errors.destination && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.destination.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0F172A]">تاریخ حرکت</label>

        <input
          type="date"
          {...form.register("date")}
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
        />

        {form.formState.errors.date && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.date.message}
          </p>
        )}
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="w-full rounded-xl bg-[#2563EB] px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          جستجوی سفر
        </button>
      </div>
    </form>
  );
}
