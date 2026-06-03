import { api } from "./api";
import type { PaginatedResponse } from "@/types/api.types";
import type { Bus, CreateBusPayload } from "@/types/bus.types";

function normalizeList<T>(data: T[] | PaginatedResponse<T>) {
  return Array.isArray(data) ? data : data.results;
}

export const busesService = {
  list: async () => {
    const res = await api.get<Bus[] | PaginatedResponse<Bus>>(
      "/api/company/buses/",
    );

    return normalizeList(res.data);
  },

  create: async (payload: CreateBusPayload) => {
    const res = await api.post<Bus>("/api/company/buses/", payload);

    return res.data;
  },
};
