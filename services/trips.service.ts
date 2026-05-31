import { api } from "./api";
import type { SearchTripsParams, Trip } from "@/types/trip.types";

export const tripsService = {
  search: async (params: SearchTripsParams) => {
    const res = await api.get<Trip[]>("/api/trips/company/trips/search/", {
      params,
    });

    return res.data;
  },

  getById: async (id: number | string) => {
    const res = await api.get<Trip>(`/api/trips/company/trips/${id}/`);

    return res.data;
  },
};
