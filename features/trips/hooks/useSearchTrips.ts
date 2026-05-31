import { useQuery } from "@tanstack/react-query";

import { tripsService } from "@/services/trips.service";
import type { SearchTripsParams } from "@/types/trip.types";

export function useSearchTrips(params: SearchTripsParams) {
  return useQuery({
    queryKey: ["trips", "search", params],
    queryFn: () => tripsService.search(params),
    enabled: Boolean(params.origin || params.destination || params.date),
  });
}
