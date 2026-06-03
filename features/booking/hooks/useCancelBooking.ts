import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookingService } from "@/services/booking.service";

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
