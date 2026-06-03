export type BusType = "normal" | "vip";

export interface Bus {
  id: number;
  company: number;
  name: string;
  type: BusType;
  seat_count: number;
  created_at: string;
}

export interface CreateBusPayload {
  name: string;
  type: BusType;
  seat_count: number;
}
