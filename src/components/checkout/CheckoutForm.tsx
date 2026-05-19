"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { nanoid } from "nanoid";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations";
import { FedaPayButton } from "./FedaPayButton";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-ember text-xs mt-1 font-heading">{message}</p>;
}

export function CheckoutForm() {
  const router = useRouter();
  const createTicket = useMutation(api.tickets.createTicket);
  const [creating, setCreating] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const handleFedaPaySuccess = async (txnId: string) => {
    setCreating(true);
    const formData = getValues();
    const ticketId = `AP-${nanoid(8)}`;

    try {
      await createTicket({
        ticketId,
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        phone: formData.phone,
        txnId,
        amount: 3200,
        currency: "XOF",
      });
      router.push(`/ticket/${ticketId}`);
    } catch {
      setCreating(false);
      alert("Erreur lors de la création du ticket. Contacte le support.");
    }
  };

  return (
    <form onSubmit={handleSubmit(() => {})} className="space-y-5" noValidate>
      {/* Prénom + Nom */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-cream text-sm font-heading font-medium mb-1.5">
            Prénom <span className="text-fire">*</span>
          </label>
          <input
            {...register("prenom")}
            placeholder="François"
            className="w-full bg-elevated border border-line rounded-lg px-4 py-3 text-white placeholder:text-muted text-sm font-heading focus:outline-none focus:border-fire transition-colors"
          />
          <FieldError message={errors.prenom?.message} />
        </div>
        <div>
          <label className="block text-cream text-sm font-heading font-medium mb-1.5">
            Nom <span className="text-fire">*</span>
          </label>
          <input
            {...register("nom")}
            placeholder="Zinsou"
            className="w-full bg-elevated border border-line rounded-lg px-4 py-3 text-white placeholder:text-muted text-sm font-heading focus:outline-none focus:border-fire transition-colors"
          />
          <FieldError message={errors.nom?.message} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-cream text-sm font-heading font-medium mb-1.5">
          Email <span className="text-fire">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="ton@email.com"
          className="w-full bg-elevated border border-line rounded-lg px-4 py-3 text-white placeholder:text-muted text-sm font-heading focus:outline-none focus:border-fire transition-colors"
        />
        <FieldError message={errors.email?.message} />
        <p className="text-muted text-xs mt-1 font-heading">
          Le ticket sera associé à cet email
        </p>
      </div>

      {/* Téléphone */}
      <div>
        <label className="block text-cream text-sm font-heading font-medium mb-1.5">
          Téléphone <span className="text-fire">*</span>
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+229 01 XX XX XX XX"
          className="w-full bg-elevated border border-line rounded-lg px-4 py-3 text-white placeholder:text-muted text-sm font-heading focus:outline-none focus:border-fire transition-colors"
        />
        <FieldError message={errors.phone?.message} />
      </div>

      {/* Récap */}
      <div className="bg-elevated border border-gold/20 rounded-xl p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cream font-heading text-sm font-medium">
              1 × Ticket Attiéké Party
            </p>
            <p className="text-muted text-xs font-heading mt-0.5">
              Lundi 25 Mai 2026 · 15H · BUE-ENEAM
            </p>
          </div>
          <p className="text-cream font-heading text-sm font-semibold">3 000 FCFA</p>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-2.5">
          <p className="text-muted font-heading text-xs">Frais de billetterie</p>
          <p className="text-muted font-heading text-xs">200 FCFA</p>
        </div>
        <div className="flex items-center justify-between border-t border-line-light pt-2.5">
          <p className="text-cream font-heading text-sm font-bold">Total à payer</p>
          <p className="text-gold font-display text-2xl">3 200 FCFA</p>
        </div>
      </div>

      {/* Bouton paiement */}
      <FedaPayButton
        formData={getValues()}
        disabled={!isValid}
        loading={creating}
        onSuccess={handleFedaPaySuccess}
      />

      <p className="text-center text-muted text-xs font-heading">
        🔒 Paiement sécurisé via FedaPay · Mobile Money & Carte bancaire
      </p>
    </form>
  );
}
