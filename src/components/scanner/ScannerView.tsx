"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import jsQR from "jsqr";

type ScanResult =
  | { type: "ok"; name: string; amount: number }
  | { type: "already_used"; name: string; usedAt: number | null }
  | { type: "invalid" }
  | { type: "not_confirmed" }
  | { type: "error" };

type ScanEntry = {
  key: string;
  ticketId: string;
  time: number;
  resultType: ScanResult["type"];
  name?: string;
};

function extractTicketId(raw: string): string {
  if (raw.includes("/ticket/")) {
    return raw.split("/ticket/").pop()?.split("?")[0] ?? raw;
  }
  return raw.trim();
}

function playBeep(ok: boolean) {
  try {
    const ac = new AudioContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    gain.gain.setValueAtTime(0.35, ac.currentTime);
    if (ok) {
      osc.frequency.setValueAtTime(523, ac.currentTime);
      osc.frequency.setValueAtTime(880, ac.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.4);
    } else {
      osc.frequency.setValueAtTime(220, ac.currentTime);
      osc.frequency.setValueAtTime(160, ac.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);
    }
    osc.start();
    osc.stop(ac.currentTime + 0.5);
    setTimeout(() => ac.close(), 1000);
  } catch { /* silently fail */ }
}

const RESULT_CONFIG = {
  ok:            { icon: "✓", label: "TICKET VALIDE",           border: "border-leaf",  text: "text-leaf",  bg: "bg-leaf/10"  },
  already_used:  { icon: "⚠", label: "DÉJÀ SCANNÉ",            border: "border-fire",  text: "text-fire",  bg: "bg-fire/10"  },
  invalid:       { icon: "✗", label: "TICKET INVALIDE",         border: "border-ember", text: "text-ember", bg: "bg-ember/10" },
  not_confirmed: { icon: "✗", label: "PAIEMENT NON CONFIRMÉ",   border: "border-ember", text: "text-ember", bg: "bg-ember/10" },
  error:         { icon: "!", label: "ERREUR DE CONNEXION",     border: "border-ember", text: "text-ember", bg: "bg-ember/10" },
} as const;

