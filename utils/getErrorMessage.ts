import { AxiosError } from "axios";

type ApiErrorResponse = {
  detail?: string;
  message?: string;
  non_field_errors?: string[];
  phone?: string[];
  email?: string[];
  password?: string[];
  company_name?: string[];
  seat_ids?: string | string[];
  user?: string | string[];
  booking?: string | string[];
  method?: string | string[];
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (Array.isArray(data) && data[0]) return String(data[0]);
    if (data?.detail) return data.detail;
    if (data?.message) return data.message;
    if (data?.non_field_errors?.[0]) return data.non_field_errors[0];

    if (data?.phone?.[0]) return data.phone[0];
    if (data?.email?.[0]) return data.email[0];
    if (data?.password?.[0]) return data.password[0];
    if (data?.company_name?.[0]) return data.company_name[0];
    if (Array.isArray(data?.seat_ids) && data.seat_ids[0]) return data.seat_ids[0];
    if (typeof data?.seat_ids === "string") return data.seat_ids;
    if (Array.isArray(data?.user) && data.user[0]) return data.user[0];
    if (typeof data?.user === "string") return data.user;
    if (Array.isArray(data?.booking) && data.booking[0]) return data.booking[0];
    if (typeof data?.booking === "string") return data.booking;
    if (Array.isArray(data?.method) && data.method[0]) return data.method[0];
    if (typeof data?.method === "string") return data.method;

    return "خطایی از سمت سرور رخ داده است";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "خطای ناشناخته رخ داده است";
}
