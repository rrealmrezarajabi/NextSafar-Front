"use client";

import { useState } from "react";
import { BusFront, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { useBuses } from "../../hooks/useBuses";
import { useCreateBus } from "../../hooks/useCreateBus";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { BusType, CreateBusPayload } from "@/types/bus.types";

const initialForm: CreateBusPayload = {
  name: "",
  type: "normal",
  seat_count: 25,
};

export function OwnerBusesClient() {
  const { data: buses = [], isLoading, isError } = useBuses();
  const createBus = useCreateBus();
  const [form, setForm] = useState<CreateBusPayload>(initialForm);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("نام اتوبوس الزامی است");
      return;
    }

    createBus.mutate(form, {
      onSuccess: () => {
        toast.success("اتوبوس اضافه شد");
        setForm(initialForm);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error), { position: "bottom-center" });
      },
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">مدیریت اتوبوس‌ها</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          اتوبوس‌های شرکت را بسازید تا بتوانید برای آن‌ها سفر تعریف کنید.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={submit}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
        >
          <h2 className="mb-5 font-bold text-[#0F172A]">افزودن اتوبوس</h2>

          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-[#0F172A]">نام اتوبوس</span>
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Volvo 1"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-[#0F172A]">نوع</span>
              <select
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type: event.target.value as BusType,
                  }))
                }
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              >
                <option value="normal">معمولی</option>
                <option value="vip">VIP</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-[#0F172A]">تعداد صندلی</span>
              <input
                type="number"
                min={15}
                value={form.seat_count}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    seat_count: Number(event.target.value),
                  }))
                }
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={createBus.isPending}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createBus.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}
            ثبت اتوبوس
          </button>
        </form>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h2 className="mb-5 font-bold text-[#0F172A]">اتوبوس‌های شرکت</h2>

          {isLoading && (
            <p className="text-sm text-[#64748B]">در حال دریافت اتوبوس‌ها...</p>
          )}

          {isError && (
            <div className="rounded-xl bg-[#FEF2F2] p-4 text-sm text-[#DC2626]">
              خطا در دریافت اتوبوس‌ها
            </div>
          )}

          {!isLoading && !isError && buses.length === 0 && (
            <div className="rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
              هنوز اتوبوسی ثبت نشده است.
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            {buses.map((bus) => (
              <article
                key={bus.id}
                className="rounded-xl border border-[#E2E8F0] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                    <BusFront className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A]">{bus.name}</h3>
                    <p className="text-sm text-[#64748B]">
                      {bus.type.toUpperCase()} - {bus.seat_count} صندلی
                    </p>
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
