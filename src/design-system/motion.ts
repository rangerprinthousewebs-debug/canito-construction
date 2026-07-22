import { Variants } from "framer-motion";

export const fadeUp = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const fadeLeft = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const fadeRight = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const fadeScale = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const zoom = (delay = 0, duration = 1): Variants => ({
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const imageReveal: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeInOut" },
};

export const navbarReveal: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
