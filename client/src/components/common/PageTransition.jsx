import React from 'react';

export const PageTransition = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {children}
    </div>
  );
};

export default PageTransition;
