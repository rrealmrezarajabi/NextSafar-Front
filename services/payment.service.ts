import { api } from "./api";
import type {
  CreatePaymentPayload,
  CreatePaymentResponse,
} from "@/types/payment.types";

export const paymentService = {
  pay: async (payload: CreatePaymentPayload) => {
    const res = await api.post<CreatePaymentResponse>(
      "/api/payments/pay/",
      payload,
    );

    return res.data;
  },
};
