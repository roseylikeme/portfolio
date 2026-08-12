export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={`mx-auto max-w-5xl px-5 py-16 sm:py-20 ${className}`}
    >
      {(eyebrow || title) && (
        <div className="mb-10">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              id={`${id}-heading`}
              className="text-2xl font-bold sm:text-3xl"
            >
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
