import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from './Button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 hover:scale-110"
      title={isDark ? t('theme.light') : t('theme.dark')}
    >
      {isDark ? (
        <i className="bi bi-sun text-xl text-yellow-400"></i>
      ) : (
        <i className="bi bi-moon text-xl text-gray-600"></i>
      )}
    </Button>
  );
};

export default ThemeToggle;
