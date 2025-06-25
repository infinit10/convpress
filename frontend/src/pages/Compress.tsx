import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../components/PageContainer';
import { BackButton } from '../components/BackButton';
import { MainButton } from '../components/MainButton';

export const Compress: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: '100%' }}>
        <div className="flex-shrink-0">
          <BackButton to="/" />
        </div>
        <div className="flex-grow-1 d-flex justify-content-center">
          <h2 className="display-5 mb-3">Compression Options</h2>
        </div>
        <div className="flex-shrink-0" style={{ width: 40 }}></div>
      </div>
      
      <div className="d-grid gap-3 w-100" style={{ maxWidth: '400px' }}>
        <MainButton onClick={() => navigate('/compress/image')}>Compress Image</MainButton>
        <MainButton onClick={() => navigate('/compress/pdf')}>Compress PDF</MainButton>
      </div>
    </PageContainer>
  );
};
