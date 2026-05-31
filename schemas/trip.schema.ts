import { z } from "zod";

export const tripSearchSchema = z
  .object({
    origin: z.string().trim().min(1, "مبدا الزامی است"),

    destination: z.string().trim().min(1, "مقصد الزامی است"),

    date: z.string().min(1, "تاریخ حرکت الزامی است"),
  })
  .refine(
    (data) => data.origin.toLowerCase() !== data.destination.toLowerCase(),
    {
      path: ["destination"],
      message: "مبدا و مقصد نمی‌توانند یکسان باشند",
    },
  );

export type TripSearchFormValues = z.infer<typeof tripSearchSchema>;
