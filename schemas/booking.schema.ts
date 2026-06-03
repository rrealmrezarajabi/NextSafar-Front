import { z } from "zod";

export const passengerSchema = z.object({
  first_name: z.string().trim().min(1, "نام الزامی است"),
  last_name: z.string().trim().min(1, "نام خانوادگی الزامی است"),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل باید مثل 09123456789 باشد"),
  national_code: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
});

export const createBookingSchema = z.object({
  trip: z.number(),
  seat_ids: z.array(z.number()).min(1, "حداقل یک صندلی انتخاب کنید"),
  passengers: z.array(passengerSchema).min(1),
});

export type PassengerFormValues = z.infer<typeof passengerSchema>;
export type CreateBookingFormValues = z.infer<typeof createBookingSchema>;
