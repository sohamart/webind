import React from 'react';
import { motion } from 'framer-motion';

export const LiquidGlassCard = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.985 }}
      className={`relative rounded-3xl p-6 md:p-8 liquid-glass-card cursor-pointer group ${className}`}
    >
      {/* Internal Top Rim Specular Light */}
      <div className="pointer-events-none absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default LiquidGlassCard;
