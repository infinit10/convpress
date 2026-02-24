import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../components/PageContainer';
import { MainButton } from '../components/MainButton';
import { BackButton } from '../components/BackButton';
import { ImageIcon, FileTextIcon } from '../components/Icons';

export const Convert: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="page-header">
        <BackButton to="/" />
        <h2>Select Conversion Type</h2>
      </div>
      <div className="vstack w-100 mt-4" style={{ maxWidth: '400px' }}>
        <MainButton onClick={() => navigate('/convert/image-to-image')} icon={<ImageIcon />}>Image ➜ Image</MainButton>
        <MainButton onClick={() => navigate('/convert/image-to-pdf')} icon={<FileTextIcon />}>Image ➜ PDF</MainButton>
        <MainButton onClick={() => navigate('/convert/pdf-to-image')} icon={<ImageIcon />}>PDF ➜ Image</MainButton>
      </div>
    </PageContainer>
  );
};
