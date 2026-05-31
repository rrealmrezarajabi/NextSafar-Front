import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(10, "شماره موبایل معتبر نیست"),
  password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),
});

export const registerUserSchema = z.object({
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
  phone: z.string().min(10, "شماره موبایل معتبر نیست"),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),
});

export const registerOwnerSchema = registerUserSchema.extend({
  company_name: z.string().min(1, "نام شرکت الزامی است"),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterUserPayload = z.infer<typeof registerUserSchema>;
export type RegisterOwnerPayload = z.infer<typeof registerOwnerSchema>;
