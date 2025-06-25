import React from 'react';

export const MainButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children }) => {
  return (
    <button
      className="btn btn-primary btn-lg border-0"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
