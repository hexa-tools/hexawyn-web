export type NavLink = {
  label: string;
  href: string;
};

export type Badge = {
  icon: string;
  label: string;
};

export type TerminalLine = {
  kind: "prompt" | "output" | "meta";
  text: string;
};

export type ReliabilityLayer = {
  name: string;
  share: number;
  role: string;
  why: string;
  deterministic: boolean;
};

export type UseCase = {
  icon: string;
  title: string;
  description: string;
};

export type Technology = {
  name: string;
  category: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  audience: string;
  credits: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured: boolean;
};

export type PlanColumn = {
  name: string;
  price: string;
  featured?: boolean;
};

export type MatrixValue = string | boolean;

export type MatrixRow = {
  label: string;
  values: MatrixValue[];
};

export type MatrixGroup = {
  title: string;
  rows: MatrixRow[];
};

export const site = {
  name: "hexawyn",
  domain: "hexawyn.io",
  tagline: "Less dashboards. More answers.",
  description:
    "hexawyn is the open-source, self-hostable Kubernetes assistant that diagnoses incidents in seconds. Stop reading logs — ask why. 80% deterministic engine, 20% LLM polish.",
  contactEmail: "contact@hexawyn.io",
  githubUrl: "https://github.com/hexa-tools/hexawyn",
  discordUrl: "https://discord.gg/HH3WsrnNw",
  installCommand: "pip install hexawyn",
} as const;

