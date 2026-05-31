import { z } from "zod";

export const tripSearchSchema = z.object({
  origin: z.string().min(1, "مبدا الزامی است"),
  destination: z.string().min(1, "مقصد الزامی است"),
  date: z.string().min(1, "تاریخ الزامی است"),
});

export type TripSearchFormValues = z.infer<typeof tripSearchSchema>;
