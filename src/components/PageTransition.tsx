import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
