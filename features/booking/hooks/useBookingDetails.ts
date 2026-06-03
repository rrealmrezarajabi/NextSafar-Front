import { useQuery } from "@tanstack/react-query";

import { bookingService } from "@/services/booking.service";

export function useBookingDetails(bookingId: string | number) {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => bookingService.getById(bookingId),
    enabled: Boolean(bookingId),
  });
}
