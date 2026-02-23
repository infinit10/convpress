import React, { useState, useEffect } from 'react';

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="theme-toggle" onClick={() => setIsDarkMode(prev => !prev)} role="switch" aria-checked={isDarkMode} tabIndex={0}>
      <div className="theme-toggle-slider" style={{ left: isDarkMode ? '50%' : '0' }} />
      <span className={`theme-toggle-label ${!isDarkMode ? 'active' : ''}`}>Light</span>
      <span className={`theme-toggle-label ${isDarkMode ? 'active' : ''}`}>Dark</span>
    </div>
  );
};
