"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerOwnerSchema,
  type RegisterOwnerPayload,
} from "@/schemas/auth.schema";
import { useRegisterOwner } from "../hooks/useRegisterOwner";

export function RegisterOwnerForm() {
  const registerMutation = useRegisterOwner();

  const form = useForm<RegisterOwnerPayload>({
    resolver: zodResolver(registerOwnerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      company_name: "",
    },
  });

  const onSubmit = (values: RegisterOwnerPayload) => {
    registerMutation.mutate(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0F172A]">نام</label>
          <input
            {...form.register("first_name")}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
          {form.formState.errors.first_name && (
            <p className="text-sm text-[#DC2626]">
              {form.formState.errors.first_name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0F172A]">
            نام خانوادگی
          </label>
          <input
            {...form.register("last_name")}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
          {form.formState.errors.last_name && (
            <p className="text-sm text-[#DC2626]">
              {form.formState.errors.last_name.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0F172A]">نام شرکت</label>
        <input
          {...form.register("company_name")}
          placeholder="Pars Travel Co."
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
        />
        {form.formState.errors.company_name && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.company_name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0F172A]">
          شماره موبایل
        </label>
        <input
          {...form.register("phone")}
          placeholder="09123456789"
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
        />
        {form.formState.errors.phone && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0F172A]">ایمیل</label>
        <input
          {...form.register("email")}
          type="email"
          placeholder="company@example.com"
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0F172A]">رمز عبور</label>
        <input
          {...form.register("password")}
          type="password"
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
        />
        {form.formState.errors.password && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full rounded-xl bg-[#2563EB] px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {registerMutation.isPending ? "در حال ثبت‌نام..." : "ثبت‌نام مالک شرکت"}
      </button>
    </form>
  );
}
