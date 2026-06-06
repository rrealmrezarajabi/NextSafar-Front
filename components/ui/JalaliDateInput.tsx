"use client";

import { useMemo, useState } from "react";

import {
  getJalaliMonthLength,
  jalaliToGregorianDateString,
  parseGregorianDate,
  toJalali,
} from "@/lib/jalali-date";

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const selectClassName =
  "h-12 min-w-0 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-2 text-sm font-medium text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 sm:px-3";

interface JalaliDateInputProps {
  value: string;
  onChange: (value: string) => void;
  includeTime?: boolean;
}

interface JalaliDateDraft {
  jy: number | "";
  jm: number | "";
  jd: number | "";
}

function getTimePart(value: string) {
  const match = value.match(/T(\d{2}:\d{2})/);

  return match?.[1] ?? "";
}

export function JalaliDateInput({
  value,
  onChange,
  includeTime = false,
}: JalaliDateInputProps) {
  const selectedJalali = useMemo(() => {
    const gregorianDate = parseGregorianDate(value);

    if (!gregorianDate) {
      return null;
    }

    return toJalali(gregorianDate.gy, gregorianDate.gm, gregorianDate.gd);
  }, [value]);
  const todayJalali = useMemo(() => {
    const today = new Date();

    return toJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }, []);
  const [timeValue, setTimeValue] = useState(getTimePart(value));
  const [draft, setDraft] = useState<JalaliDateDraft>({
    jy: selectedJalali?.jy ?? "",
    jm: selectedJalali?.jm ?? "",
    jd: selectedJalali?.jd ?? "",
  });
  const [previousValue, setPreviousValue] = useState(value);

  if (value !== previousValue) {
    setPreviousValue(value);
    setTimeValue(getTimePart(value));
    setDraft({
      jy: selectedJalali?.jy ?? "",
      jm: selectedJalali?.jm ?? "",
      jd: selectedJalali?.jd ?? "",
    });
  }

  const selectedYear = draft.jy;
  const selectedMonth = draft.jm;
  const selectedDay = draft.jd;
  const years = useMemo(() => {
    const yearsList = Array.from(
      { length: 7 },
      (_, index) => todayJalali.jy - 1 + index,
    );

    if (selectedJalali && !yearsList.includes(selectedJalali.jy)) {
      yearsList.push(selectedJalali.jy);
      yearsList.sort((a, b) => a - b);
    }

    return yearsList;
  }, [selectedJalali, todayJalali.jy]);
  const dayCount =
    draft.jy && draft.jm
      ? getJalaliMonthLength(Number(draft.jy), Number(draft.jm))
      : 31;

  const updateDate = (next: Partial<JalaliDateDraft>) => {
    const nextDraft = {
      ...draft,
      ...next,
    };

    if (nextDraft.jy && nextDraft.jm && nextDraft.jd) {
      const maxDay = getJalaliMonthLength(
        Number(nextDraft.jy),
        Number(nextDraft.jm),
      );

      if (Number(nextDraft.jd) > maxDay) {
        nextDraft.jd = maxDay;
      }
    }

    setDraft(nextDraft);

    if (!nextDraft.jy || !nextDraft.jm || !nextDraft.jd) {
      onChange("");
      return;
    }

    const nextDate = jalaliToGregorianDateString(
      Number(nextDraft.jy),
      Number(nextDraft.jm),
      Number(nextDraft.jd),
    );

    onChange(includeTime ? `${nextDate}T${timeValue || "00:00"}` : nextDate);
  };

  const updateTime = (nextTime: string) => {
    setTimeValue(nextTime);

    if (!includeTime || !parseGregorianDate(value)) {
      return;
    }

    const datePart = value.slice(0, 10);

    onChange(`${datePart}T${nextTime || "00:00"}`);
  };

  return (
    <div className="space-y-2">
      <div
        className={
          includeTime
            ? "grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)_minmax(0,1fr)] gap-2"
            : "grid grid-cols-[1fr_1.4fr_1fr] gap-2"
        }
        dir="rtl"
      >
        <select
          value={selectedDay}
          onChange={(event) =>
            updateDate({
              jd: event.target.value ? Number(event.target.value) : "",
            })
          }
          className={selectClassName}
          aria-label="روز"
        >
          <option value="">روز</option>
          {Array.from({ length: dayCount }, (_, index) => index + 1).map(
            (day) => (
              <option key={day} value={day}>
                {day.toLocaleString("fa-IR")}
              </option>
            ),
          )}
        </select>

        <select
          value={selectedMonth}
          onChange={(event) =>
            updateDate({
              jm: event.target.value ? Number(event.target.value) : "",
            })
          }
          className={selectClassName}
          aria-label="ماه"
        >
          <option value="">ماه</option>
          {monthNames.map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(event) =>
            updateDate({
              jy: event.target.value ? Number(event.target.value) : "",
            })
          }
          className={selectClassName}
          aria-label="سال"
        >
          <option value="">سال</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year.toLocaleString("fa-IR", { useGrouping: false })}
            </option>
          ))}
        </select>
      </div>

      {includeTime && (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
          <span className="text-xs font-medium text-[#64748B]">ساعت</span>
          <input
            type="time"
            value={timeValue}
            onChange={(event) => updateTime(event.target.value)}
            className="h-12 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-medium text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            aria-label="ساعت"
          />
        </div>
      )}
    </div>
  );
}
