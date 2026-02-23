import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <button
      className="small outline"
      style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
      onClick={() => navigate(to)}
    >
      ← Back
    </button>
  );
};
