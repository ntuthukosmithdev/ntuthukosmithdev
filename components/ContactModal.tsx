"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const EMAIL = "ntuthukosmith10@gmail.com";
// Web3Forms — free, instant activation. Get your access key at
// https://web3forms.com (enter your email, they email it to you), then put
// it in `.env.local` as NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here.
const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const reset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setSent(false);
    setError(null);
    setSubmitting(false);
  };

  const openMailFallback = () => {
    const subject = encodeURIComponent(
      `New intro call request from ${name || "your site"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company && `Company: ${company}`,
        "",
        "Message:",
        message
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleClose = () => {
    onClose();
    // small delay so the user briefly sees the success state before reset
    setTimeout(reset, 400);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    // Missing access key — fall straight to mailto so the form is never broken
    if (!ACCESS_KEY) {
      setError(
        "Form service not configured. Opening your email app as a fallback…"
      );
      setTimeout(() => {
        openMailFallback();
        setSent(true);
        setSubmitting(false);
      }, 600);
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New intro call request from ${name || "your site"}`,
          from_name: name || "Portfolio contact form",
          name,
          email,
          company: company || "—",
          message,
          // Routes the reply-to back to the sender so you can hit Reply
          replyto: email
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch {
      // Network failure — fall back to opening the user's mail client
      setError(
        "Couldn't reach the form service. Opening your email app as a fallback…"
      );
      setTimeout(() => {
        openMailFallback();
        setSent(true);
      }, 600);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book an intro call"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-md cursor-pointer"
            aria-label="Close contact form"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto bg-graphite border border-paper/10 rounded-t-2xl md:rounded-2xl shadow-2xl shadow-black/60"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-6 px-6 md:px-10 pt-8 md:pt-10 pb-6 bg-graphite/95 backdrop-blur-md border-b border-paper/5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-3">
                  (05) — Book an intro call
                </div>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tightest leading-[1.05] text-paper">
                  Tell me about <span className="italic text-ash">the project.</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                data-cursor="Close"
                className="shrink-0 h-10 w-10 rounded-full border border-paper/20 flex items-center justify-center text-paper/80 hover:text-paper hover:border-paper/60 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="px-6 md:px-10 py-8 space-y-6"
                >
                  <Field label="Your name" required>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Email" required>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Company">
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Optional"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Project details" required>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="A few sentences about what you're building, timeline, and how I can help."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {error && (
                    <div className="text-[12px] text-accent border border-accent/40 bg-accent/5 rounded-md px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                      Replies within 24h on weekdays
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      data-cursor={submitting ? "Sending" : "Send"}
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-paper text-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending…" : "Send message"}
                      {!submitting && (
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 md:px-10 py-16 text-center"
                >
                  <div className="mx-auto h-14 w-14 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center mb-6">
                    <Check className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl tracking-tightest text-paper">
                    Message sent.
                  </h3>
                  <p className="mt-4 max-w-md mx-auto text-paper/65">
                    Thanks — your note landed in my inbox. I'll get back to you
                    within 24 hours on weekdays.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-paper/70 hover:text-paper"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full bg-transparent border-b border-paper/15 focus:border-paper/60 outline-none py-3 text-paper text-base placeholder:text-paper/30 transition-colors";

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash flex items-center gap-2 mb-1">
        {label}
        {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
