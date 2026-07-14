export type IconName =
  | "star"
  | "server"
  | "lock"
  | "alert"
  | "coins"
  | "chart"
  | "shield"
  | "rocket"
  | "robot"
  | "globe"
  | "briefcase"
  | "check"
  | "arrow"
  | "spark"
  | "code"
  | "heart"
  | "users"
  | "copy";

type IconProps = {
  name: IconName;
  className?: string;
};

const PATHS: Record<IconName, React.ReactNode> = {
  star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3z" />,
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="2" />
      <rect x="4" y="13" width="16" height="7" rx="2" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l9 16H3l9-16z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="6" ry="3" />
      <path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" />
      <path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.4-1.9-2.6-4.5-2.9" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16l3-4 3 2 4-6" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
  rocket: (
    <>
      <path d="M12 3c3 1 5 4 5 8l-3 3H10L7 11c0-4 2-7 5-8z" />
      <path d="M10 14l-3 3M14 14l3 3M12 11h.01" />
    </>
  ),
  robot: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="2" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9 8V6M15 8V6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  spark: <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />,
  heart: (
    <path d="M12 20s-7-4.4-9.3-8.5C1.4 9 2.4 6 5.2 6c1.8 0 3 1 3.8 2.2C9.8 7 11 6 12.8 6c2.8 0 3.8 3 2.5 5.5C14 15.6 12 20 12 20z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 6a3 3 0 010 6M21 20c0-2.4-1.4-4.2-3.5-4.8" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h8" />
    </>
  ),
};

export function Icon({ name, className }: IconProps): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
