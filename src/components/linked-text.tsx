const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

// Shows notes as text, turning web addresses into links someone can click.
export function LinkedText({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_PATTERN).map((part, index) =>
        index % 2 === 1 ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}
