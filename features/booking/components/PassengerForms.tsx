import { CheckCircle2, Loader2 } from "lucide-react";

import type { PassengerPayload, TripSeat } from "@/types/booking.types";

type PassengerErrors = Partial<Record<keyof PassengerPayload, string>>;

interface PassengerFormsProps {
  selectedSeats: TripSeat[];
  passengersBySeatId: Record<number, PassengerPayload>;
  fieldErrorsBySeatId: Record<number, PassengerErrors>;
  isSubmitting: boolean;
  onPassengerChange: (
    seatId: number,
    field: keyof PassengerPayload,
    value: string,
  ) => void;
  onSubmit: () => void;
}

const fields: Array<{
  key: keyof PassengerPayload;
  label: string;
  inputMode?: "tel" | "numeric";
}> = [
  { key: "first_name", label: "نام" },
  { key: "last_name", label: "نام خانوادگی" },
  { key: "phone", label: "شماره موبایل", inputMode: "tel" },
  { key: "national_code", label: "کد ملی", inputMode: "numeric" },
];

export function PassengerForms({
  selectedSeats,
  passengersBySeatId,
  fieldErrorsBySeatId,
  isSubmitting,
  onPassengerChange,
  onSubmit,
}: PassengerFormsProps) {
  return (
    <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-bold text-[#0F172A]">اطلاعات مسافرها</h2>
        <span className="text-sm text-[#64748B]">
          {selectedSeats.length} مسافر
        </span>
      </div>

      {selectedSeats.length === 0 ? (
        <div className="mt-5 rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
          برای ادامه، حداقل یک صندلی آزاد انتخاب کنید.
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {selectedSeats.map((seat) => (
            <div key={seat.id} className="rounded-xl border border-[#E2E8F0] p-4">
              <div className="mb-4 flex items-center gap-2 font-semibold text-[#0F172A]">
                <CheckCircle2 className="size-5 text-[#16A34A]" />
                صندلی {seat.number}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="space-y-2">
                    <span className="text-sm font-medium text-[#0F172A]">
                      {field.label}
                    </span>
                    <input
                      inputMode={field.inputMode}
                      value={passengersBySeatId[seat.id]?.[field.key] ?? ""}
                      onChange={(event) =>
                        onPassengerChange(seat.id, field.key, event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                    {fieldErrorsBySeatId[seat.id]?.[field.key] && (
                      <span className="block text-xs text-[#DC2626]">
                        {fieldErrorsBySeatId[seat.id]?.[field.key]}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="inline-flex h-11 min-w-44 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          ثبت رزرو
        </button>
      </div>
    </div>
  );
}
