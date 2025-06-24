import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to = '/convert' }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-end">
      <button
        className="btn btn-link text-decoration-none text-secondary"
        onClick={() => navigate(to)}
        style={{ fontSize: '1rem' }}
      >
        ← Back
      </button>
    </div>
  );
};
