import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { GitHubIcon, DiscordIcon } from "@/components/ui/BrandIcons";
import { community } from "@/lib/content";

function ChannelIcon({ icon }: { icon: string }): React.ReactElement {
  if (icon === "discord") {
    return <DiscordIcon className="h-6 w-6" />;
  }
  if (icon === "code") {
    return <GitHubIcon className="h-6 w-6" />;
  }
  return <Icon name="heart" className="h-6 w-6" />;
}

export function Community(): React.ReactElement {
  return (
    <Section id="community">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <Reveal>
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand">
              <Icon name="users" className="h-3.5 w-3.5" />
              Community
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
              {community.heading}
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-cloud/60">
              {community.description}
            </p>
            <a
              href={community.membership.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand hover:text-brand/80"
            >
              {community.membership.label}
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {community.channels.map((channel, index) => (
            <Reveal key={channel.title} delay={index * 0.08}>
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-navy/40 p-6 hover:border-brand/40"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand group-hover:border-brand/40">
                  <ChannelIcon icon={channel.icon} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-semibold text-cloud">
                    {channel.title}
                  </span>
                  <span className="text-sm leading-relaxed text-cloud/55">
                    {channel.description}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    {channel.cta}
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
