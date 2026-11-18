import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getDirectionOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}

const MOTION_ELEMENTS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const;

const GROUP_ELEMENTS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
} as const;

const ITEM_ELEMENTS = {
  div: motion.div,
  li: motion.li,
} as const;

export interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
  as?: keyof typeof MOTION_ELEMENTS;
}

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 20,
  once = true,
  amount = 0.2,
  className,
  as = "div",
}: ScrollRevealProps) => {
  const shouldReduceMotion = useReducedMotion();
  const offset = getDirectionOffset(direction, distance);
  const Component = MOTION_ELEMENTS[as];

  if (shouldReduceMotion) {
    return (
      <Component
        initial={false}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0 }}
        className={className}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: SMOOTH_EASE }}
      className={className}
    >
      {children}
    </Component>
  );
};

export interface ScrollRevealGroupProps {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
  as?: keyof typeof GROUP_ELEMENTS;
}

export const ScrollRevealGroup = ({
  children,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  className,
  as = "div",
}: ScrollRevealGroupProps) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = GROUP_ELEMENTS[as];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: stagger,
            delayChildren,
          },
    },
  };

  if (shouldReduceMotion) {
    return (
      <Component initial={false} animate="visible" className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </Component>
  );
};

export interface ScrollRevealItemProps {
  children: ReactNode;
  direction?: RevealDirection;
  duration?: number;
  distance?: number;
  className?: string;
  as?: keyof typeof ITEM_ELEMENTS;
}

export const ScrollRevealItem = ({
  children,
  direction = "up",
  duration = 0.45,
  distance = 20,
  className,
  as = "div",
}: ScrollRevealItemProps) => {
  const shouldReduceMotion = useReducedMotion();
  const offset = getDirectionOffset(direction, distance);
  const Component = ITEM_ELEMENTS[as];

  const itemVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, x: 0, y: 0 }
      : { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration, ease: SMOOTH_EASE },
    },
  };

  return (
    <Component variants={itemVariants} className={className}>
      {children}
    </Component>
  );
};

export default ScrollReveal;
