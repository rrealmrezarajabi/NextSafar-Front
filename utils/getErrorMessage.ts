import { AxiosError } from "axios";

type ApiErrorResponse = {
  detail?: string;
  message?: string;
  non_field_errors?: string[];
  phone?: string[];
  email?: string[];
  password?: string[];
  company_name?: string[];
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.detail) return data.detail;
    if (data?.message) return data.message;
    if (data?.non_field_errors?.[0]) return data.non_field_errors[0];

    if (data?.phone?.[0]) return data.phone[0];
    if (data?.email?.[0]) return data.email[0];
    if (data?.password?.[0]) return data.password[0];
    if (data?.company_name?.[0]) return data.company_name[0];

    return "خطایی از سمت سرور رخ داده است";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "خطای ناشناخته رخ داده است";
}
