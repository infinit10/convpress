import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from './Icons';

interface BackButtonProps {
  to: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <button
      className="back-button small outline icon-button"
      style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
      onClick={() => navigate(to)}
    >
      <ArrowLeftIcon size={16} /> Back
    </button>
  );
};
