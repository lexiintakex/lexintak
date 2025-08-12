// validation/clientSchema.ts
import { z } from "zod";

export const clientSchema = z.object({
  full_name: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  form_type: z.enum(["I130", "I485", ""]).refine((val) => !!val, {
    message: "Form type is required",
  }),
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  required_documents: z
    .array(
      z.object({
        label: z.string(),
        type: z.string(),
      })
    )
    .min(1, "Please select at least one document"),
});
