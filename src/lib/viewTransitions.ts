export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  // Use View Transitions API if supported, fall back to smooth scroll
  if ("startViewTransition" in document) {
    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => {
        el.scrollIntoView({ behavior: "instant" });
      });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
