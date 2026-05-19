import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { TicketDisplay } from "@/components/ticket/TicketDisplay";
import { notFound } from "next/navigation";
import type { Ticket } from "@/types/ticket";

const client = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Ticket ${id} — Attiéké Party`,
  };
}

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await client.query(api.tickets.getTicketById, {
    ticketId: id,
  });

  if (!ticket) notFound();

  return <TicketDisplay ticket={ticket as unknown as Ticket} />;
}
