"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SectionWrapper, SectionHeader, GlassCard } from "@/components/ui/primitives";

type Status = "project" | "recruiter" | "other" | "";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    role: "",
    email: "",
    status: "" as Status,
    moreInfo: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPicker, setShowPicker] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const sentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modal: focus on open + Escape to close (merged — same dep, coupled concerns)
  useEffect(() => {
    if (!showPicker) return;
    modalRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowPicker(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showPicker]);

  // Clear sent timer on unmount to avoid state update after unmount
  useEffect(() => () => { if (sentTimer.current) clearTimeout(sentTimer.current); }, []);

  const clearError = (field: string) => setErrors((p) => ({ ...p, [field]: "" }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.status) e.status = "Please select one";
    if (!form.moreInfo.trim()) e.moreInfo = "Message is required";
    return e;
  };

  const buildEmailParts = () => {
    // H-01: strip HTML chars before encoding — defense-in-depth against body injection
    const san = (s: string) => s.replace(/[<>"']/g, "");
    const subjectLabel =
      form.status === "project" ? "Project Collaboration"
      : form.status === "recruiter" ? "Recruiter Inquiry"
      : "Just Connecting";
    const subject = san(`[${subjectLabel}] — ${form.fullName}`);
    const body = [
      `Name  : ${san(form.fullName)}`,
      form.role ? `Role  : ${san(form.role)}` : null,
      `Email : ${san(form.email)}`,
      ``,
      san(form.moreInfo),
    ].filter((l) => l !== null).join("\n");
    return { subject, body };
  };

  const openEmail = (app: "gmail" | "outlook" | "default") => {
    const { subject, body } = buildEmailParts();
    const to = "simarjit1303@gmail.com";
    const su = encodeURIComponent(subject);
    const bd = encodeURIComponent(body);
    if (app === "gmail") {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`, "_blank", "noopener,noreferrer");
    } else if (app === "outlook") {
      window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bd}`, "_blank", "noopener,noreferrer");
    } else {
      // mailto: — opens native mail app (iOS Mail, Android, Mac Mail, Thunderbird, Outlook Desktop)
      window.location.href = `mailto:${to}?subject=${su}&body=${bd}`;
    }
    setShowPicker(false);
    setSent(true);
    if (sentTimer.current) clearTimeout(sentTimer.current);
    sentTimer.current = setTimeout(() => setSent(false), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setErrors({});
    setShowPicker(true);
  };

  return (
    <SectionWrapper
      id="contact"
      decorativeNumber="06"
      className="px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Header row */}
      <SectionHeader label="Get In Touch" right="Open To Opportunities" />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-16 items-start">

        {/* ── LEFT: photo card + social ── */}
        <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-6 lg:gap-8">

          {/* Photo card */}
          <div className="flex-shrink-0 flex flex-col items-center">
            {/* Avatar / photo placeholder */}
            <div
              suppressHydrationWarning
              className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-full lg:h-auto lg:aspect-square rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,217,255,0.10) 0%, rgba(0,217,255,0.03) 100%)",
                border: "1px solid rgba(0,217,255,0.2)",
                boxShadow: "0 0 40px rgba(0,217,255,0.08)",
              }}
            >
              <Image
                src="/Resume_Photo.png"
                alt="Simarjit Singh"
                width={400}
                height={400}
                className="w-full h-full object-cover object-top"
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
              />

              {/* bottom accent line */}
              <div
                suppressHydrationWarning
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, #00D9FFcc, transparent)",
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
                href: "https://www.linkedin.com/in/simar-jit-singh/",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: "Xing",
                href: "https://www.xing.com/profile/Simarjit_Singh04908/web_profiles",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.643-.962-.643H3.648z" />
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
            ].map(({ label, href, icon }) =>
              label === "Email" ? (
                <button
                  key={label}
                  type="button"
                  onClick={() => setShowPicker(true)}
                  className="inline-flex items-center gap-3 text-white/65 hover:text-white/80 transition-colors duration-300 group w-full text-left cursor-pointer"
                >
                  <span className="text-white/42 group-hover:text-[#00D9FF] transition-colors duration-300">
                    {icon}
                  </span>
                  <span className="font-mono text-xs tracking-[0.15em] uppercase">{label}</span>
                  <span className="text-white/42 text-xs ml-auto">↗</span>
                </button>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/65 hover:text-white/80 transition-colors duration-300 group"
                >
                  <span className="text-white/42 group-hover:text-[#00D9FF] transition-colors duration-300">
                    {icon}
                  </span>
                  <span className="font-mono text-xs tracking-[0.15em] uppercase">{label}</span>
                  <span className="text-white/42 text-xs ml-auto">↗</span>
                </a>
              )
            )}

            {/* Availability badge */}
            <div
              suppressHydrationWarning
              className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(0,217,255,0.04)",
                border: "1px solid rgba(0,217,255,0.15)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#00D9FF]/70">
                Available · Berlin
              </span>
            </div>

          </div>
        </div>

        {/* ── RIGHT: form wrapped in GlassCard ── */}
        <GlassCard className="p-0">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 space-y-5"
          >
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
                  placeholder="John Smith"
                  value={form.fullName}
                  onChange={(e) => { setForm({ ...form, fullName: e.target.value }); clearError("fullName"); }}
                  className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/42 focus:outline-none focus:bg-white/[0.05] transition-all duration-300 ${errors.fullName ? "border-red-500/60 focus:border-red-500/80" : "border-white/[0.08] focus:border-[#00D9FF]/40"}`}
                />
                {errors.fullName && <p role="alert" className="text-[10px] font-mono text-red-400/80 mt-1">{errors.fullName}</p>}
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
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); clearError("email"); }}
                className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/42 focus:outline-none focus:bg-white/[0.05] transition-all duration-300 ${errors.email ? "border-red-500/60 focus:border-red-500/80" : "border-white/[0.08] focus:border-[#00D9FF]/40"}`}
              />
              {errors.email && <p role="alert" className="text-[10px] font-mono text-red-400/80 mt-1">{errors.email}</p>}
            </div>

            {/* Status radio — L-01: fieldset+legend for screen reader group context */}
            <fieldset className="space-y-2 border-0 p-0 m-0">
              <legend className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/55 mb-2">
                I Am… *
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    { value: "project", label: "I Have a Project", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
                    { value: "recruiter", label: "I Am a Recruiter", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                    { value: "other", label: "Just Connecting", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  ] as { value: Status; label: string; icon: React.ReactNode }[]
                ).map(({ value, label, icon }) => {
                  const active = form.status === value;
                  return (
                    <label
                      suppressHydrationWarning
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
                        id={`status-${value}`}
                        name="status"
                        value={value}
                        checked={active}
                        aria-describedby={errors.status ? "status-error" : undefined}
                        onChange={() => { setForm({ ...form, status: value }); clearError("status"); }}
                        className="sr-only"
                      />
                      {/* custom radio dot */}
                      <span
                        suppressHydrationWarning
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
                      <span className="text-xs font-mono tracking-wide text-white/60 flex items-center gap-1.5">
                        <span aria-hidden="true">{icon}</span>
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.status && (
                <p id="status-error" role="alert" className="text-[10px] font-mono text-red-400/80 mt-1">
                  {errors.status}
                </p>
              )}
            </fieldset>

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
                rows={4}
                placeholder="Tell me about your project, role, or what you have in mind…"
                value={form.moreInfo}
                onChange={(e) => { setForm({ ...form, moreInfo: e.target.value }); clearError("moreInfo"); }}
                className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/42 focus:outline-none focus:bg-white/[0.05] transition-all duration-300 resize-none ${errors.moreInfo ? "border-red-500/60 focus:border-red-500/80" : "border-white/[0.08] focus:border-[#00D9FF]/40"}`}
              />
              {errors.moreInfo && <p role="alert" className="text-[10px] font-mono text-red-400/80 mt-1">{errors.moreInfo}</p>}
            </div>

            {/* Submit */}
            <button
              suppressHydrationWarning
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
              {sent ? "↗ Open Your Email App to Send" : "Send Message ↗"}
            </button>
          </form>
        </GlassCard>

      </div>

      {/* ── Email app picker modal ── */}
      {showPicker && (
        <div
          suppressHydrationWarning
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowPicker(false)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Choose your email app"
            tabIndex={-1}
            className="relative w-[min(90vw,360px)] rounded-2xl p-6 space-y-4 outline-none"
            suppressHydrationWarning
            style={{ background: "#0d1117", border: "1px solid rgba(0,217,255,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/50 mb-1">
              Open with
            </p>
            <h4 className="text-base font-black uppercase tracking-tight text-white">
              Choose your email app
            </h4>

            <button
              suppressHydrationWarning
              onClick={() => openEmail("gmail")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "rgba(234,67,53,0.08)", border: "1px solid rgba(234,67,53,0.25)" }}
            >
              {/* Gmail "M" icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M2 6l10 7L22 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#EA4335" strokeWidth="2"/>
              </svg>
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/80">Gmail in Browser</span>
              <span className="ml-auto text-white/30 text-xs">↗</span>
            </button>

            <button
              suppressHydrationWarning
              onClick={() => openEmail("outlook")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "rgba(0,120,212,0.08)", border: "1px solid rgba(0,120,212,0.25)" }}
            >
              {/* Outlook envelope icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#0078D4" strokeWidth="2"/>
                <path d="M2 8l10 6 10-6" stroke="#0078D4" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="text-left">
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/80 block">Outlook Web</span>
                <span className="font-mono text-[9px] tracking-[0.1em] text-white/35">Requires Outlook.com sign-in</span>
              </div>
              <span className="ml-auto text-white/30 text-xs">↗</span>
            </button>

            <button
              suppressHydrationWarning
              onClick={() => openEmail("default")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <div className="text-left">
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/70 block">Default Mail App</span>
                <span className="font-mono text-[9px] tracking-[0.1em] text-white/35">iOS Mail · Android · Mac Mail · Thunderbird</span>
              </div>
              <span className="ml-auto text-white/30 text-xs">↗</span>
            </button>

            <button
              onClick={() => setShowPicker(false)}
              className="w-full pt-1 text-[10px] font-mono tracking-[0.18em] uppercase text-white/30 hover:text-white/50 transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
