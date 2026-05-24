import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTicket = mutation({
  args: {
    ticketId: v.string(),
    prenom: v.string(),
    nom: v.string(),
    email: v.string(),
    phone: v.string(),
    txnId: v.string(),
    amount: v.number(),
    currency: v.string(),
    isComplimentary: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tickets", {
      ...args,
      status: "confirmed",
    });
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tickets").order("desc").collect();
  },
});

export const scanTicket = mutation({
  args: { ticketId: v.string() },
  handler: async (ctx, { ticketId }) => {
    const ticket = await ctx.db
      .query("tickets")
      .withIndex("by_ticket_id", (q) => q.eq("ticketId", ticketId))
      .first();

    if (!ticket) return { type: "invalid" as const };
    if (ticket.status !== "confirmed") return { type: "not_confirmed" as const };

    if (ticket.isUsed === true) {
      return {
        type: "already_used" as const,
        name: `${ticket.prenom} ${ticket.nom}`,
        usedAt: ticket.usedAt ?? null,
      };
    }

    await ctx.db.patch(ticket._id, { isUsed: true, usedAt: Date.now() });

    return {
      type: "ok" as const,
      name: `${ticket.prenom} ${ticket.nom}`,
      amount: ticket.amount,
    };
  },
});

export const createComplimentaryTicket = mutation({
  args: {
    ticketId: v.string(),
    label: v.optional(v.string()),
  },
  handler: async (ctx, { ticketId, label }) => {
    return await ctx.db.insert("tickets", {
      ticketId,
      prenom: label ?? "Invité",
      nom: "",
      email: "",
      phone: "",
      txnId: `COMP-${ticketId}`,
      amount: 0,
      currency: "XOF",
      status: "confirmed",
      isComplimentary: true,
    });
  },
});

export const getTicketById = query({
  args: { ticketId: v.string() },
  handler: async (ctx, { ticketId }) => {
    return await ctx.db
      .query("tickets")
      .withIndex("by_ticket_id", (q) => q.eq("ticketId", ticketId))
      .first();
  },
});
