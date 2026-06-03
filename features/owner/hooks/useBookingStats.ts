import { useQuery } from "@tanstack/react-query";

import { bookingService } from "@/services/booking.service";

export function useBookingStats() {
  return useQuery({
    queryKey: ["booking-stats"],
    queryFn: bookingService.stats,
  });
}
