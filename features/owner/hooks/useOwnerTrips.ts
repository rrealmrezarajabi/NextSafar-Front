import { useQuery } from "@tanstack/react-query";

import { ownerTripsService } from "@/services/owner-trips.service";

export function useOwnerTrips() {
  return useQuery({
    queryKey: ["owner-trips"],
    queryFn: ownerTripsService.list,
  });
}
