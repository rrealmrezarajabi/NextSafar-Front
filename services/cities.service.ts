import { api } from "./api";
import type { City } from "@/types/city.types";

export const citiesService = {
  list: async () => {
    const res = await api.get<City[]>("/api/cities/");

    return res.data;
  },
};
