import { useQuery } from "@tanstack/react-query";

import { bookingService } from "@/services/booking.service";

export function useTripSeats(tripId: string | number) {
  return useQuery({
    queryKey: ["trip-seats", tripId],
    queryFn: () => bookingService.getTripSeats(tripId),
    enabled: Boolean(tripId),
  });
}
