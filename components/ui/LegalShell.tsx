import type { ReactNode } from "react";

type LegalShellProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalShell({
  title,
  updated,
  children,
}: LegalShellProps): React.ReactElement {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-bold tracking-tight text-cloud">{title}</h1>
      <p className="mt-3 text-sm text-cloud/40">Last updated: {updated}</p>
      <div className="mt-10 flex flex-col gap-8">{children}</div>
    </div>
  );
}

type LegalSectionProps = {
  heading: string;
  children: ReactNode;
};

export function LegalSection({
  heading,
  children,
}: LegalSectionProps): React.ReactElement {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-cloud">{heading}</h2>
      <div className="flex flex-col gap-3 leading-relaxed text-cloud/60">
        {children}
      </div>
    </section>
  );
}
