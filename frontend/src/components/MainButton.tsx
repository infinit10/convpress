import React from 'react';

export const MainButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className = '' }) => {
  return (
    <button className={`large w-100 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
