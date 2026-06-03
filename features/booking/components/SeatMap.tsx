import { Armchair, RefreshCw } from "lucide-react";

import type { TripSeat } from "@/types/booking.types";

interface SeatMapProps {
  seats: TripSeat[];
  selectedSeatIds: number[];
  isRefreshing: boolean;
  onRefresh: () => void;
  onToggleSeat: (seat: TripSeat) => void;
}

function getSeatClassName(seat: TripSeat, isSelected: boolean) {
  if (isSelected) {
    return "border-[#2563EB] bg-[#2563EB] text-white shadow-sm";
  }

  if (seat.status === "available") {
    return "border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#2563EB] hover:bg-[#EFF6FF]";
  }

  if (seat.status === "reserved") {
    return "border-[#FACC15] bg-[#FEFCE8] text-[#A16207]";
  }

  return "border-[#E2E8F0] bg-[#F1F5F9] text-[#94A3B8]";
}

export function SeatMap({
  seats,
  selectedSeatIds,
  isRefreshing,
  onRefresh,
  onToggleSeat,
}: SeatMapProps) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm border border-[#CBD5E1] bg-white" />
            آزاد
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm bg-[#2563EB]" />
            انتخاب‌شده
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm border border-[#FACC15] bg-[#FEFCE8]" />
            رزرو موقت
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm bg-[#F1F5F9]" />
            غیرقابل رزرو
          </span>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]"
        >
          <RefreshCw className={isRefreshing ? "size-4 animate-spin" : "size-4"} />
          بروزرسانی
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
        {seats.map((seat) => {
          const isSelected = selectedSeatIds.includes(seat.id);

          return (
            <button
              key={seat.id}
              type="button"
              disabled={seat.status !== "available"}
              onClick={() => onToggleSeat(seat)}
              className={`flex aspect-square min-h-16 flex-col items-center justify-center gap-1 rounded-xl border text-sm font-bold transition disabled:cursor-not-allowed ${getSeatClassName(
                seat,
                isSelected,
              )}`}
            >
              <Armchair className="size-5" />
              {seat.number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
