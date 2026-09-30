import React from 'react';

export const WebindSymbol = ({ className = 'w-10 h-10', priority = false }) => {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src="/assets/webind-symbol.png"
        alt="WEBIND GROUP Symbol"
        className="w-full h-full object-contain filter contrast-125"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};

export const WebindFullLogo = ({ className = 'h-8', priority = false }) => {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <img
        src="/assets/webind-full-logo.png"
        alt="WEBIND GROUP"
        className="h-full w-auto object-contain filter contrast-125"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};

export default WebindSymbol;
