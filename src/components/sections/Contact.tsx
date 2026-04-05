"use client";

import React, { useState } from "react";

type Status = "project" | "recruiter" | "";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    role: "",
    email: "",
    status: "" as Status,
    moreInfo: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const statusLabel =
      form.status === "project"
        ? "I have a project"
        : form.status === "recruiter"
        ? "I am a recruiter"
        : "Not specified";

    const subject = encodeURIComponent(
      `[${statusLabel}] — ${form.fullName}`
    );
    const body = encodeURIComponent(
      [
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        `  CONTACT FROM PORTFOLIO`,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `  Full Name : ${form.fullName}`,
        `  Role      : ${form.role}`,
        `  Email     : ${form.email}`,
        `  Status    : ${statusLabel}`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        `  MESSAGE`,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        form.moreInfo,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━`,
      ].join("\n")
    );
    window.open(
      `mailto:simarjit1303@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative z-20 py-16 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #121212 0%, #0d1117 50%, #121212 100%)",
      }}
    >
      {/* Decorative background number */}
      <div className="absolute top-8 right-4 md:right-8 text-[120px] md:text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        06
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-5 mb-12 md:mb-16 gap-2">
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">
            ■ Get In Touch
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">
            Open To Opportunities
          </span>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-16 items-start">

          {/* ── LEFT: photo card + social ── */}
          <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-6 lg:gap-8">

            {/* Photo card */}
            <div className="flex-shrink-0 flex flex-col items-center">
              {/* Avatar / photo placeholder */}
              <div
                className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-full lg:h-auto lg:aspect-square rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,217,255,0.12) 0%, rgba(183,148,246,0.12) 100%)",
                  border: "1px solid rgba(0,217,255,0.2)",
                  boxShadow: "0 0 40px rgba(0,217,255,0.08)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Resume_Photo.png"
                  alt="Simarjit Singh"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top"
                />

                {/* bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, #00D9FFcc, #B794F6cc)",
                  }}
                />
              </div>

              {/* Name + title */}
              <div className="mt-3 text-center lg:text-center">
                <p className="text-white font-black text-base lg:text-lg tracking-tight">
                  Simarjit Singh
                </p>
                <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-white/65 mt-0.5">
                  Data Scientist · Berlin
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3 w-full">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/Simarjit1303",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/simar-jit-singh",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  href: "mailto:simarjit1303@gmail.com",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/65 hover:text-white/80 transition-colors duration-300 group"
                >
                  <span className="text-white/42 group-hover:text-[#00D9FF] transition-colors duration-300">
                    {icon}
                  </span>
                  <span className="font-mono text-xs tracking-[0.15em] uppercase">{label}</span>
                  <span className="text-white/42 text-xs ml-auto">↗</span>
                </a>
              ))}

              {/* Availability badge */}
              <div
                className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(0,255,136,0.04)",
                  border: "1px solid rgba(0,255,136,0.15)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#00FF88]/70">
                  Available · Berlin
                </span>
              </div>

            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8 space-y-5"
          >
            {/* Form heading */}
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                <span
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #00D9FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Get In Touch
                </span>
              </h3>
              <p className="text-white/60 text-xs font-mono mt-1">
                Fill in the details below and I&apos;ll get back to you.
              </p>
            </div>

            {/* Name + Role row (side by side on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="block text-[10px] font-mono tracking-[0.18em] uppercase text-white/55"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="John Smith"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/42 focus:outline-none focus:border-[#00D9FF]/40 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="role"
                  className="block text-[10px] font-mono tracking-[0.18em] uppercase text-white/55"
                >
                  Your Role
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. ML Engineer at Acme"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/42 focus:outline-none focus:border-[#00D9FF]/40 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-[10px] font-mono tracking-[0.18em] uppercase text-white/55"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/42 focus:outline-none focus:border-[#00D9FF]/40 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>

            {/* Status radio */}
            <div className="space-y-2">
              <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/55">
                I Am… *
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(
                  [
                    { value: "project", label: "I Have a Project", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
                    { value: "recruiter", label: "I Am a Recruiter", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                  ] as { value: Status; label: string; icon: React.ReactNode }[]
                ).map(({ value, label, icon }) => {
                  const active = form.status === value;
                  return (
                    <label
                      key={value}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                      style={{
                        background: active
                          ? "rgba(0,217,255,0.06)"
                          : "rgba(255,255,255,0.02)",
                        border: active
                          ? "1px solid rgba(0,217,255,0.35)"
                          : "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={value}
                        required
                        checked={active}
                        onChange={() => setForm({ ...form, status: value })}
                        className="sr-only"
                      />
                      {/* custom radio dot */}
                      <span
                        className="w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          borderColor: active
                            ? "#00D9FF"
                            : "rgba(255,255,255,0.2)",
                          background: active
                            ? "rgba(0,217,255,0.2)"
                            : "transparent",
                        }}
                      >
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                        )}
                      </span>
                      <span className="text-xs font-mono tracking-wide text-white/60">
                        {icon} {label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* More info textarea */}
            <div className="space-y-1.5">
              <label
                htmlFor="moreInfo"
                className="block text-[10px] font-mono tracking-[0.18em] uppercase text-white/55"
              >
                More Info *
              </label>
              <textarea
                id="moreInfo"
                required
                rows={4}
                placeholder="Tell me about your project, role, or what you have in mind…"
                value={form.moreInfo}
                onChange={(e) => setForm({ ...form, moreInfo: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/42 focus:outline-none focus:border-[#00D9FF]/40 focus:bg-white/[0.05] transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-mono text-[12px] tracking-[0.2em] uppercase font-bold transition-all duration-300 cursor-pointer"
              style={{
                background: sent
                  ? "linear-gradient(90deg, #00FF88, #00D9FF)"
                  : "linear-gradient(90deg, #00D9FF22, #00D9FF11)",
                border: "1px solid #00D9FF44",
                color: sent ? "#000" : "#00D9FF",
              }}
            >
              {sent ? "✓ Opening Email Client…" : "Send Message ↗"}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
