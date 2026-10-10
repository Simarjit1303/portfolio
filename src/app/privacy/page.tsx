import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Simarjit Singh",
  description: "How simarjit.de handles personal data.",
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who is responsible",
    body: (
      <p>
        This is the personal portfolio website of Simarjit Singh, Berlin, Germany. The controller
        under the GDPR is Simarjit Singh, reachable at{" "}
        <a href="mailto:simarjit1303@gmail.com" className="text-[#00D9FF] hover:underline">
          simarjit1303@gmail.com
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Summary",
    body: (
      <p>
        This site sets no cookies, shows no ads, and has no user accounts. It does not store
        anything you type into the contact form. The only personal data processed is what any
        website needs to be delivered to you, plus cookieless, aggregated visitor statistics.
      </p>
    ),
  },
  {
    heading: "Hosting",
    body: (
      <p>
        The site is hosted by Vercel Inc. (USA). When you visit, Vercel processes technical data
        such as your IP address, browser type, the page requested and the time of the request, in
        order to deliver the site and keep it secure. Vercel acts as a processor on my behalf.
        Transfers to the USA are covered by the EU-U.S. Data Privacy Framework and/or Standard
        Contractual Clauses. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in running a
        secure, working website).
      </p>
    ),
  },
  {
    heading: "Visitor statistics and performance",
    body: (
      <p>
        I use Vercel Web Analytics and Vercel Speed Insights to see how many people visit, which
        sections they reach, and how fast pages load. Both work without cookies and without
        building a profile of you. Visitors are not identified across days or across websites,
        and I only see aggregated numbers. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in
        understanding and improving the site).
      </p>
    ),
  },
  {
    heading: "Contact form",
    body: (
      <p>
        The contact form does not send anything to a server. When you submit it, it opens an
        email draft addressed to me, either in your own email app or, if you choose, in Gmail
        (Google) or Outlook.com (Microsoft) in your browser. If you choose one of those web
        services, your draft is passed to that provider under its own privacy policy. I only
        receive your details if you actually send the email, and I use them solely to reply.
        Legal basis: Art. 6(1)(b) and (f) GDPR.
      </p>
    ),
  },
  {
    heading: "Fonts and external links",
    body: (
      <p>
        Fonts are served from this domain, so no request is made to Google Fonts. Links to
        LinkedIn, Xing and GitHub are plain links. No data is sent to those sites unless you click
        a link, after which their own privacy policies apply.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        You have the right to access, rectification, erasure, restriction of processing, data
        portability and to object to processing based on legitimate interests (Art. 15–21 GDPR).
        To exercise them, email me at the address above. You also have the right to lodge a
        complaint with a supervisory authority, for example the Berlin Commissioner for Data
        Protection and Freedom of Information (Berliner Beauftragte für Datenschutz und
        Informationsfreiheit).
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-[100dvh] bg-[#121212] px-6 sm:px-8 md:px-24 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-white/60 hover:text-[#00D9FF] transition-colors duration-200"
        >
          ← Back to portfolio
        </Link>

        <div className="h-[2px] w-10 rounded-full mt-10 mb-4" style={{ background: "linear-gradient(90deg, #00D9FF, transparent)" }} />
        <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60">■ Legal</p>
        <h1
          className="text-[clamp(2rem,5vw,3.25rem)] font-black uppercase tracking-tight leading-none text-white mt-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Privacy Policy
        </h1>
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60 mt-4">
          Last updated: 10 October 2026
        </p>

        <div className="mt-12 space-y-10">
          {sections.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#00D9FF] mb-3">
                {heading}
              </h2>
              <div className="text-white/70 text-sm leading-relaxed">{body}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
