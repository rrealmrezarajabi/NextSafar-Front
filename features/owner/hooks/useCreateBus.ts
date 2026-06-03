import { useMutation, useQueryClient } from "@tanstack/react-query";

import { busesService } from "@/services/buses.service";

export function useCreateBus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: busesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });
}
