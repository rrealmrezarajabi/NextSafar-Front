interface BookingSummaryProps {
  seatCount: number;
  pricePerSeat: string;
  totalPrice: number;
}

export function BookingSummary({
  seatCount,
  pricePerSeat,
  totalPrice,
}: BookingSummaryProps) {
  return (
    <aside className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <h2 className="font-bold text-[#0F172A]">خلاصه رزرو</h2>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">تعداد صندلی</span>
          <span className="font-semibold text-[#0F172A]">{seatCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">قیمت هر نفر</span>
          <span className="font-semibold text-[#0F172A]">
            {Number(pricePerSeat).toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3">
          <span className="text-[#64748B]">مبلغ قابل پرداخت</span>
          <span className="font-bold text-[#16A34A]">
            {totalPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>
    </aside>
  );
}
