"use client";

import { motion } from "framer-motion";
import { terminalDemo } from "@/lib/content";

export function Terminal(): React.ReactElement {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05070B] shadow-glow">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-cloud/40">
          hexawyn — zsh
        </span>
      </div>

      <motion.div
        className="flex flex-col gap-1.5 p-5 font-mono text-sm leading-relaxed"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.4 }}
      >
        {terminalDemo.map((line, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {line.kind === "prompt" ? (
              <p className="text-cloud">
                <span className="mr-2 text-brand">$</span>
                <span className="text-cloud/90">{line.text}</span>
              </p>
            ) : null}
            {line.kind === "output" ? (
              <p className="pl-4 text-emerald-300/90">{line.text}</p>
            ) : null}
            {line.kind === "meta" ? (
              <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs text-brand">
                {line.text}
              </p>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
