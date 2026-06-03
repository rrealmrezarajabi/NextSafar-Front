"use client";

import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useTripDetails } from "@/features/trips";
import { useAuthStore } from "@/store/auth.store";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { BookingSummary } from "./BookingSummary";
import { PassengerForms } from "./PassengerForms";
import { SeatMap } from "./SeatMap";
import { useBookingDraft } from "../hooks/useBookingDraft";
import { useCreateBooking } from "../hooks/useCreateBooking";
import { useTripSeats } from "../hooks/useTripSeats";

interface BookingClientProps {
  tripId: string;
}

function hasAuthToken() {
  return Boolean(Cookies.get("access_token") || Cookies.get("refresh_token"));
}

export function BookingClient({ tripId }: BookingClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const {
    data: trip,
    isLoading: isTripLoading,
    isError: isTripError,
  } = useTripDetails(tripId);
  const {
    data: seats = [],
    isLoading: areSeatsLoading,
    isError: areSeatsError,
    refetch: refetchSeats,
    isFetching: areSeatsFetching,
  } = useTripSeats(tripId);
  const bookingDraft = useBookingDraft(tripId, seats);
  const createBooking = useCreateBooking(tripId);

  const redirectToLogin = () => {
    bookingDraft.saveDraft();
    router.push(`/login?next=${encodeURIComponent(pathname)}`);
  };

  const submitBooking = () => {
    const validatedDraft = bookingDraft.validateDraft();

    if ("error" in validatedDraft) {
      toast.error(validatedDraft.error);
      return;
    }

    if (user?.role === "owner") {
      toast.error("حساب شرکت امکان رزرو بلیت ندارد");
      return;
    }

    if (!hasAuthToken()) {
      toast.info("برای ثبت رزرو ابتدا وارد حساب کاربری شوید");
      redirectToLogin();
      return;
    }

    createBooking.mutate(validatedDraft, {
      onSuccess: (booking) => {
        bookingDraft.clearDraft();
        toast.success("رزرو با موفقیت ساخته شد");
        router.push(`/payment/${booking.id}`);
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          toast.info("برای ثبت رزرو ابتدا وارد حساب کاربری شوید");
          redirectToLogin();
          return;
        }

        toast.error(getErrorMessage(error), { position: "bottom-center" });
      },
    });
  };

  if (isTripLoading || areSeatsLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm text-[#64748B] shadow-sm">
          در حال آماده‌سازی رزرو...
        </div>
      </section>
    );
  }

  if (isTripError || areSeatsError || !trip) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-6 text-sm text-[#DC2626]">
          خطا در دریافت اطلاعات رزرو
        </div>
      </section>
    );
  }

  const totalPrice = Number(trip.price) * bookingDraft.selectedSeatIds.length;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">انتخاب صندلی</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          {trip.origin_city_name} به {trip.destination_city_name}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SeatMap
          seats={seats}
          selectedSeatIds={bookingDraft.selectedSeatIds}
          isRefreshing={areSeatsFetching}
          onRefresh={() => refetchSeats()}
          onToggleSeat={bookingDraft.toggleSeat}
        />

        <BookingSummary
          seatCount={bookingDraft.selectedSeatIds.length}
          pricePerSeat={trip.price}
          totalPrice={totalPrice}
        />
      </div>

      <PassengerForms
        selectedSeats={bookingDraft.selectedSeats}
        passengersBySeatId={bookingDraft.passengersBySeatId}
        fieldErrorsBySeatId={bookingDraft.fieldErrorsBySeatId}
        isSubmitting={createBooking.isPending}
        onPassengerChange={bookingDraft.updatePassenger}
        onSubmit={submitBooking}
      />
    </section>
  );
}
