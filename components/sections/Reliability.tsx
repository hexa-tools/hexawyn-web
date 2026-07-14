"use client";

import { motion } from "framer-motion";
import { reliability } from "@/lib/content";

export function Reliability(): React.ReactElement {
  return (
    <section
      id="reliability"
      className="mx-auto w-full max-w-content px-6 py-20 sm:py-28"
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          Why it&apos;s reliable
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
          {reliability.heading}
        </h2>
        <p className="text-lg leading-relaxed text-cloud/60">
          {reliability.subheading}
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        {reliability.layers.map((layer, index) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="grid items-center gap-4 rounded-2xl border border-white/10 bg-navy/40 p-6 md:grid-cols-[1fr_2fr_auto]"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  layer.deterministic ? "bg-brand" : "bg-amber-400"
                }`}
              />
              <span className="font-semibold text-cloud">{layer.name}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${layer.share * 2}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.15 + index * 0.08 }}
                  className={`h-full rounded-full ${
                    layer.deterministic ? "bg-brand" : "bg-amber-400"
                  }`}
                />
              </div>
              <p className="text-sm text-cloud/50">{layer.role}</p>
            </div>

            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-cloud">
                {layer.share}%
              </span>
              <p className="text-xs text-cloud/40">
                {layer.deterministic ? "deterministic" : "LLM"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cloud/50">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-brand" /> Deterministic
          engine — 80%
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> LLM polish
          — 20%
        </span>
      </div>
    </section>
  );
}
