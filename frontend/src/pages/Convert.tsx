import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../components/PageContainer';

export const Convert: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <h2 className="text-primary mb-4">Select Conversion Type</h2>
      <div className="d-grid gap-3 w-100" style={{ maxWidth: '400px' }}>
        <button className="btn btn-outline-primary" onClick={() => navigate('/convert/image-to-image')}>
          Image ➜ Image
        </button>
        <button className="btn btn-outline-primary" onClick={() => navigate('/convert/image-to-pdf')}>
          Image ➜ PDF
        </button>
        <button className="btn btn-outline-primary" onClick={() => navigate('/convert/pdf-to-image')}>
          PDF ➜ Image
        </button>
      </div>
    </PageContainer>
  );
};
