import Link from "next/link";
import { Logo } from "@/components/Logo";
import { footerColumns, site } from "@/lib/content";

export function Footer(): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-navy/40">
      <div className="mx-auto w-full max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-cloud/50">
              {site.description}
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-sm text-brand hover:text-brand/80"
            >
              {site.contactEmail}
            </a>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-cloud">
                {column.title}
              </span>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-cloud/50 hover:text-cloud"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-cloud/40">
            © {year} {site.name}. Open source. Self-hostable.
          </p>
          <p className="text-sm text-cloud/40">
            80% deterministic code. 20% LLM.
          </p>
        </div>
      </div>
    </footer>
  );
}
