import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ownerTripsService } from "@/services/owner-trips.service";

export function useCreateOwnerTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ownerTripsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-trips"] });
    },
  });
}
