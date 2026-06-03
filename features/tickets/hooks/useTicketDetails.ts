import { useQuery } from "@tanstack/react-query";

import { ticketsService } from "@/services/tickets.service";

export function useTicketDetails(id: string | number) {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => ticketsService.getById(id),
    enabled: Boolean(id),
  });
}
