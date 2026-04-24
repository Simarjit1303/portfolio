import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export const cardVariant: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const experienceStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const skillStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 48, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};
