import React from 'react';

export const MainButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}> = ({ onClick, children, icon, className = '' }) => {
  return (
    <button className={`main-button large w-100 ${className}`} onClick={onClick}>
      {icon && <span className="main-button-icon">{icon}</span>}
      {children}
    </button>
  );
}
