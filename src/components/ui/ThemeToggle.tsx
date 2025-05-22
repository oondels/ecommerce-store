import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-gray-200 transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon size={20} className="text-gray-700 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;