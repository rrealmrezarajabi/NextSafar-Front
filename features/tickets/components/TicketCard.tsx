import { CalendarDays, MapPin, TicketCheck } from "lucide-react";

import type { Ticket } from "@/types/ticket.types";

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const departure = new Date(ticket.trip.departure);

  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#2563EB]">
            <TicketCheck className="size-5" />
            <span className="text-sm font-semibold">بلیت #{ticket.id}</span>
          </div>

          <h2 className="mt-3 text-lg font-bold text-[#0F172A]">
            {ticket.trip.origin_city} به {ticket.trip.destination_city}
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            مسافر: {ticket.passenger.first_name} {ticket.passenger.last_name}
          </p>
        </div>

        <div className="grid gap-3 text-sm md:min-w-64">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-[#F8FAFC] px-4 py-3">
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <MapPin className="size-4" />
              صندلی
            </span>
            <span className="font-bold text-[#0F172A]">{ticket.seat_number}</span>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-[#F8FAFC] px-4 py-3">
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <CalendarDays className="size-4" />
              حرکت
            </span>
            <span className="font-semibold text-[#0F172A]">
              {departure.toLocaleDateString("fa-IR")} -{" "}
              {departure.toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <p className="text-xs text-[#64748B]">کد بلیت</p>
        <p className="mt-2 break-all text-sm font-semibold text-[#0F172A]">
          {ticket.ticket_code}
        </p>
      </div>
    </article>
  );
}
