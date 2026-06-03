import { api } from "./api";
import type {
  Booking,
  BookingListParams,
  BookingStats,
  CancelBookingResponse,
  CreateBookingPayload,
  TripSeat,
} from "@/types/booking.types";

export const bookingService = {
  list: async (params?: BookingListParams) => {
    const res = await api.get<Booking[]>("/api/bookings/", { params });

    return res.data;
  },

  getTripSeats: async (tripId: number | string) => {
    const res = await api.get<TripSeat[]>(`/api/company/trips/${tripId}/seats/`);

    return res.data;
  },

  getById: async (bookingId: number | string) => {
    const res = await api.get<Booking>(`/api/bookings/${bookingId}/`);

    return res.data;
  },

  create: async (payload: CreateBookingPayload) => {
    const res = await api.post<Booking>("/api/bookings/", payload);

    return res.data;
  },

  cancel: async (bookingId: number | string) => {
    const res = await api.patch<CancelBookingResponse>(
      `/api/bookings/${bookingId}/cancel/`,
    );

    return res.data;
  },

  stats: async () => {
    const res = await api.get<BookingStats>("/api/bookings/stats/");

    return res.data;
  },
};
