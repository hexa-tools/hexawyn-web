import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { technologies, type Technology } from "@/lib/content";

type TechGroup = {
  category: string;
  items: Technology[];
};

function groupByCategory(items: Technology[]): TechGroup[] {
  const order: string[] = [];
  const grouped = new Map<string, Technology[]>();

  for (const item of items) {
    const existing = grouped.get(item.category);
    if (existing) {
      existing.push(item);
    } else {
      grouped.set(item.category, [item]);
      order.push(item.category);
    }
  }

  return order.map((category) => ({
    category,
    items: grouped.get(category) ?? [],
  }));
}

export function Technologies(): React.ReactElement {
  const groups = groupByCategory(technologies);

  return (
    <Section id="technologies">
      <SectionHeading
        eyebrow="No lock-in"
        title="Works with what you already run"
        description="From vanilla Kubernetes to EKS, AKS, GKE and OpenShift — plus the observability, FinOps, GitOps and security tooling around them. If it speaks OpenTelemetry, hexawyn understands it."
      />

      <div className="mt-14 flex flex-col divide-y divide-white/5">
        {groups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.05}>
            <div className="flex flex-col gap-4 py-6 sm:flex-row sm:gap-10">
              <span className="w-48 shrink-0 pt-1 text-sm font-semibold uppercase tracking-[0.15em] text-brand">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-lg border border-white/10 bg-navy/40 px-3.5 py-2 text-sm text-cloud/80 hover:border-brand/40 hover:text-cloud"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
