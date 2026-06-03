import { api } from "./api";
import type { Ticket } from "@/types/ticket.types";

export const ticketsService = {
  list: async () => {
    const res = await api.get<Ticket[]>("/api/tickets/");

    return res.data;
  },

  getById: async (id: string | number) => {
    const res = await api.get<Ticket>(`/api/tickets/${id}/`);

    return res.data;
  },
};
