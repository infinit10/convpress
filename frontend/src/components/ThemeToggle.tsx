import React, { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.body;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="btn btn-sm btn-outline-secondary ms-2"
      title="Toggle theme"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};
