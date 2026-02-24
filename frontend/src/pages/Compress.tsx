import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../components/PageContainer';
import { BackButton } from '../components/BackButton';
import { MainButton } from '../components/MainButton';
import { ImageIcon, FileTextIcon } from '../components/Icons';

export const Compress: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="page-header">
        <BackButton to="/" />
        <h2>Compression Options</h2>
      </div>
      <div className="vstack w-100 mt-4" style={{ maxWidth: '400px' }}>
        <MainButton onClick={() => navigate('/compress/image')} icon={<ImageIcon />}>Compress Image</MainButton>
        <MainButton onClick={() => navigate('/compress/pdf')} icon={<FileTextIcon />}>Compress PDF</MainButton>
      </div>
    </PageContainer>
  );
};
