import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paymentService } from "@/services/payment.service";

export function useCreatePayment(bookingId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentService.pay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    },
  });
}
