import { useQuery } from "@tanstack/react-query";

import { busesService } from "@/services/buses.service";

export function useBuses() {
  return useQuery({
    queryKey: ["buses"],
    queryFn: busesService.list,
  });
}
