import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookingService } from "@/services/booking.service";

export function useCreateBooking(tripId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.create,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-seats", tripId] });
    },
  });
}
