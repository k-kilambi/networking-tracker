import { deleteConversation } from "@/app/(app)/contacts/conversation-actions";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import type { Conversation } from "@/lib/conversations";
import { formatDate } from "@/lib/dates";

export function ConversationList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  if (conversations.length === 0) {
    return <p className="text-sm text-muted-foreground">No conversations logged yet.</p>;
  }

  return (
    <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
      {conversations.map((conversation) => (
        <li key={conversation.id} className="flex items-start justify-between gap-3 p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium">
              {formatDate(conversation.date)} ·{" "}
              <span className="capitalize">{conversation.type}</span>
            </p>
            {conversation.notes && (
              <p className="mt-1 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                {conversation.notes}
              </p>
            )}
          </div>
          <ConfirmDeleteButton
            action={deleteConversation.bind(null, conversation.id, conversation.contact_id)}
            label={`Delete conversation from ${formatDate(conversation.date)}`}
            message="Delete this conversation? Any tasks linked to it will stay. This can't be undone."
          />
        </li>
      ))}
    </ul>
  );
}
