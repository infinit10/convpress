import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="vstack items-center w-100" style={{ padding: '3rem 1rem' }}>
      {children}
    </div>
  );
};
