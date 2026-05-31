"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginPayload } from "@/schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import Link from "next/link";

export function LoginForm() {
  const loginMutation = useLogin();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginPayload) => {
    loginMutation.mutate(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-[#0F172A]">
          شماره موبایل
        </label>

        <input
          id="phone"
          type="text"
          {...form.register("phone")}
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          placeholder="09123456789"
        />

        {form.formState.errors.phone && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-[#0F172A]"
        >
          رمز عبور
        </label>

        <input
          id="password"
          type="password"
          {...form.register("password")}
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          placeholder="******"
        />

        {form.formState.errors.password && (
          <p className="text-sm text-[#DC2626]">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-xl bg-[#2563EB] px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? "در حال ورود..." : "ورود"}
      </button>
      <p className="text-blue-400 text-center font-medium text-fg-brand underline hover:no-underline">
        <Link href="/register">اگر حساب ندارید ثبت نام کنید</Link>
      </p>
    </form>
  );
}
