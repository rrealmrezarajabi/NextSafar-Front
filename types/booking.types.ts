export type SeatStatus = "available" | "reserved" | "unavailable";

export interface TripSeat {
  id: number;
  number: number;
  status: SeatStatus;
}

export interface PassengerPayload {
  first_name: string;
  last_name: string;
  phone: string;
  national_code: string;
}

export interface CreateBookingPayload {
  trip: number;
  seat_ids: number[];
  passengers: PassengerPayload[];
}

export type BookingStatus = "pending_payment" | "paid" | "expired" | "canceled";

export interface BookingTripDetails {
  id: number;
  origin_city: string;
  destination_city: string;
  departure: string;
  arrival: string;
  price: string;
}

export interface Booking {
  id: number;
  user: number;
  trip: number;
  trip_details?: BookingTripDetails;
  passenger_count?: number;
  expires_at: string | null;
  status: BookingStatus;
  total_price: string;
}

export interface BookingListParams {
  status?: BookingStatus | "";
  from_date?: string;
  to_date?: string;
}

export interface CancelBookingResponse {
  message: string;
  booking_id: number;
  status: BookingStatus;
  cancelled_by: "user" | "company_owner";
}

export interface BookingStats {
  total_bookings: number;
  paid_bookings: number;
  pending_bookings: number;
  cancelled_bookings: number;
  expired_bookings: number;
  total_revenue: string | null;
}
