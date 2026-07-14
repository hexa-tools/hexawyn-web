type LogoProps = {
  showWordmark?: boolean;
  className?: string;
  iconSize?: number;
  textClassName?: string;
};

export function Logo({
  showWordmark = true,
  className,
  iconSize = 34,
  textClassName = "text-xl",
}: LogoProps): React.ReactElement {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={iconSize} />
      {showWordmark ? (
        <span className={`font-bold tracking-tight ${textClassName}`}>
          <span className="text-cloud">hexa</span>
          <span className="text-brand">wyn</span>
        </span>
      ) : null}
    </span>
  );
}

function LogoMark({ size }: { size: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="hexawyn logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="28,5 46,16 46,38 28,49 10,38 10,16"
        fill="#0A1628"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <polygon
        points="28,51 46,62 46,84 28,95 10,84 10,62"
        fill="#0A1628"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <polygon
        points="72,5 90,16 90,38 72,49 54,38 54,16"
        fill="#0A1628"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <polygon
        points="72,51 90,62 90,84 72,95 54,84 54,62"
        fill="#0A1628"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      <rect
        x="38"
        y="42"
        width="24"
        height="16"
        rx="2"
        fill="#0A1628"
        stroke="#3B82F6"
        strokeWidth="1.8"
      />
      <circle
        cx="50"
        cy="50"
        r="6"
        fill="#1E3A8A"
        stroke="#3B82F6"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="50" r="3.2" fill="#3B82F6" />
      <circle cx="50" cy="50" r="1.1" fill="#080C12" />
      <g stroke="#3B82F6" strokeWidth="1.6" strokeLinecap="round">
        <line x1="50" y1="41.5" x2="50" y2="35" />
        <line x1="55.6" y1="44.7" x2="61" y2="39.1" />
        <line x1="55.8" y1="55.3" x2="61.2" y2="60.9" />
        <line x1="50" y1="58.5" x2="50" y2="65" />
        <line x1="44.2" y1="55.3" x2="38.8" y2="60.9" />
        <line x1="44.4" y1="44.7" x2="39" y2="39.1" />
      </g>
      <g fill="#ffffff">
        <circle cx="50" cy="33.5" r="2.5" />
        <circle cx="62.2" cy="38.4" r="2.5" />
        <circle cx="62.5" cy="61.6" r="2.5" />
        <circle cx="50" cy="66.5" r="2.5" />
        <circle cx="37.5" cy="61.6" r="2.5" />
        <circle cx="37.8" cy="38.4" r="2.5" />
      </g>
    </svg>
  );
}
