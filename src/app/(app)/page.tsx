import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Home</h1>
      <p className="mt-2 text-muted-foreground">
        Your tasks will appear here. For now, start with your{" "}
        <Link href="/contacts" className="font-medium text-primary hover:underline">
          contacts
        </Link>
        .
      </p>
    </div>
  );
}
