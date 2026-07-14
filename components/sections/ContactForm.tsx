"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { GitHubIcon, DiscordIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm(): React.ReactElement {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => {
      body.append(key, typeof value === "string" ? value : "");
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-content px-6 py-20 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Contact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
            Talk to the team
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-cloud/60">
            A question about a plan, a self-hosted deployment or an incident you
            want to throw at hexawyn? Drop us a line and we&apos;ll get back to
            you.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={`mailto:${site.contactEmail}`}
              className="inline-flex w-fit items-center gap-2 text-cloud/80 hover:text-cloud"
            >
              <Icon name="arrow" className="h-4 w-4 text-brand" />
              {site.contactEmail}
            </a>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 text-cloud/80 hover:text-cloud"
            >
              <GitHubIcon className="h-4 w-4 text-brand" />
              Open an issue on GitHub
            </a>
            <a
              href={site.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 text-cloud/80 hover:text-cloud"
            >
              <DiscordIcon className="h-4 w-4 text-brand" />
              Chat with us on Discord
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-navy/40 p-6 sm:p-8">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-4 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
                <Icon name="check" className="h-7 w-7" />
              </span>
              <h3 className="text-xl font-semibold text-cloud">Message sent</h3>
              <p className="max-w-xs text-sm text-cloud/60">
                Thanks for reaching out. We&apos;ll reply from{" "}
                {site.contactEmail} shortly.
              </p>
            </motion.div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Do not fill this out <input name="bot-field" />
                </label>
              </p>

              <Field
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder="Ada Lovelace"
                autoComplete="name"
              />
              <Field
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="ada@company.com"
                autoComplete="email"
              />

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-cloud/80">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What's on your mind?"
                  className="resize-none rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-cloud placeholder:text-cloud/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </label>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                {status === "submitting" ? null : (
                  <Icon name="arrow" className="h-4 w-4" />
                )}
              </button>

              {status === "error" ? (
                <p className="text-sm text-red-400">
                  Something went wrong. Please email {site.contactEmail}{" "}
                  directly.
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email";
  placeholder: string;
  autoComplete: string;
};

function Field({
  id,
  name,
  label,
  type,
  placeholder,
  autoComplete,
}: FieldProps): React.ReactElement {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-sm font-medium text-cloud/80">{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-cloud placeholder:text-cloud/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </label>
  );
}
