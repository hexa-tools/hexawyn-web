import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CopyCommand } from "@/components/ui/CopyCommand";
import { site } from "@/lib/content";

export function CTA(): React.ReactElement {
  return (
    <section id="cta" className="mx-auto w-full max-w-content px-6 pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-navy/60 px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
              Your next outage shouldn&apos;t be your first warning.
            </h2>
            <p className="max-w-xl text-lg text-cloud/60">
              Install hexawyn, point it at a cluster, and ask your first
              question. It runs on your machine, in about a minute.
            </p>
            <CopyCommand command={site.installCommand} className="max-w-sm" />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand/90"
              >
                <Icon name="star" className="h-4 w-4" />
                Star on GitHub
              </a>
              <a
                href={`mailto:${site.contactEmail}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-cloud hover:border-white/30"
              >
                Talk to us
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
