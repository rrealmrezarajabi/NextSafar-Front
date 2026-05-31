export type TripStatus = "scheduled" | "cancelled" | "completed";

export interface Trip {
  id: number;
  bus: number;
  origin_city: string | number;
  destination_city: string | number;
  origin_city_name?: string;
  destination_city_name?: string;
  departure: string;
  arrival: string;
  price: string;
  status: TripStatus;
  company: number;
  company_name?: string;
  bus_type: string;
  available_seats: number;
}

export interface SearchTripsParams {
  origin?: string;
  destination?: string;
  date?: string;
}
