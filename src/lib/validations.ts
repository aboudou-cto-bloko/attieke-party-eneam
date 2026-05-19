import { z } from "zod";

export const checkoutSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(8, "Numéro invalide")
    .regex(/^[\d\s+()-]{8,}$/, "Format de numéro invalide"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
