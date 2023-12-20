'use client'

import getScrollAnimation from "@/utils/getScrollAnimations";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  children: React.ReactNode;
  className?: string
}

export default function ScrollAnimationWrapper({
  children,
  className,
  ...props
}: Props) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const StartAnimation = ({
  children,
  className,
  ...props
}: Props) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  
  return (
    <ScrollAnimationWrapper>
      <motion.div
         variants={scrollAnimation}
      >
        {children}
      </motion.div>
    </ScrollAnimationWrapper>
  );
}
