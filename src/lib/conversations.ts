export const CONVERSATION_TYPES = [
  "coffee chat",
  "call",
  "email",
  "text",
  "event",
] as const;

export type Conversation = {
  id: number;
  contact_id: number;
  date: string;
  type: (typeof CONVERSATION_TYPES)[number];
  notes: string | null;
  created_at: string;
};
