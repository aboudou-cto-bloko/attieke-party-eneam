import Link from "next/link";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Réserver ma place — Attiéké Party",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-base px-4 py-12">
      <div className="max-w-md mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-cream text-sm font-heading transition-colors mb-8"
        >
          ← Retour
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-fire text-xs uppercase tracking-widest font-heading mb-2">
            BUE-ENEAM · 25 Mai 2026
          </p>
          <h1 className="font-display text-5xl text-white leading-none">
            RÉSERVER
            <span className="block text-gold">MA PLACE</span>
          </h1>
          <p className="text-muted text-sm font-heading mt-3">
            Remplis le formulaire puis procède au paiement.
            <br />
            Ton ticket PDF arrivera immédiatement.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-surface border border-line rounded-2xl p-6">
          <CheckoutForm />
        </div>
      </div>
    </main>
  );
}
