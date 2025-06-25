import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-secondary btn-sm border-0"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--backbutton-text)',
        fontSize: '1rem'
      }}
      onClick={() => navigate(to)}
    >
      ← Back
    </button>
  );
};
