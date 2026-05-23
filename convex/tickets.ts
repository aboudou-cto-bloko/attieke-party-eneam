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

export const getTicketById = query({
  args: { ticketId: v.string() },
  handler: async (ctx, { ticketId }) => {
    return await ctx.db
      .query("tickets")
      .withIndex("by_ticket_id", (q) => q.eq("ticketId", ticketId))
      .first();
  },
});
