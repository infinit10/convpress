import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-start py-5 px-3 w-100">
      {children}
    </div>
  );
};
