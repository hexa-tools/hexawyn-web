"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

type CopyCommandProps = {
  command: string;
  className?: string;
};

export function CopyCommand({
  command,
  className,
}: CopyCommandProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm ${
        className ?? ""
      }`}
    >
      <span className="text-brand">$</span>
      <span className="text-cloud/80">{command}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Command copied" : "Copy install command"}
        className="ml-auto flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-cloud/60 hover:border-brand/40 hover:text-cloud"
      >
        <Icon
          name={copied ? "check" : "copy"}
          className={`h-4 w-4 ${copied ? "text-brand" : ""}`}
        />
      </button>
    </div>
  );
}
