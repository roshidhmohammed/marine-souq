import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useLocation } from 'react-router-dom';

const springOptions = {
  stiffness: 140,
  damping: 28,
  mass: 0.25,
};

const scrollShellSpringOptions = {
  stiffness: 85,
  damping: 22,
  mass: 0.2,
};

export function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springOptions);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-[#66CCFF] via-[#0077b6] to-[#22c55e] shadow-[0_0_24px_rgba(102,204,255,0.45)]"
      style={shouldReduceMotion ? undefined : { scaleX }}
    />
  );
}

export function SmoothScrollShell({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, scrollShellSpringOptions);
  const y = useTransform(smoothScrollY, (value) => -value);

  useLayoutEffect(() => {
    if (shouldReduceMotion) {
      setContentHeight(0);
      return undefined;
    }

    const node = contentRef.current;

    if (!node) {
      return undefined;
    }

    const updateHeight = () => {
      setContentHeight(node.getBoundingClientRect().height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(node);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className="relative">{children}</div>;
  }

  return (
    <>
      <div aria-hidden="true" style={{ height: contentHeight }} />
      <motion.div
        ref={contentRef}
        className="fixed inset-x-0 top-0 w-full will-change-transform"
        style={{ y }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default function PageScrollLayout({ children }) {
  const { pathname } = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, springOptions);

  const glowY = useTransform(smoothProgress, [0, 1], [0, 180]);
  const glowScale = useTransform(smoothProgress, [0, 1], [1, 1.14]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.15, 1], [0.28, 0.2, 0.08]);
  const accentX = useTransform(smoothProgress, [0, 1], [-80, 120]);
  const accentOpacity = useTransform(smoothProgress, [0, 0.25, 1], [0.1, 0.16, 0.04]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate"
    >
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(102,204,255,0.22),transparent_62%)] blur-2xl"
            style={{ y: glowY, scale: glowScale, opacity: glowOpacity }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-40 bg-[linear-gradient(90deg,transparent,rgba(0,119,182,0.14),transparent)] blur-3xl"
            style={{ x: accentX, opacity: accentOpacity }}
          />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
