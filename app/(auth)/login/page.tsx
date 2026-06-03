import { Suspense } from "react";
import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <section className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#0F172A]">
            ورود به حساب کاربری
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            برای رزرو بلیط وارد حساب خود شوید
          </p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
