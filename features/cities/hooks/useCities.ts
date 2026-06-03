import { useQuery } from "@tanstack/react-query";

import { citiesService } from "@/services/cities.service";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: citiesService.list,
  });
}
