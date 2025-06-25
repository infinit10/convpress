import React, { useState, useEffect } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

export const ThemeToggle: React.FC = () => {
  const { switcher, themes, currentTheme, status } = useThemeSwitcher();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // keep the toggle in sync with currentTheme
    setIsDarkMode(currentTheme === 'dark');
  }, [currentTheme]);

  const toggleTheme = () => {
    setIsDarkMode(previous => {
      const newTheme = previous ? themes.light : themes.dark;
      switcher({ theme: newTheme });

      localStorage.setItem('theme', newTheme);

      return !previous;
    });
  };

  if (status === 'loading') return <span>Loading theme...</span>;

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm ms-2"

      title="Toggle theme"
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};
