import { useQuery } from "@tanstack/react-query";

import { tripsService } from "@/services/trips.service";

export function useTripDetails(id: string | number) {
  return useQuery({
    queryKey: ["trip", id],
    queryFn: () => tripsService.getById(id),
    enabled: Boolean(id),
  });
}
