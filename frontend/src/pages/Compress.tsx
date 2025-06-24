import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../components/PageContainer';

export const Compress: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <h2 className="text-primary mb-4">Select Conversion Type</h2>
      <div className="d-grid gap-3 w-100" style={{ maxWidth: '400px' }}>
        <button className="btn btn-outline-primary" onClick={() => navigate('/compress/image')}>
          Compress Image
        </button>
        <button className="btn btn-outline-primary" onClick={() => navigate('/compress/pdf')}>
          Compress PDF
        </button>
      </div>
    </PageContainer>
  );
};
