import { useQuery } from "@tanstack/react-query";

import { bookingService } from "@/services/booking.service";
import type { BookingListParams } from "@/types/booking.types";

export function useBookings(params?: BookingListParams) {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: () => bookingService.list(params),
  });
}
