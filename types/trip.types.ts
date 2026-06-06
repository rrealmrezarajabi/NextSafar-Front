export type TripStatus =
  | "active"
  | "scheduled"
  | "cancelled"
  | "canceled"
  | "completed"
  | "فعال"
  | "لغو شده"
  | "انجام شده";

const tripStatusLabels: Record<TripStatus, string> = {
  active: "فعال",
  scheduled: "فعال",
  cancelled: "لغو شده",
  canceled: "لغو شده",
  completed: "انجام شده",
  فعال: "فعال",
  "لغو شده": "لغو شده",
  "انجام شده": "انجام شده",
};

export function getTripStatusLabel(status: TripStatus | string) {
  return tripStatusLabels[status as TripStatus] ?? status;
}

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
