import { useMemo, useState } from "react";

import { createBookingSchema } from "@/schemas/booking.schema";
import type { PassengerPayload, TripSeat } from "@/types/booking.types";

type PassengerErrors = Partial<Record<keyof PassengerPayload, string>>;

const emptyPassenger: PassengerPayload = {
  first_name: "",
  last_name: "",
  phone: "",
  national_code: "",
};

function getDraftKey(tripId: string | number) {
  return `booking-draft:${tripId}`;
}

interface BookingDraft {
  selectedSeatIds: number[];
  passengersBySeatId: Record<number, PassengerPayload>;
}

function readDraft(tripId: string | number): BookingDraft {
  if (typeof window === "undefined") {
    return { selectedSeatIds: [], passengersBySeatId: {} };
  }

  const rawDraft = sessionStorage.getItem(getDraftKey(tripId));

  if (!rawDraft) {
    return { selectedSeatIds: [], passengersBySeatId: {} };
  }

  try {
    const draft = JSON.parse(rawDraft) as BookingDraft;

    return {
      selectedSeatIds: draft.selectedSeatIds ?? [],
      passengersBySeatId: draft.passengersBySeatId ?? {},
    };
  } catch {
    sessionStorage.removeItem(getDraftKey(tripId));

    return { selectedSeatIds: [], passengersBySeatId: {} };
  }
}

export function useBookingDraft(tripId: string | number, seats: TripSeat[]) {
  const numericTripId = Number(tripId);
  const initialDraft = useMemo(() => readDraft(tripId), [tripId]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>(
    initialDraft.selectedSeatIds,
  );
  const [passengersBySeatId, setPassengersBySeatId] = useState<
    Record<number, PassengerPayload>
  >(initialDraft.passengersBySeatId);
  const [fieldErrorsBySeatId, setFieldErrorsBySeatId] = useState<
    Record<number, PassengerErrors>
  >({});

  const selectedSeats = useMemo(() => {
    const seatById = new Map(seats.map((seat) => [seat.id, seat]));

    return selectedSeatIds
      .map((seatId) => seatById.get(seatId))
      .filter((seat): seat is TripSeat => Boolean(seat));
  }, [seats, selectedSeatIds]);

  const selectedPassengers = selectedSeatIds.map(
    (seatId) => passengersBySeatId[seatId] ?? emptyPassenger,
  );

  const toggleSeat = (seat: TripSeat) => {
    if (seat.status !== "available") return;

    setSelectedSeatIds((currentSeatIds) =>
      currentSeatIds.includes(seat.id)
        ? currentSeatIds.filter((seatId) => seatId !== seat.id)
        : [...currentSeatIds, seat.id],
    );
  };

  const updatePassenger = (
    seatId: number,
    field: keyof PassengerPayload,
    value: string,
  ) => {
    setPassengersBySeatId((current) => ({
      ...current,
      [seatId]: {
        ...(current[seatId] ?? emptyPassenger),
        [field]: value,
      },
    }));
    setFieldErrorsBySeatId((current) => ({
      ...current,
      [seatId]: {
        ...(current[seatId] ?? {}),
        [field]: undefined,
      },
    }));
  };

  const validateDraft = () => {
    const parsed = createBookingSchema.safeParse({
      trip: numericTripId,
      seat_ids: selectedSeatIds,
      passengers: selectedPassengers,
    });

    if (parsed.success) {
      setFieldErrorsBySeatId({});

      return parsed.data;
    }

    const nextErrors: Record<number, PassengerErrors> = {};
    let seatError: string | null = null;

    for (const issue of parsed.error.issues) {
      if (issue.path[0] === "seat_ids") {
        seatError = issue.message;
      }

      if (issue.path[0] === "passengers") {
        const passengerIndex = Number(issue.path[1]);
        const field = issue.path[2] as keyof PassengerPayload | undefined;
        const seatId = selectedSeatIds[passengerIndex];

        if (field && seatId) {
          nextErrors[seatId] = {
            ...(nextErrors[seatId] ?? {}),
            [field]: issue.message,
          };
        }
      }
    }

    setFieldErrorsBySeatId(nextErrors);

    return { error: seatError ?? "اطلاعات مسافرها را کامل کنید" };
  };

  const saveDraft = () => {
    sessionStorage.setItem(
      getDraftKey(tripId),
      JSON.stringify({
        selectedSeatIds,
        passengersBySeatId,
      }),
    );
  };

  const clearDraft = () => {
    sessionStorage.removeItem(getDraftKey(tripId));
  };

  return {
    selectedSeatIds,
    selectedSeats,
    passengersBySeatId,
    fieldErrorsBySeatId,
    toggleSeat,
    updatePassenger,
    validateDraft,
    saveDraft,
    clearDraft,
  };
}
