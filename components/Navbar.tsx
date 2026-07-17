"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { GitHubIcon, DiscordIcon } from "@/components/ui/BrandIcons";
import { navLinks, site } from "@/lib/content";

export function Navbar(): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-content items-center justify-between px-6">
        <Link href="/" aria-label="hexawyn home">
          <Logo iconSize={44} textClassName="text-2xl" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cloud/70 hover:text-cloud"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="hexawyn on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-cloud/70 hover:border-white/25 hover:text-cloud"
          >
            <GitHubIcon />
          </a>
          <a
            href={site.discordUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Join the hexawyn Discord"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-cloud/70 hover:border-white/25 hover:text-cloud"
          >
            <DiscordIcon />
          </a>
          <Link
            href="/pricing"
            className="ml-1 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-cloud md:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-cloud/80 hover:bg-white/5 hover:text-cloud"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-cloud/80"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  href={site.discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-cloud/80"
                >
                  <DiscordIcon />
                  Discord
                </a>
              </div>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }): React.ReactElement {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

