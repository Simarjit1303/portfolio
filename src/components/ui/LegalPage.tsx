import Link from "next/link";
import Cursor from "@/components/ui/Cursor";

export type LegalSection = { heading: string; body: React.ReactNode };

interface LegalPageProps {
  lang: "en" | "de";
  label: string;
  title: string;
  updated: string;
  backLabel: string;
  switchHref: string;
  switchLabel: string;
  sections: LegalSection[];
}

export function LegalPage({ lang, label, title, updated, backLabel, switchHref, switchLabel, sections }: LegalPageProps) {
  return (
    <main lang={lang} className="min-h-[100dvh] bg-[#121212] px-6 sm:px-8 md:px-24 py-16 md:py-24">
      <Cursor />
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-white/60 hover:text-[#00D9FF] transition-colors duration-200"
          >
            ← {backLabel}
          </Link>
          <Link
            href={switchHref}
            className="text-[11px] font-mono tracking-widest uppercase text-white/60 hover:text-[#00D9FF] transition-colors duration-200"
          >
            {switchLabel}
          </Link>
        </div>

        <div className="h-[2px] w-10 rounded-full mt-10 mb-4" style={{ background: "linear-gradient(90deg, #00D9FF, transparent)" }} />
        <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60">■ {label}</p>
        <h1
          className="text-[clamp(2rem,5vw,3.25rem)] font-black uppercase tracking-tight leading-none text-white mt-3 [overflow-wrap:anywhere]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60 mt-4">{updated}</p>

        <div className="mt-12 space-y-10">
          {sections.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#00D9FF] mb-3">{heading}</h2>
              <div className="text-white/70 text-sm leading-relaxed">{body}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export function ContactEmail() {
  return (
    <a href="mailto:simarjit1303@gmail.com" className="text-[#00D9FF] hover:underline">
      simarjit1303@gmail.com
    </a>
  );
}
