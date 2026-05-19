"use client";

import React, { useState } from "react";
import type { Ticket } from "@/types/ticket";

type Props = { ticket: Ticket };

export function DownloadPDFButton({ ticket }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const qrDataUrl = await QRCode.toDataURL(
        `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/ticket/${ticket.ticketId}`,
        { width: 220, margin: 1, color: { dark: "#F0C040", light: "#1A1812" } }
      );

      const [{ pdf }, { TicketPDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/lib/ticket-pdf"),
      ]);

      // @react-pdf/renderer pdf() expects DocumentProps but TicketPDF wraps it
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const element = React.createElement(TicketPDF as any, {
        ticket,
        qrDataUrl,
      }) as any;
      const blob = await pdf(element).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket-attieke-party-${ticket.ticketId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la génération du PDF. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="w-full py-4 px-8 bg-fire text-white font-heading font-bold text-lg uppercase rounded-xl shadow-[0_0_20px_rgba(232,121,26,0.35)] hover:shadow-[0_0_35px_rgba(232,121,26,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
    >
      {loading ? (
        <>
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Génération du PDF...
        </>
      ) : (
        <>
          <span>⬇</span>
          Télécharger mon ticket PDF
        </>
      )}
    </button>
  );
}
