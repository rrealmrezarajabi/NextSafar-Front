import { AxiosError } from "axios";

import { api } from "./api";
import type { SearchTripsParams, Trip } from "@/types/trip.types";

export const tripsService = {
  search: async (params: SearchTripsParams) => {
    try {
      const res = await api.get<Trip[]>("/api/company/trips/search/", {
        params,
      });

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return [];
      }

      throw error;
    }
  },

  getById: async (id: number | string) => {
    const res = await api.get<Trip>(`/api/company/trips/${id}/`);

    return res.data;
  },
};
