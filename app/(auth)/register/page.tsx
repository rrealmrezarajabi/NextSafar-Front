"use client";

import { useState } from "react";
import { RegisterOwnerForm, RegisterUserForm } from "@/features/auth";

type RegisterType = "user" | "owner";

export default function RegisterPage() {
  const [type, setType] = useState<RegisterType>("user");

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10">
      <section className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#0F172A]">
            ساخت حساب کاربری
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            نوع حساب خود را انتخاب کنید و ثبت‌نام را تکمیل کنید
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-sm">
          <div className="mb-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType("user")}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                type === "user"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              کاربر عادی
            </button>

            <button
              type="button"
              onClick={() => setType("owner")}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                type === "owner"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              مالک شرکت
            </button>
          </div>

          {type === "user" ? <RegisterUserForm /> : <RegisterOwnerForm />}
        </div>
      </section>
    </main>
  );
}
