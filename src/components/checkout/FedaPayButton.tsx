"use client";

import type { CheckoutFormData } from "@/lib/validations";

declare global {
  interface Window {
    FedaPay: {
      init: (options: FedaPayInitOptions) => { open: () => void };
      CHECKOUT_COMPLETED: string;
      DIALOG_DISMISSED: string;
    };
  }
}

type FedaPayInitOptions = {
  public_key: string;
  transaction: { amount: number; description: string };
  currency: { iso: string };
  customer?: {
    email: string;
    firstname: string;
    lastname: string;
    phone_number?: { number: string; country: string };
  };
  onComplete: (resp: {
    reason: string;
    transaction: { id: number | string };
  }) => void;
};

type Props = {
  formData: CheckoutFormData;
  disabled?: boolean;
  loading?: boolean;
  onSuccess: (txnId: string) => void;
};

export function FedaPayButton({ formData, disabled, loading, onSuccess }: Props) {
  const handleClick = () => {
    if (typeof window === "undefined" || !window.FedaPay) {
      alert(
        "Le module de paiement n'est pas encore chargé. Réessaie dans un instant."
      );
      return;
    }

    window.FedaPay.init({
      public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY as string,
      transaction: {
        amount: 3200,
        description: "Ticket Attiéké Party — BUE-ENEAM · 25 Mai 2026",
      },
      currency: { iso: "XOF" },
      customer: {
        email: formData.email,
        firstname: formData.prenom,
        lastname: formData.nom,
        phone_number: { number: formData.phone, country: "BJ" },
      },
      onComplete(resp) {
        if (resp.reason === window.FedaPay.CHECKOUT_COMPLETED) {
          onSuccess(String(resp.transaction.id));
        }
      },
    }).open();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className="w-full py-4 px-8 bg-fire text-white font-heading font-bold text-lg uppercase rounded-xl shadow-[0_0_20px_rgba(232,121,26,0.35)] hover:shadow-[0_0_35px_rgba(232,121,26,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
    >
      {loading ? (
        <>
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Création du ticket...
        </>
      ) : (
        <>
          Payer 3 200 FCFA
          <span className="text-xl">🔒</span>
        </>
      )}
    </button>
  );
}
