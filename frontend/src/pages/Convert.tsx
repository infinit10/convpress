import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../components/PageContainer';
import { MainButton } from '../components/MainButton';
import { BackButton } from '../components/BackButton';

export const Convert: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: '100%' }}>
        <div className="flex-shrink-0">
          <BackButton to="/" />
        </div>
        <div className="flex-grow-1 d-flex justify-content-center">
          <h2 className="display-5 mb-3">Select Conversion Type</h2>
        </div>
        <div className="flex-shrink-0" style={{ width: 40 }}></div>
      </div>
      <div className="d-grid gap-3 w-100" style={{ maxWidth: '400px' }}>
        <MainButton onClick={() => navigate('/convert/image-to-image')}>Image ➜ Image</MainButton>
        <MainButton onClick={() => navigate('/convert/image-to-pdf')}>Image ➜ PDF</MainButton>
        <MainButton onClick={() => navigate('/convert/pdf-to-image')}>PDF ➜ Image</MainButton>
      </div>
    </PageContainer>
  );
};
