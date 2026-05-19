export type Ticket = {
  _id: string;
  ticketId: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  txnId: string;
  amount: number;
  currency: string;
  status: "confirmed" | "pending";
  _creationTime: number;
};
