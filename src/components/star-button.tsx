import { Star } from "lucide-react";
import { toggleStar } from "@/app/(app)/contacts/actions";

type StarButtonProps = {
  contactId: number;
  name: string;
  isStarred: boolean;
};

export function StarButton({ contactId, name, isStarred }: StarButtonProps) {
  const label = isStarred ? `Unstar ${name}` : `Star ${name}`;

  return (
    <form action={toggleStar.bind(null, contactId, isStarred)}>
      <button
        type="submit"
        aria-label={label}
        aria-pressed={isStarred}
        title={label}
        className="block rounded p-1 hover:bg-muted"
      >
        <Star
          className={isStarred ? "size-4 fill-amber-400 text-amber-500" : "size-4 text-muted-foreground"}
        />
      </button>
    </form>
  );
}
