export type PaymentStatus = "success" | "pending" | "failed";
export type PaymentMethod = "fake_gateway";

export interface Payment {
  id: number;
  booking: number;
  amount: string;
  tracking_code: string;
  status: PaymentStatus;
  paid_at: string | null;
}

export interface CreatePaymentPayload {
  booking: number;
  method: PaymentMethod;
}

export interface CreatePaymentResponse {
  payment: Payment;
  ticket_ids: number[] | null;
}
