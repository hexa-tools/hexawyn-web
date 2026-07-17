"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { CopyCommand } from "@/components/ui/CopyCommand";
import { Terminal } from "@/components/sections/Terminal";
import { hero, heroBadges, site } from "@/lib/content";

export function Hero(): React.ReactElement {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-[-10rem] h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-content gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:items-center lg:pt-28">
        <div className="flex flex-col items-start gap-7">
          <div className="flex flex-wrap gap-2">
            {heroBadges.map((badge, index) => (
              <motion.span
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-cloud/70"
              >
                <Icon name={badge.icon as IconName} className="h-3.5 w-3.5 text-brand" />
                {badge.label}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-brand"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-gradient sm:text-6xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-xl text-lg leading-relaxed text-cloud/60"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand/90"
            >
              {hero.primaryCta.label}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-cloud hover:border-white/30"
            >
              <GitHubIcon className="h-4 w-4" />
              {hero.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-sm"
          >
            <CopyCommand command={site.installCommand} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
