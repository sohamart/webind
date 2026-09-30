import React from 'react';

export const SpotlightCard = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-3xl liquid-glass overflow-hidden p-6 transition-all duration-300 hover:border-white/25 hover:-translate-y-1 group ${className}`}
    >
      {/* Internal Top Rim Specular Light */}
      <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
