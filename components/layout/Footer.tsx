import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer dir="rtl" className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 text-right md:grid-cols-3">
        <div className="flex flex-col">
          <Image
            src="/logo.png"
            alt="لوگو"
            width={140}
            height={42}
            className="h-auto"
            priority
          />

          <p className="mt-4 text-sm leading-7 text-[#64748B]">
            سامانه رزرو آنلاین بلیط اتوبوس.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#0F172A]">دسترسی سریع</h4>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              خانه
            </Link>
            <Link
              href="/search"
              className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              جستجوی سفر
            </Link>
            <Link
              href="/login"
              className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              ورود
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#0F172A]">اطلاعات</h4>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/about"
              className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              تماس با ما
            </Link>
            <Link
              href="/rules"
              className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
