import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tickets: defineTable({
    ticketId: v.string(),
    prenom: v.string(),
    nom: v.string(),
    email: v.string(),
    phone: v.string(),
    txnId: v.string(),
    amount: v.number(),
    currency: v.string(),
    status: v.union(v.literal("confirmed"), v.literal("pending")),
    isUsed: v.optional(v.boolean()),
    usedAt: v.optional(v.number()),
  })
    .index("by_ticket_id", ["ticketId"])
    .index("by_txn_id", ["txnId"]),
});
