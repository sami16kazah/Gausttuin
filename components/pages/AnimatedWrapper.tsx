"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useInView } from "framer-motion";

export default function AnimatedWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref} // Apply the ref here
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animation triggered when in view
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
