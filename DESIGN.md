# DESIGN SYSTEM — Attiéké Party ENEAM
> Site de billetterie en ligne · BUE-ENEAM · Lundi 25 Mai 2026

---

## 1. Identité visuelle

### Inspiration
Trois affiches sources dans `/assets/` :
- `affiche-1.jpeg` — Dark fire theme (fond brun-noir, flammes, bol d'attiéké fumant) → **référence principale**
- `affiche-2.jpeg` — Bois sombre, panier picnic, jeux (dames/ludo/cartes), guirlandes lumineuses
- `affiche-3.jpeg` — Fond tropical clair, palmiers, poisson grillé + attiéké, soleil

**Direction artistique** : Dark tropical & festive. Fond sombre chaleureux avec accents feu et or. Énergie chill + vibes africaines.

---

## 2. Palette de couleurs

```
-- Backgrounds
--bg-base:      #0C0B07   /* noir chaud, fond page */
--bg-surface:   #1A1812   /* cartes, sections */
--bg-surface-2: #221F14   /* hover états, inputs */

-- Accents (extraits des affiches)
--fire:         #E8791A   /* orange feu — CTA principal */
--gold:         #F0C040   /* or/jaune — highlights, prix, titres secondaires */
--green-leaf:   #4A7A3A   /* vert feuille tropicale — badges, accents */
--red-warm:     #C43A1A   /* rouge feu — urgence, sold-out */

-- Texte
--text-primary:   #FFFFFF
--text-secondary: #C8B890   /* crème chaud — sous-titres */
--text-muted:     #7A7060   /* labels, placeholders */

-- Bordures
--border:       #2E2A1C
--border-light: #3D3826
```

### Tailwind config custom tokens
```js
// tailwind.config.ts
colors: {
  bg: {
    base: '#0C0B07',
    surface: '#1A1812',
    surface2: '#221F14',
  },
  fire: '#E8791A',
  gold: '#F0C040',
  leaf: '#4A7A3A',
  warm: {
    100: '#C8B890',
    400: '#7A7060',
    900: '#2E2A1C',
  }
}
```

---

## 3. Typographie

| Rôle | Font | Poids | Notes |
|------|------|-------|-------|
| Display (ATTIEKÉ PARTY) | `Bebas Neue` | 400 (condensed) | Google Fonts · tout en caps comme les affiches |
| Heading (h2, h3) | `Outfit` | 700 | Google Fonts · moderne |
| Body, labels, UI | `Inter` | 400/500/600 | Next.js par défaut |

```tsx
// app/layout.tsx — Google Fonts
import { Bebas_Neue, Outfit, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
```

---

## 4. Composants UI récurrents

### Bouton CTA principal
```
Bg: fire (#E8791A)  → hover: #D06810
Text: blanc, font-bold, uppercase
Radius: rounded-xl
Padding: px-8 py-4
Ombre: shadow-[0_0_20px_rgba(232,121,26,0.4)]
Hover: shadow + scale-[1.02] transition
```

### Badge événement (date/heure/prix)
```
Bg: bg-surface-2, border border-warm-900
Icon: colored emoji ou SVG
Text: gold pour valeurs, warm-100 pour labels
```

### Carte ticket (page de confirmation)
```
Fond: bg-surface
Border: border-gold/30
Coins découpés (notch) avec pseudo-element ::before/::after
Ligne pointillée horizontale séparant header et corps
Grain/texture subtle via SVG filter ou CSS noise
```

### Input formulaire
```
Bg: bg-surface-2
Border: border-warm-900 → focus: border-fire
Text: white
Label: text-warm-100, text-sm, font-medium
Radius: rounded-lg
```

---

## 5. Structure des pages

### `GET /` — Landing page

```
┌─────────────────────────────────────┐
│  HERO (100vh)                       │
│  • Background: affiche-1.jpeg       │
│    avec overlay gradient dark       │
│  • Logo BUE-ENEAM (haut centre)     │
│  • "BUE-ENEAM PRÉSENTE"             │
│  • ATTIÉKÉ  (Bebas, ~7xl, white)    │
│  • PARTY    (Bebas, ~7xl, gold)     │
│  • Tagline: "Le rendez-vous chill…" │
│  • CTA: [Réserver — 3 000 FCFA]     │
│  • Scroll arrow                     │
├─────────────────────────────────────┤
│  INFOS ÉVÉNEMENT (section)          │
│  • 3 cards : 📅 Date · 🕒 Heure · 🎟 Prix │
│  • Lundi 25 Mai 2026 · 15H · 3000 FCFA │
├─────────────────────────────────────┤
│  ACTIVITÉS (4 cards en grille)      │
│  ♟️ Jeux  🍉 Bouffe  🎵 Musique  📸 Fun  │
├─────────────────────────────────────┤
│  GALERIE / AMBIANCE                 │
│  • 2 autres affiches en aperçu      │
├─────────────────────────────────────┤
│  CTA FINAL                          │
│  "Ramène ton équipe" + bouton       │
├─────────────────────────────────────┤
│  FOOTER                             │
│  #BUE-ENEAM #ATTIEKEPARTY #Jeux     │
└─────────────────────────────────────┘
```

### `GET /checkout` — Formulaire + paiement

```
┌─────────────────────────────────────┐
│  Header: "Réserver ma place"        │
│  Sous-titre: 1 ticket · 3 000 FCFA  │
├─────────────────────────────────────┤
│  FORMULAIRE                         │
│  • Prénom *                         │
│  • Nom *                            │
│  • Email *                          │
│  • Téléphone * (format béninois)    │
├─────────────────────────────────────┤
│  RÉCAPITULATIF                      │
│  • 1 × Ticket Attiéké Party         │
│  • Total: 3 000 FCFA                │
├─────────────────────────────────────┤
│  [Payer avec FedaPay]               │
│  FedaCheckoutButton déclenché       │
│  après validation du form           │
└─────────────────────────────────────┘
```

### `GET /ticket/[id]` — Ticket + téléchargement

```
┌─────────────────────────────────────┐
│  ✅ "Paiement confirmé !"           │
│  Sous-titre: confirmation email     │
├─────────────────────────────────────┤
│  TICKET VISUEL                      │
│  ┌───────────────────────────┐      │
│  │ BUE-ENEAM                 │      │
│  │ ATTIÉKÉ PARTY 🔥           │      │
│  │ Lundi 25 Mai 2026 · 15H   │      │
│  ├ · · · · · · · · · · · · ·┤      │
│  │ Nom: ZINSOU François      │      │
│  │ Ticket #: AP-XXXX         │      │
│  │ Entrée: 3 000 FCFA        │      │
│  │              [QR CODE]    │      │
│  └───────────────────────────┘      │
├─────────────────────────────────────┤
│  [⬇ Télécharger mon ticket PDF]     │
│  [Partager sur WhatsApp]            │
└─────────────────────────────────────┘
```

---

## 6. Architecture technique

### Stack
```
Next.js 15 (App Router)
TypeScript (strict, pas de any)
Tailwind CSS v4
shadcn/ui (composants UI)
fedapay-reactjs     — paiement FedaPay
qrcode.react        — génération QR code (côté client)
@react-pdf/renderer — génération PDF (côté client)
nanoid              — IDs de tickets uniques
Zod                 — validation formulaire
```

### Stockage tickets
**Choix : JSON file local** (site mono-événement, ~100-500 tickets max)
```
data/
  tickets.json    ← [{id, prenom, nom, email, phone, txnId, createdAt}]
```
Route API `/api/tickets/[id]` lit ce fichier.
⚠️ Pour Vercel : migrer vers Vercel KV ou Convex (1h de travail).

### Flux utilisateur complet
```
[Landing /]
    ↓ CTA "Réserver"
[/checkout]
    ↓ Form validation (Zod)
    ↓ FedaCheckoutButton.onComplete(resp)
    ↓ Si resp.reason === FedaPay.CHECKOUT_COMPLETED
        → POST /api/tickets { prenom, nom, email, phone, txnId }
        ← { id: "AP-abc123" }
    ↓ router.push(`/ticket/AP-abc123`)
[/ticket/AP-abc123]
    ↓ fetch ticket data
    ↓ Render ticket visuel + QR code
    ↓ Bouton → generatePDF() côté client
    ↓ download ticket.pdf
```

### Structure de fichiers
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    ← landing
│   ├── checkout/
│   │   └── page.tsx
│   ├── ticket/
│   │   └── [id]/
│   │       └── page.tsx
│   └── api/
│       └── tickets/
│           ├── route.ts            ← POST (créer ticket)
│           └── [id]/
│               └── route.ts       ← GET (lire ticket)
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── EventInfo.tsx
│   │   ├── Activities.tsx
│   │   └── CTASection.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   └── FedaPayButton.tsx
│   └── ticket/
│       ├── TicketCard.tsx
│       ├── TicketQRCode.tsx
│       └── DownloadPDFButton.tsx
├── lib/
│   ├── tickets.ts                  ← CRUD fichier JSON
│   ├── ticket-pdf.tsx              ← template @react-pdf/renderer
│   └── validations.ts              ← schémas Zod
└── types/
    └── ticket.ts
```

---

## 7. Modèle de données — Ticket

```typescript
// types/ticket.ts
export type Ticket = {
  id: string          // "AP-" + nanoid(8) ex: "AP-k8mN3xPq"
  prenom: string
  nom: string
  email: string
  phone: string
  txnId: string       // ID transaction FedaPay
  amount: number      // 3000
  currency: string    // "XOF"
  createdAt: string   // ISO 8601
  status: 'confirmed' | 'pending'
}
```

---

## 8. Variables d'environnement

```bash
# .env.local
FEDAPAY_PUBLIC_KEY=pk_sandbox_XXXXXXXX     # sandbox pour dev
FEDAPAY_SECRET_KEY=sk_sandbox_XXXXXXXX     # pour vérif côté serveur
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY=pk_sandbox_XXXXXXXX  # exposé client
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 9. Animations & micro-interactions

| Élément | Animation |
|---------|-----------|
| Hero titre | fade-in + slide-up au chargement (100ms stagger par mot) |
| CTA button | pulse glow sur l'ombre au hover |
| Cards activités | hover: scale-105 + border-fire/50 |
| Confetti | react-confetti sur la page ticket (succès paiement) |
| QR code | apparition avec zoom-in après 300ms |

---

## 10. Assets naming

Renommer les fichiers avant import dans le projet :

| Fichier original | Renommage | Usage |
|-----------------|-----------|-------|
| `WhatsApp Image 2026-05-19 at 20.44.23.jpeg` | `affiche-dark.jpg` | Hero background |
| `WhatsApp Image 2026-05-19 at 20.44.24 (1).jpeg` | `affiche-picnic.jpg` | Galerie / section ambiance |
| `WhatsApp Image 2026-05-19 at 20.44.24.jpeg` | `affiche-tropical.jpg` | Galerie / section ambiance |

---

## 11. Responsive

| Breakpoint | Comportement |
|-----------|-------------|
| Mobile (< 640px) | Hero plein écran, stack vertical, ticket pleine largeur |
| Tablet (640-1024px) | Grid 2 colonnes pour activités |
| Desktop (> 1024px) | Layout centré max-w-4xl, ticket card flottante |

---

## 12. SEO & Meta

```tsx
// app/layout.tsx
export const metadata = {
  title: 'Attiéké Party — BUE-ENEAM · 25 Mai 2026',
  description: 'Le rendez-vous chill que tu ne dois surtout pas manquer ! Jeux, bouffe, musique. Entrée 3 000 FCFA.',
  openGraph: {
    images: ['/og-attieke-party.jpg'],  // affiche-dark.jpg recadrée
  }
}
```

---

## 13. Checklist avant mise en ligne

- [ ] Clés FedaPay production (remplacer sandbox)
- [ ] `NEXT_PUBLIC_APP_URL` → URL de production
- [ ] Test paiement end-to-end (sandbox FedaPay)
- [ ] Test génération PDF sur mobile
- [ ] Vérifier QR code scannable
- [ ] Backup `data/tickets.json` configuré
- [ ] OG image uploadée
