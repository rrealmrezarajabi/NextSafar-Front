import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">BusTicket</h3>

          <p className="mt-3 text-sm leading-7 text-[#64748B]">
            سامانه رزرو آنلاین بلیط اتوبوس برای جستجو، رزرو و مدیریت سفرهای
            بین‌شهری.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#0F172A]">دسترسی سریع</h4>

          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/"
              className="text-sm text-[#64748B] hover:text-[#2563EB]"
            >
              خانه
            </Link>

            <Link
              href="/search"
              className="text-sm text-[#64748B] hover:text-[#2563EB]"
            >
              جستجوی سفر
            </Link>

            <Link
              href="/login"
              className="text-sm text-[#64748B] hover:text-[#2563EB]"
            >
              ورود
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#0F172A]">اطلاعات</h4>

          <div className="mt-3 flex flex-col gap-2">
            <span className="text-sm text-[#64748B]">درباره ما</span>
            <span className="text-sm text-[#64748B]">تماس با ما</span>
            <span className="text-sm text-[#64748B]">قوانین و مقررات</span>
          </div>
        </div>
      </div>

     
    </footer>
  );
}
