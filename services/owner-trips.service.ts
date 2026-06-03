import { api } from "./api";
import type { PaginatedResponse } from "@/types/api.types";
import type { Trip } from "@/types/trip.types";

export interface CreateTripPayload {
  bus: number;
  origin_city: number;
  destination_city: number;
  departure: string;
  arrival: string;
  price: number;
}

function normalizeList<T>(data: T[] | PaginatedResponse<T>) {
  return Array.isArray(data) ? data : data.results;
}

export const ownerTripsService = {
  list: async () => {
    const res = await api.get<Trip[] | PaginatedResponse<Trip>>(
      "/api/company/trips/",
    );

    return normalizeList(res.data);
  },

  create: async (payload: CreateTripPayload) => {
    const res = await api.post<Trip>("/api/company/trips/", payload);

    return res.data;
  },
};