export const navLinks: NavLink[] = [
  { label: "Why hexawyn", href: "#reliability" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Technologies", href: "#technologies" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "/pricing" },
];

export const heroBadges: Badge[] = [
  { icon: "star", label: "Open source" },
  { icon: "server", label: "Self-hostable" },
  { icon: "lock", label: "Your kubeconfig never leaves your machine" },
];

export const hero = {
  eyebrow: "Open-source Kubernetes AI assistant",
  title: "Stop reading logs. Ask why.",
  subtitle:
    "hexawyn learns from your incidents and tells you the root cause in seconds — reliable answers backed by a deterministic engine, not just a chatty model.",
  primaryCta: { label: "Get started", href: "#pricing" },
  secondaryCta: { label: "Star on GitHub", href: site.githubUrl },
} as const;

export const problem = {
  heading: "3 a.m. The pager goes off.",
  lines: [
    "200 lines of kubectl describe.",
    "5,000 lines of logs across three pods.",
    "45 minutes later: it was an OOMKill.",
  ],
  punchline:
    "Every incident is an archaeology dig. hexawyn hands you the answer, not another dashboard to read.",
} as const;

export const terminalDemo: TerminalLine[] = [
  { kind: "prompt", text: 'hexawyn "why is payments-api crashing?"' },
  {
    kind: "output",
    text: "OOMKilled. Your JVM has no -Xmx flag, so it takes 80% of",
  },
  {
    kind: "output",
    text: "the container (410Mi) but your limit is 512Mi.",
  },
  { kind: "output", text: "Fix: add -Xmx384m to your deployment." },
  { kind: "meta", text: "resolved in 12 seconds" },
];

export const reliability = {
  heading: "Why the answers are trustworthy",
  subheading:
    "hexawyn is 80% deterministic code, 20% LLM. The LLM is the polish, not the engine.",
  layers: [
    {
      name: "Infrastructure",
      share: 40,
      role: "Collect & store (K8s, OpenTelemetry, Prometheus)",
      why: "Deterministic, testable, scalable",
      deterministic: true,
    },
    {
      name: "Semantic layer",
      share: 30,
      role: "Rules, thresholds & calculations turned into facts",
      why: "Deterministic, no LLM",
      deterministic: true,
    },
    {
      name: "Memory",
      share: 10,
      role: "Similar-incident search (DuckDB, embeddings)",
      why: "Semi-deterministic",
      deterministic: true,
    },
    {
      name: "LLM",
      share: 20,
      role: "Final reformulation (LangGraph)",
      why: "The single non-deterministic part — and it is fenced in",
      deterministic: false,
    },
  ] as ReliabilityLayer[],
};

export const verification = {
  heading: "The LLM talks. The agent verifies.",
  description:
    "Your clusters are too critical for guesswork. Every answer is checked by a dedicated validation agent before anything happens. Dangerous commands are blocked. Inconsistencies are flagged. Edge cases are handled, not forgotten.",
  points: [
    "Two layers of intelligence, one mission: zero hallucination.",
    "A four-eyes principle for your Kubernetes assistant.",
    "Reasoning is verified before any action is proposed.",
  ],
};

export const privacy = {
  heading: "Local-first by design",
  description:
    "Your kubeconfig and raw logs never leave your machine. Conversations, incidents, metrics and history live in a local DuckDB file, on your servers.",
  note:
    "Full transparency: your question and its context transit through the control-plane. Your credentials and raw logs do not.",
  points: [
    "kubeconfig never leaves your machine",
    "Raw logs stay inside your cluster",
    "No central database, no third-party cloud for your data",
  ],
};

export const useCases: UseCase[] = [
  {
    icon: "alert",
    title: "Debug incidents",
    description:
      "Ask why a workload is failing and get the root cause with a concrete fix.",
  },
  {
    icon: "coins",
    title: "Reduce cloud costs",
    description:
      "Surface over-provisioned resources and see exactly what to right-size.",
  },
  {
    icon: "chart",
    title: "Improve reliability",
    description:
      "Turn observability into actionability across every cluster you run.",
  },
  {
    icon: "shield",
    title: "Secure your platform",
    description:
      "Spot risky configurations and dangerous commands before they ship.",
  },
  {
    icon: "rocket",
    title: "Accelerate GitOps",
    description:
      "Understand drift and change impact without spelunking through YAML.",
  },
  {
    icon: "robot",
    title: "Automate reporting",
    description:
      "Weekly reliability digests sent to the people who need them.",
  },
  {
    icon: "globe",
    title: "Manage multiple clusters",
    description:
      "One assistant across AWS, GCP, Azure and on-prem — no lock-in.",
  },
  {
    icon: "briefcase",
    title: "Speak the business language",
    description:
      "Translate infrastructure into availability, cost and risk for leadership.",
  },
];

export const technologies: Technology[] = [
  { name: "Kubernetes", category: "Platforms" },
  { name: "Amazon EKS", category: "Platforms" },
  { name: "Azure AKS", category: "Platforms" },
  { name: "Google GKE", category: "Platforms" },
  { name: "OpenShift", category: "Platforms" },
  { name: "OpenTelemetry", category: "Observability" },
  { name: "Prometheus", category: "Observability" },
  { name: "Datadog", category: "Observability" },
  { name: "AWS CloudWatch", category: "Observability" },
  { name: "AWS X-Ray", category: "Observability" },
  { name: "Azure Monitor", category: "Observability" },
  { name: "Azure Log Analytics", category: "Observability" },
  { name: "Google Cloud Ops", category: "Observability" },
  { name: "GCP Managed Prometheus", category: "Observability" },
  { name: "AWS Cost Explorer", category: "FinOps" },
  { name: "Azure Cost Management", category: "FinOps" },
  { name: "GCP Billing", category: "FinOps" },
  { name: "Argo CD", category: "GitOps & delivery" },
  { name: "Flux", category: "GitOps & delivery" },
  { name: "Argo Rollouts", category: "GitOps & delivery" },
  { name: "Helm", category: "GitOps & delivery" },
  { name: "Kustomize", category: "GitOps & delivery" },
  { name: "Tekton", category: "GitOps & delivery" },
  { name: "KEDA", category: "GitOps & delivery" },
  { name: "Istio", category: "Security & networking" },
  { name: "Calico", category: "Security & networking" },
  { name: "Trivy", category: "Security & networking" },
  { name: "Kyverno", category: "Security & networking" },
  { name: "OPA Gatekeeper", category: "Security & networking" },
  { name: "cert-manager", category: "Security & networking" },
  { name: "KubeArchive", category: "Data & interfaces" },
  { name: "DuckDB", category: "Data & interfaces" },
  { name: "Slack", category: "Data & interfaces" },
  { name: "MCP server", category: "Data & interfaces" },
];

export const trust = {
  heading: "A production-grade assistant, not a POC",
  description:
    "Built on hexagonal architecture and a decade of software-engineering discipline. Not vibe coding — every line is tested.",
  stats: [
    { value: "6,500+", label: "automated tests" },
    { value: "< 2 min", label: "to run the full test suite" },
    { value: "97%", label: "code coverage" },
    { value: "0", label: "vendor lock-in" },
  ] as Stat[],
};

export const roadmap = {
  heading: "On the roadmap",
  description:
    "Diagnosis works today. Prediction gets sharper as hexawyn learns from your incidents.",
  items: [
    "Predict saturation and failures before they reach your users",
    "Budget alerts when autoscaling is about to spike your cloud bill",
    "Executive reports that answer leadership questions automatically",
  ],
};

export const community = {
  heading: "Community Membership",
  description:
    "Join our growing community of users and contributors. We welcome everyone interested in Kubernetes and AI.",
  membership: {
    label: "Learn about membership",
    href: `${site.githubUrl}/blob/main/CONTRIBUTING.md`,
  },
  channels: [
    {
      icon: "discord" as const,
      title: "Join the Discord",
      description:
        "Ask questions, share incidents, and shape the roadmap with the team and other operators.",
      cta: "Open Discord",
      href: site.discordUrl,
    },
    {
      icon: "code" as const,
      title: "Contribute on GitHub",
      description:
        "hexawyn is open source. Read the contributing guide, pick an issue, and open your first pull request.",
      cta: "Read the contributing guide",
      href: `${site.githubUrl}/blob/main/CONTRIBUTING.md`,
    },
    {
      icon: "heart" as const,
      title: "Good first issues",
      description:
        "New to the project? Start with a curated issue labelled good first issue and get a friendly review.",
      cta: "Find a good first issue",
      href: `${site.githubUrl}/labels/good%20first%20issue`,
    },
  ],
};

export const pricingNote =
  "1 credit = 1 investigation, whether you ask from the CLI or from Slack. Health predictions and cost estimates don't spend credits.";

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    audience: "Solo devs & open source",
    credits: "50 credits / month",
    description: "Vanilla Kubernetes, self-service, local-first.",
    features: [
      "1 cluster · 1 user",
      "Vanilla Kubernetes",
      "Cost estimate + basic rightsizing",
      "7-day health history",
      "CLI + MCP server",
      "GitHub issues support",
    ],
    cta: "Start free",
    href: site.githubUrl,
    featured: false,
  },
  {
    name: "Dev",
    price: "$19",
    period: "per month",
    audience: "Freelancers on managed clouds",
    credits: "200 credits / month",
    description: "For individual engineers who live in the terminal.",
    features: [
      "Everything in Free",
      "Managed clouds: EKS · AKS · GKE",
      "OpenShift · Datadog",
      "Real cost via billing API",
      "30-day history · basic reports",
      "Email support",
    ],
    cta: "Choose Dev",
    href: "#contact",
    featured: false,
  },
  {
    name: "Startup",
    price: "$99",
    period: "per month",
    audience: "Small teams (5–20)",
    credits: "500 credits / month",
    description: "For small teams shipping fast.",
    features: [
      "Everything in Dev",
      "3 clusters · 5 users",
      "24/7 proactive monitoring",
      "Cost anomaly alerts (>30%)",
      "Weekly CTO/CFO reports",
      "Priority support",
    ],
    cta: "Choose Startup",
    href: "#contact",
    featured: true,
  },
  {
    name: "Scale-up",
    price: "$199",
    period: "per month",
    audience: "Platform teams",
    credits: "Unlimited credits",
    description: "For platform teams operating at scale.",
    features: [
      "Everything in Startup",
      "Unlimited clusters · 20 users",
      "Multi-cluster real cost",
      "SSO + audit log",
      "Custom reports",
      "Dedicated Slack support",
    ],
    cta: "Choose Scale-up",
    href: "#contact",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "let's talk",
    audience: "Large organizations",
    credits: "Unlimited credits",
    description: "For regulated and large organizations.",
    features: [
      "Everything in Scale-up",
      "Auto-remediation",
      "Cloud budget alerts (AWS/Azure/GCP)",
      "On-premise / air-gapped",
      "White-label reports",
      "SLA + dedicated CSM",
    ],
    cta: "Contact sales",
    href: "#contact",
    featured: false,
  },
];

