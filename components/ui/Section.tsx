import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  children,
  className,
}: SectionProps): React.ReactElement {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-content px-6 py-20 sm:py-28 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps): React.ReactElement {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-cloud/60">{description}</p>
      ) : null}
    </div>
  );
}
