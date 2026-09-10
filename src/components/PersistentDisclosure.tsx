import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

type PersistentDisclosureProps = Omit<HTMLMotionProps<'div'>, 'animate' | 'initial' | 'exit'> & {
  open: boolean;
};

/** Keep public accordion content in the document, including when it is closed. */
export default function PersistentDisclosure({
  open,
  children,
  transition = { duration: 0.2 },
  style,
  ...props
}: PersistentDisclosureProps) {
  const reducedMotion = useReducedMotion();
  // The build-only HTML also works without JavaScript. Client rendering applies
  // the accessibility state; its static counterpart is expanded by noscript CSS.
  const interactive = typeof window !== 'undefined';
  return (
    <motion.div
      {...props}
      data-persistent-disclosure
      aria-hidden={interactive ? !open : undefined}
      inert={interactive && !open}
      initial={false}
      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      transition={reducedMotion ? { duration: 0 } : transition}
      style={{ ...style, overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
}
