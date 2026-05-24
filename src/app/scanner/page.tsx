"use client";

import { useState, useEffect, useCallback } from "react";
import { ScannerView } from "@/components/scanner/ScannerView";

const ADMIN_KEY   = process.env.NEXT_PUBLIC_ADMIN_KEY ?? "ENEAM2026";
const SESSION_KEY = "ap_admin_auth";

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [input, setInput] = useState("");
  const [shake, setShake]  = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_KEY) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuth();
    } else {
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-line rounded-2xl p-8">
        <div className="text-center mb-8">
          <p className="text-4xl mb-2">🎟</p>
          <h1 className="font-display text-3xl text-white">SCANNER</h1>
          <p className="text-muted font-heading text-xs uppercase tracking-widest mt-1">
            Accès réservé au staff
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mot de passe staff"
            autoFocus
            className={`w-full bg-elevated border rounded-xl px-4 py-3 text-cream font-heading text-sm
              placeholder:text-muted/50 outline-none transition-all
              ${shake ? "border-ember animate-shake" : "border-line focus:border-fire"}`}
          />
          <button
            type="submit"
            className="w-full bg-fire text-white font-heading font-bold text-sm uppercase py-3.5 rounded-xl
              hover:bg-ember active:scale-[0.98] transition-all"
          >
            Accéder au scanner
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ScannerPage() {
  const [authed,  setAuthed]  = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    setChecked(true);
  }, []);

  const handleAuth = useCallback(() => setAuthed(true), []);

  if (!checked) return null;
  if (!authed)  return <PasswordGate onAuth={handleAuth} />;
  return <ScannerView />;
}
