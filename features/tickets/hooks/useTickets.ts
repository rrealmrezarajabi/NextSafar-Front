import { useQuery } from "@tanstack/react-query";

import { ticketsService } from "@/services/tickets.service";

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: ticketsService.list,
  });
}
