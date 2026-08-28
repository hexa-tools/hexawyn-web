import { marqueeCaption, marqueeLogos, type MarqueeLogo } from "@/lib/content";

const BADGE_TEXT_COLORS = [
  "text-[#2563EB]",
  "text-[#0891B2]",
  "text-[#7C3AED]",
  "text-[#059669]",
  "text-[#D97706]",
  "text-[#E11D48]",
] as const;

function getInitials(name: string): string {
  const words = name.split(/[\s-]+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

function LogoItem({
  logo,
  index,
  hidden,
}: {
  logo: MarqueeLogo;
  index: number;
  hidden?: boolean;
}): React.ReactElement {
  return (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-3 text-cloud/60 transition-colors hover:text-cloud/95"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cloud/95 p-1.5 shadow-sm">
        {logo.logoFile ? (
          <img
            src={`/logo/marquee/${logo.logoFile}.svg`}
            alt=""
            className="h-full w-full object-contain"
          />
        ) : (
          <span
            className={`text-[11px] font-bold tracking-tight ${
              BADGE_TEXT_COLORS[index % BADGE_TEXT_COLORS.length]
            }`}
          >
            {getInitials(logo.name)}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap text-lg font-semibold tracking-tight">
        {logo.name}
      </span>
    </div>
  );
}

export function LogoMarquee(): React.ReactElement {
  return (
    <section
      aria-label="Technologies hexawyn integrates with"
      className="border-y border-white/5 py-10"
    >
      <p className="mx-auto mb-7 max-w-content px-6 text-center text-sm text-cloud/45">
        {marqueeCaption}
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused] sm:gap-16">
          {marqueeLogos.map((logo, index) => (
            <LogoItem key={logo.name} logo={logo} index={index} />
          ))}
          {marqueeLogos.map((logo, index) => (
            <LogoItem
              key={`${logo.name}-dup`}
              logo={logo}
              index={index}
              hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
