import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { Ticket } from "@/types/ticket";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0C0B07",
    padding: 0,
    fontFamily: "Helvetica",
  },
  container: {
    margin: 32,
    backgroundColor: "#1A1812",
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid #3D3826",
  },
  header: {
    backgroundColor: "#221F14",
    padding: 24,
    borderBottom: "1px dashed #3D3826",
    alignItems: "center",
  },
  org: {
    color: "#7A7060",
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  titleAttieke: {
    color: "#FFFFFF",
    fontSize: 48,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
  },
  titleParty: {
    color: "#F0C040",
    fontSize: 48,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
    marginTop: -4,
  },
  subtitle: {
    color: "#C8B890",
    fontSize: 11,
    marginTop: 8,
  },
  body: {
    padding: 24,
    flexDirection: "row",
    gap: 0,
  },
  infoColumn: {
    flex: 1,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    color: "#7A7060",
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  infoValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  infoValueGold: {
    color: "#F0C040",
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  divider: {
    width: 1,
    backgroundColor: "#3D3826",
    marginHorizontal: 20,
  },
  qrColumn: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },
  qrLabel: {
    color: "#7A7060",
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 8,
  },
  footer: {
    backgroundColor: "#221F14",
    padding: 12,
    borderTop: "1px dashed #3D3826",
    alignItems: "center",
  },
  footerText: {
    color: "#7A7060",
    fontSize: 8,
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: "#E8791A",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },
});

type Props = {
  ticket: Ticket;
  qrDataUrl: string;
};

export function TicketPDF({ ticket, qrDataUrl }: Props) {
  const date = new Date(ticket._creationTime).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.org}>BUE-ENEAM PRÉSENTE</Text>
            <Text style={styles.titleAttieke}>ATTIÉKÉ</Text>
            <Text style={styles.titleParty}>PARTY 🔥</Text>
            <Text style={styles.subtitle}>
              Lundi 25 Mai 2026 · À partir de 15H
            </Text>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Participant</Text>
                <Text style={styles.infoValue}>
                  {ticket.prenom} {ticket.nom}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{ticket.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>N° Ticket</Text>
                <Text style={styles.infoValueGold}>{ticket.ticketId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Montant payé</Text>
                <Text style={styles.infoValueGold}>
                  {ticket.amount.toLocaleString("fr-FR")} FCFA
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Émis le</Text>
                <Text style={styles.infoValue}>{date}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✓ CONFIRMÉ</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* QR Code */}
            <View style={styles.qrColumn}>
              <Image src={qrDataUrl} style={{ width: 110, height: 110 }} />
              <Text style={styles.qrLabel}>Scanner à l&apos;entrée</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              #BUE-ENEAM · #ATTIEKEPARTY · Non remboursable · Un ticket par
              personne
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
