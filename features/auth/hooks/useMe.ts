import { useQuery } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    retry: false,
  });
}
