import type { Metadata } from "next";
import { LegalPage, ContactEmail, type LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Simarjit Singh",
  description: "Wie simarjit.de mit personenbezogenen Daten umgeht.",
  alternates: { languages: { en: "/privacy" } },
};

const sections: LegalSection[] = [
  {
    heading: "Verantwortlicher",
    body: (
      <p>
        Dies ist die persönliche Portfolio-Website von Simarjit Singh, Berlin. Verantwortlicher im
        Sinne der DSGVO ist Simarjit Singh, erreichbar unter <ContactEmail />.
      </p>
    ),
  },
  {
    heading: "Kurzfassung",
    body: (
      <p>
        Diese Website setzt keine Cookies, zeigt keine Werbung und hat keine Benutzerkonten.
        Eingaben im Kontaktformular werden nicht gespeichert. Verarbeitet werden nur die Daten,
        die für die Auslieferung jeder Website nötig sind, sowie cookielose, zusammengefasste
        Besucherstatistiken.
      </p>
    ),
  },
  {
    heading: "Hosting",
    body: (
      <p>
        Diese Website wird von Vercel Inc. (USA) gehostet. Beim Aufruf verarbeitet Vercel
        technische Daten wie Ihre IP-Adresse, den Browsertyp, die aufgerufene Seite und den
        Zeitpunkt des Abrufs, um die Website auszuliefern und abzusichern. Vercel ist als
        Auftragsverarbeiter für mich tätig. Übermittlungen in die USA erfolgen auf Grundlage des
        EU-U.S. Data Privacy Framework und/oder von Standardvertragsklauseln. Rechtsgrundlage:
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, funktionierenden
        Website).
      </p>
    ),
  },
  {
    heading: "Besucherstatistik und Ladezeiten",
    body: (
      <p>
        Ich nutze Vercel Web Analytics und Vercel Speed Insights, um zu sehen, wie viele Menschen
        die Website besuchen, welche Bereiche sie erreichen und wie schnell die Seiten laden.
        Beide Dienste arbeiten ohne Cookies und ohne Profilbildung. Besucher werden weder
        tagesübergreifend noch websiteübergreifend wiedererkannt, und ich sehe nur
        zusammengefasste Zahlen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
        Interesse daran, die Website zu verstehen und zu verbessern).
      </p>
    ),
  },
  {
    heading: "Kontaktformular",
    body: (
      <p>
        Das Kontaktformular sendet nichts an einen Server. Beim Absenden öffnet es einen an mich
        adressierten E-Mail-Entwurf, entweder in Ihrem eigenen E-Mail-Programm oder, wenn Sie es
        auswählen, in Gmail (Google) bzw. Outlook.com (Microsoft) im Browser. Wählen Sie einen
        dieser Webdienste, wird Ihr Entwurf an den jeweiligen Anbieter übermittelt; es gilt dessen
        Datenschutzerklärung. Ihre Angaben erhalte ich nur, wenn Sie die E-Mail tatsächlich
        absenden, und ich verwende sie ausschließlich für meine Antwort. Rechtsgrundlage: Art. 6
        Abs. 1 lit. b und f DSGVO.
      </p>
    ),
  },
  {
    heading: "Schriftarten und externe Links",
    body: (
      <p>
        Die Schriftarten werden von dieser Domain ausgeliefert; eine Verbindung zu Google Fonts
        findet nicht statt. Links zu LinkedIn, Xing und GitHub sind einfache Links. An diese
        Dienste werden erst Daten übermittelt, wenn Sie einen Link anklicken; danach gelten deren
        Datenschutzerklärungen.
      </p>
    ),
  },
  {
    heading: "Ihre Rechte",
    body: (
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
        Datenübertragbarkeit sowie auf Widerspruch gegen Verarbeitungen, die auf berechtigten
        Interessen beruhen (Art. 15–21 DSGVO). Schreiben Sie mir dazu einfach an die oben genannte
        Adresse. Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren, zum Beispiel bei der Berliner Beauftragten für Datenschutz und
        Informationsfreiheit.
      </p>
    ),
  },
];

export default function DatenschutzPage() {
  return (
    <LegalPage
      lang="de"
      label="Rechtliches"
      title={"Datenschutz­erklärung"}
      updated="Stand: 10.10.2026"
      backLabel="Zurück zum Portfolio"
      switchHref="/privacy"
      switchLabel="English version"
      sections={sections}
    />
  );
}