export function ScannerView() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const busyRef   = useRef(false);
  const lastCodeRef = useRef("");
  const lastTimeRef = useRef(0);

  const [result,   setResult]   = useState<ScanResult | null>(null);
  const [scans,    setScans]    = useState<ScanEntry[]>([]);
  const [camError, setCamError] = useState<string | null>(null);

  const scanTicket = useMutation(api.tickets.scanTicket);
  const allTickets = useQuery(api.tickets.listAll);

  const confirmed = allTickets?.filter((t) => t.status === "confirmed").length ?? 0;
  const scannedCount = allTickets?.filter((t) => t.isUsed).length ?? 0;

  const handleCode = useCallback(
    async (raw: string) => {
      const ticketId = extractTicketId(raw);
      const now = Date.now();

      if (busyRef.current) return;
      if (ticketId === lastCodeRef.current && now - lastTimeRef.current < 4000) return;

      busyRef.current   = true;
      lastCodeRef.current = ticketId;
      lastTimeRef.current = now;

      let res: ScanResult;
      try {
        res = (await scanTicket({ ticketId })) as ScanResult;
      } catch {
        res = { type: "error" };
      }

      setResult(res);
      setScans((prev) =>
        [
          {
            key: String(now),
            ticketId,
            time: now,
            resultType: res.type,
            name: "name" in res ? res.name : undefined,
          },
          ...prev,
        ].slice(0, 10)
      );

      playBeep(res.type === "ok");

      setTimeout(() => {
        setResult(null);
        busyRef.current = false;
      }, 3500);
    },
    [scanTicket]
  );

  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let stream: MediaStream;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      if (video.readyState >= video.HAVE_ENOUGH_DATA && !busyRef.current) {
        canvas.width  = video.videoWidth  || 640;
        canvas.height = video.videoHeight || 480;
        const ctx2d = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx2d) {
          ctx2d.drawImage(video, 0, 0);
          const img = ctx2d.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(img.data, img.width, img.height, {
            inversionAttempts: "dontInvert",
          });
          if (code?.data) handleCode(code.data);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((s) => {
        if (!alive) { s.getTracks().forEach((t) => t.stop()); return; }
        stream = s;
        video.srcObject = s;
        video.play().then(tick);
      })
      .catch(() => {
        if (alive) setCamError("Accès à la caméra refusé.\nAutorise l'accès caméra dans les réglages du navigateur.");
      });

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [handleCode]);

  const cfg = result ? RESULT_CONFIG[result.type] : null;

  return (
    <div className="min-h-screen bg-base flex flex-col select-none">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 pt-6 pb-3">
        <div>
          <h1 className="font-display text-4xl text-white leading-none">SCANNER</h1>
          <p className="text-muted font-heading text-xs uppercase tracking-widest mt-0.5">
            Attiéké Party · BUE-ENEAM · 25 Mai 2026
          </p>
        </div>
        <div className="flex gap-2">
          <div className="text-center bg-surface border border-line rounded-xl px-3 py-2 min-w-[56px]">
            <p className="font-display text-3xl text-gold leading-none">{scannedCount}</p>
            <p className="text-muted font-heading text-[10px] uppercase tracking-wide mt-0.5">Scannés</p>
          </div>
          <div className="text-center bg-surface border border-line rounded-xl px-3 py-2 min-w-[56px]">
            <p className="font-display text-3xl text-cream leading-none">{confirmed}</p>
            <p className="text-muted font-heading text-[10px] uppercase tracking-wide mt-0.5">Total</p>
          </div>
        </div>
      </div>

      {/* ── Camera view ────────────────────────────────── */}
      <div className="relative bg-black overflow-hidden" style={{ height: "52vw", minHeight: 240, maxHeight: 380 }}>
        {camError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="text-5xl">📷</span>
            <p className="text-cream font-heading text-sm whitespace-pre-line">{camError}</p>
          </div>
        ) : (
          <>
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline autoPlay />
            <canvas ref={canvasRef} className="hidden" />

            {/* Viewfinder */}
            {!result && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{ width: 220, height: 220 }}>
                  {/* 4 corner brackets */}
                  {(["tl","tr","br","bl"] as const).map((corner) => (
                    <div
                      key={corner}
                      className={`absolute w-8 h-8 ${
                        corner === "tl" ? "top-0 left-0" :
                        corner === "tr" ? "top-0 right-0" :
                        corner === "br" ? "bottom-0 right-0" :
                                          "bottom-0 left-0"
                      }`}
                    >
                      <div className={`absolute h-[3px] w-full bg-gold ${corner.startsWith("b") ? "bottom-0" : "top-0"}`} />
                      <div className={`absolute w-[3px] h-full bg-gold ${corner.endsWith("r")  ? "right-0"  : "left-0"}`} />
                    </div>
                  ))}
                  {/* Scan line */}
                  <div className="absolute inset-x-0 h-[2px] bg-gold/70 scanner-line" />
                </div>
              </div>
            )}

            {/* Result overlay */}
            {result && cfg && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm">
                <div className={`${cfg.bg} border-2 ${cfg.border} rounded-2xl px-8 py-6 mx-6 text-center`}>
                  <p className={`font-display text-7xl ${cfg.text} leading-none`}>{cfg.icon}</p>
                  <p className={`font-display text-xl ${cfg.text} mt-2`}>{cfg.label}</p>
                  {"name" in result && result.name && (
                    <p className="text-cream font-heading font-semibold text-base mt-3">{result.name}</p>
                  )}
                  {result.type === "ok" && (
                    <p className="text-muted font-heading text-sm mt-1">
                      {result.amount.toLocaleString("fr-FR")} FCFA
                    </p>
                  )}
                  {result.type === "already_used" && result.usedAt && (
                    <p className="text-muted font-heading text-xs mt-1">
                      Scanné à&nbsp;
                      {new Date(result.usedAt).toLocaleTimeString("fr-FR", {
                        hour: "2-digit", minute: "2-digit", second: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Hint ───────────────────────────────────────── */}
      <p className="text-center text-muted font-heading text-xs py-2">
        {result ? "Traitement…" : "Pointe vers un QR code de ticket"}
      </p>

      {/* ── Scan log ───────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <p className="text-muted font-heading text-xs uppercase tracking-widest mb-2">
          Historique
        </p>

        {scans.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-2">🎟</p>
            <p className="text-muted font-heading text-sm">Aucun scan encore</p>
          </div>
        ) : (
          <div className="space-y-2">
            {scans.map((s) => {
              const c = RESULT_CONFIG[s.resultType];
              return (
                <div
                  key={s.key}
                  className={`flex items-center gap-3 bg-surface border rounded-xl px-4 py-3 ${c.border}/30`}
                >
                  <span className={`font-display text-2xl ${c.text} w-6 text-center flex-shrink-0`}>
                    {c.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-cream font-heading text-sm font-semibold truncate">
                      {s.name ?? s.ticketId}
                    </p>
                    <p className={`font-heading text-xs ${c.text}`}>{c.label}</p>
                  </div>
                  <p className="text-muted font-heading text-xs flex-shrink-0">
                    {new Date(s.time).toLocaleTimeString("fr-FR", {
                      hour: "2-digit", minute: "2-digit", second: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