export const pricingColumns: PlanColumn[] = [
  { name: "Free", price: "$0" },
  { name: "Dev", price: "$19" },
  { name: "Startup", price: "$99", featured: true },
  { name: "Scale-up", price: "$199" },
  { name: "Enterprise", price: "Custom" },
];

export const pricingMatrix: MatrixGroup[] = [
  {
    title: "Usage",
    rows: [
      {
        label: "Investigations (credits) / month",
        values: ["50", "200", "500", "Unlimited", "Unlimited"],
      },
      { label: "Clusters", values: ["1", "1", "3", "Unlimited", "Unlimited"] },
      { label: "Users", values: ["1", "1", "5", "20", "Unlimited"] },
      {
        label: "Health history",
        values: ["7 days", "30 days", "90 days", "Unlimited", "Unlimited"],
      },
    ],
  },
  {
    title: "Diagnosis & cost",
    rows: [
      {
        label: "Cost estimate (per namespace / pod)",
        values: [true, true, true, true, true],
      },
      {
        label: "Rightsizing",
        values: ["Basic", "Advanced", "Advanced", "Advanced", "Advanced"],
      },
      {
        label: "Real cost (billing API)",
        values: [
          "2 calls",
          "AWS · Azure · GCP",
          "AWS · Azure · GCP",
          "Multi-cluster",
          "Multi-cluster",
        ],
      },
      {
        label: "End-of-month cost prediction",
        values: ["7 days", "30 days", "90 days", "Unlimited", "Unlimited"],
      },
      {
        label: "Cost anomaly alerts",
        values: [
          false,
          false,
          "Spike > 30%",
          "Spike + waste",
          "Spike + waste + budgets",
        ],
      },
    ],
  },
  {
    title: "Monitoring & reporting",
    rows: [
      {
        label: "Proactive monitoring 24/7",
        values: [
          false,
          false,
          "Alerts + action plan",
          "Alerts + action plan",
          "+ auto-remediation",
        ],
      },
      {
        label: "Slack alerts",
        values: [
          "5/mo · 1 channel",
          "50/mo · 1 channel",
          "Unlimited · 3 channels",
          "Unlimited · multi",
          "Unlimited · multi",
        ],
      },
      {
        label: "CTO / CFO reports",
        values: [
          false,
          "Basic",
          "Weekly auto",
          "Weekly + custom",
          "White-label",
        ],
      },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { label: "Vanilla Kubernetes", values: [true, true, true, true, true] },
      { label: "AWS EKS", values: [false, true, true, true, true] },
      { label: "Azure AKS", values: [false, true, true, true, true] },
      { label: "GCP GKE", values: [false, true, true, true, true] },
      { label: "OpenShift", values: [false, true, true, true, true] },
      { label: "Datadog", values: [false, true, true, true, true] },
      { label: "CLI (Textual)", values: [true, true, true, true, true] },
      { label: "MCP server", values: [true, true, true, true, true] },
      {
        label: "DuckDB local storage",
        values: [
          "Unlimited",
          "Unlimited",
          "Unlimited",
          "Unlimited",
          "Unlimited",
        ],
      },
    ],
  },
  {
    title: "Security & support",
    rows: [
      {
        label: "SSO (Google / GitHub)",
        values: [false, false, false, true, true],
      },
      { label: "Audit log", values: [false, false, false, true, true] },
      {
        label: "On-premise / air-gapped",
        values: [false, false, false, false, true],
      },
      {
        label: "Support",
        values: [
          "GitHub issues",
          "Email",
          "Priority email",
          "Dedicated Slack",
          "SLA + CSM",
        ],
      },
    ],
  },
];

export const pricingFaq: { question: string; answer: string }[] = [
  {
    question: "What exactly is a credit?",
    answer:
      "One credit equals one investigation — a root-cause question asked from the CLI or from Slack. Health predictions and cost estimates run automatically and never spend credits.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "Your monitoring, predictions and cost estimates keep running. New on-demand investigations pause until your monthly credits reset or you upgrade your plan.",
  },
  {
    question: "Is hexawyn really open source?",
    answer:
      "Yes. The core, the vanilla Kubernetes adapter, the CLI and the MCP server are open source and self-hostable. Managed-cloud adapters, multi-cluster logic and advanced reporting are part of the paid plans.",
  },
  {
    question: "Where does my data live?",
    answer:
      "Locally, by design. Your kubeconfig and raw logs never leave your machine; conversations and history are stored in a local DuckDB file on your own servers.",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Why hexawyn", href: "#reliability" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: site.githubUrl },
      { label: "Discord community", href: site.discordUrl },
      { label: "Technologies", href: "#technologies" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contact", href: `mailto:${site.contactEmail}` },
    ],
  },
];
