"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY ?? "ENEAM2026";
const SESSION_KEY = "ap_admin_auth";

function formatTime(ts: number) {
  return new Date(ts).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent: "fire" | "gold" | "leaf" | "muted";
}) {
  const colors = {
    fire: "text-fire border-fire/20 bg-fire/5",
    gold: "text-gold border-gold/20 bg-gold/5",
    leaf: "text-[#4A7A3A] border-[#4A7A3A]/20 bg-[#4A7A3A]/5",
    muted: "text-muted border-line bg-elevated",
  };
  return (
    <div className={`rounded-2xl border p-6 ${colors[accent]}`}>
      <p className="text-xs font-heading uppercase tracking-widest text-muted mb-2">
        {label}
      </p>
      <p className={`font-display text-4xl ${accent !== "muted" ? colors[accent].split(" ")[0] : "text-cream"}`}>
        {value}
      </p>
      {sub && (
        <p className="text-xs font-heading text-muted mt-1">{sub}</p>
      )}
    </div>
  );
}

function Dashboard() {
  const tickets = useQuery(api.tickets.listAll);

  if (tickets === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-fire border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted font-heading text-sm">Connexion Convex…</p>
        </div>
      </div>
    );
  }

  const confirmed = tickets.filter((t) => t.status === "confirmed");
  const pending = tickets.filter((t) => t.status === "pending");
  const scanned = tickets.filter((t) => t.isUsed === true);
  const paid = confirmed.filter((t) => !t.isComplimentary);
  const comps = confirmed.filter((t) => t.isComplimentary === true);
  const totalRevenue = paid.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-base px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl text-white">
              DASHBOARD
            </h1>
            <p className="text-muted font-heading text-sm mt-1 tracking-widest uppercase">
              Attiéké Party · BUE-ENEAM · 25 Mai 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 bg-fire/10 border border-fire/30 rounded-full px-4 py-2 text-fire font-heading text-xs uppercase tracking-widest hover:bg-fire/20 transition-colors"
            >
              🎟 Scanner
            </Link>
            <span className="inline-flex items-center gap-2 bg-[#4A7A3A]/10 border border-[#4A7A3A]/30 rounded-full px-4 py-2 text-[#4A7A3A] font-heading text-xs uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7A3A] animate-pulse" />
              Temps réel
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <StatCard
            label="Tickets vendus"
            value={String(paid.length)}
            sub="payants confirmés"
            accent="gold"
          />
          <StatCard
            label="Recettes"
            value={`${totalRevenue.toLocaleString("fr-FR")} F`}
            sub="FCFA encaissés"
            accent="fire"
          />
          <StatCard
            label="Scannés"
            value={String(scanned.length)}
            sub={`/ ${confirmed.length} entrées`}
            accent="leaf"
          />
          <StatCard
            label="Invités"
            value={String(comps.length)}
            sub="billets offerts"
            accent="muted"
          />
          <StatCard
            label="En attente"
            value={String(pending.length)}
            sub="non confirmés"
            accent="muted"
          />
        </div>

        {/* Table */}
        <div className="bg-surface border border-line rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-display text-xl text-white">PAIEMENTS</h2>
            <span className="text-muted font-heading text-xs">
              {tickets.length} entrée{tickets.length !== 1 ? "s" : ""}
            </span>
          </div>

          {tickets.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">🎟</p>
              <p className="text-muted font-heading text-sm">
                Aucun paiement pour l&apos;instant
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-heading">
                <thead>
                  <tr className="border-b border-line text-muted text-xs uppercase tracking-widest">
                    <th className="text-left px-6 py-3">#</th>
                    <th className="text-left px-4 py-3">Nom</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Téléphone</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Email</th>
                    <th className="text-right px-4 py-3">Montant</th>
                    <th className="text-center px-4 py-3">Statut</th>
                    <th className="text-right px-6 py-3 hidden lg:table-cell">Heure</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t, i) => (
                    <tr
                      key={t._id}
                      className="border-b border-line/50 hover:bg-elevated/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-muted text-xs">
                        {tickets.length - i}
                      </td>
                      <td className="px-4 py-4 text-cream font-semibold whitespace-nowrap">
                        {t.prenom} {t.nom}
                      </td>
                      <td className="px-4 py-4 text-muted hidden sm:table-cell whitespace-nowrap">
                        {t.phone}
                      </td>
                      <td className="px-4 py-4 text-muted hidden md:table-cell max-w-[180px] truncate">
                        {t.email}
                      </td>
                      <td className="px-4 py-4 text-right text-gold font-semibold whitespace-nowrap">
                        {t.amount.toLocaleString("fr-FR")} F
                      </td>
                      <td className="px-4 py-4 text-center">
                        {t.status === "confirmed" ? (
                          <span className="inline-block bg-[#4A7A3A]/15 text-[#4A7A3A] border border-[#4A7A3A]/30 rounded-full px-3 py-1 text-xs">
                            ✓ Confirmé
                          </span>
                        ) : (
                          <span className="inline-block bg-fire/10 text-fire border border-fire/20 rounded-full px-3 py-1 text-xs">
                            ⏳ En attente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right text-muted text-xs hidden lg:table-cell whitespace-nowrap">
                        {formatTime(t._creationTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_KEY) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 1500);
    }
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-line rounded-2xl p-8">
        <h1 className="font-display text-3xl text-white text-center mb-1">
          DASHBOARD
        </h1>
        <p className="text-muted font-heading text-xs text-center tracking-widest uppercase mb-8">
          Attiéké Party — Accès restreint
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mot de passe"
            autoFocus
            className={`w-full bg-elevated border rounded-xl px-4 py-3 text-cream font-heading text-sm placeholder:text-muted/50 outline-none transition-colors ${
              error
                ? "border-ember focus:border-ember"
                : "border-line focus:border-fire"
            }`}
          />
          {error && (
            <p className="text-ember font-heading text-xs text-center">
              Mot de passe incorrect
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-fire text-white font-heading font-bold text-sm uppercase py-3 rounded-xl hover:bg-ember transition-colors"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    setChecked(true);
  }, []);

  const handleAuth = useCallback(() => setAuthed(true), []);

  if (!checked) return null;
  if (!authed) return <PasswordGate onAuth={handleAuth} />;
  return <Dashboard />;
}
