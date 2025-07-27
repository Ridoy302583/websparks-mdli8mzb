import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from './Button';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'ja', name: t('language.japanese'), flag: '🇯🇵' },
    { code: 'bn', name: t('language.bengali'), flag: '🇧🇩' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full flex items-center space-x-2"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <i className="bi bi-chevron-down text-sm"></i>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-gray-200 dark:border-dark-border py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'en' | 'ja' | 'bn');
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-hover flex items-center space-x-3 transition-colors ${
                language === lang.code ? 'bg-facebook-blue bg-opacity-10 text-facebook-blue' : 'text-gray-700 dark:text-dark-text'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && (
                <i className="bi bi-check text-facebook-blue ml-auto"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
