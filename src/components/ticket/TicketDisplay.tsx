"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Ticket } from "@/types/ticket";
import { DownloadPDFButton } from "./DownloadPDFButton";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((m) => m.QRCodeSVG),
  { ssr: false }
);

type Props = { ticket: Ticket };

export function TicketDisplay({ ticket }: Props) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://attieke-party.vercel.app";
  const ticketUrl = `${appUrl}/ticket/${ticket.ticketId}`;

  const createdAt = new Date(ticket._creationTime).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const update = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-base px-4 py-12">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={["#E8791A", "#F0C040", "#4A7A3A", "#FFFFFF", "#C43A1A"]}
          numberOfPieces={200}
          recycle={false}
        />
      )}

      <div className="max-w-md mx-auto">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="font-display text-4xl sm:text-5xl text-white leading-none">
            PAIEMENT
            <span className="block text-gold">CONFIRMÉ&nbsp;!</span>
          </h1>
          <p className="text-cream font-heading text-sm mt-3">
            Ton ticket est prêt. Présente le QR code à l&apos;entrée.
          </p>
        </div>

        {/* Ticket card */}
        <div className="bg-surface border border-gold/30 rounded-2xl overflow-hidden mb-6">
          {/* Ticket header */}
          <div className="bg-elevated px-6 py-5 text-center border-b border-dashed border-line-light">
            <p className="text-muted text-xs uppercase tracking-widest font-heading mb-1">
              BUE-ENEAM présente
            </p>
            <p className="font-display text-5xl text-white leading-none">
              ATTIÉKÉ
            </p>
            <p className="font-display text-5xl text-gold leading-none -mt-2">
              PARTY 🔥
            </p>
            <p className="text-cream text-sm font-heading mt-2">
              Lundi 25 Mai 2026 · À partir de 15H
            </p>
          </div>

          {/* Ticket body */}
          <div className="px-6 py-5 flex gap-6 items-center">
            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-muted text-xs uppercase tracking-widest font-heading">
                  Participant
                </p>
                <p className="text-white font-heading font-semibold">
                  {ticket.prenom} {ticket.nom}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-widest font-heading">
                  N° Ticket
                </p>
                <p className="text-gold font-heading font-bold text-lg">
                  {ticket.ticketId}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-widest font-heading">
                  Montant payé
                </p>
                <p className="text-cream font-heading font-semibold">
                  {ticket.amount.toLocaleString("fr-FR")} FCFA
                </p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-widest font-heading">
                  Émis le
                </p>
                <p className="text-cream text-sm font-heading capitalize">
                  {createdAt}
                </p>
              </div>
              {/* Confirmed badge */}
              <span className="inline-flex items-center gap-1.5 bg-leaf/20 border border-leaf/40 rounded-full px-3 py-1 text-leaf text-xs font-heading font-bold">
                ✓ Confirmé
              </span>
            </div>

            {/* Separator */}
            <div className="w-px bg-line-light self-stretch" />

            {/* QR Code */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-surface p-2 rounded-xl border border-line-light">
                <QRCodeSVG
                  value={ticketUrl}
                  size={100}
                  bgColor="transparent"
                  fgColor="#F0C040"
                  level="H"
                />
              </div>
              <p className="text-muted text-xs font-heading text-center">
                Scanner
                <br />à l&apos;entrée
              </p>
            </div>
          </div>

          {/* Ticket footer */}
          <div className="bg-elevated border-t border-dashed border-line-light px-6 py-3 text-center">
            <p className="text-muted text-xs font-heading">
              #BUE-ENEAM · #ATTIEKEPARTY · Non remboursable
            </p>
          </div>
        </div>

        {/* Download button */}
        <DownloadPDFButton ticket={ticket} />

        {/* WhatsApp share */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`🔥 J'ai mon ticket pour l'Attiéké Party ! Lundi 25 Mai 2026 · 15H · 2000 FCFA · BUE-ENEAM. Prends le tien → attieke-party.vercel.app`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full py-3.5 px-6 bg-[#25D366] text-white font-heading font-bold text-base rounded-xl hover:bg-[#1ebe5d] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Partager sur WhatsApp
        </a>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-muted hover:text-cream text-sm font-heading transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
