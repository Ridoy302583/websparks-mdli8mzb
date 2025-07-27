import React, { useState } from 'react';
import { User } from '../../types';
import { LocalStorageService } from '../../utils/localStorage';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStorageInfo, setShowStorageInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const handleClearData = () => {
    if (window.confirm(t('general.clearDataConfirm'))) {
      LocalStorageService.clearAllData();
      window.location.reload();
    }
  };

  const storageInfo = LocalStorageService.getStorageInfo();

  return (
    <>
      <header className="bg-white dark:bg-dark-surface shadow-sm border-b border-gray-200 dark:border-dark-border sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Search */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <i className="bi bi-facebook text-facebook-blue text-2xl"></i>
                <span className="ml-2 text-xl font-bold text-facebook-blue hidden sm:block">SocialConnect</span>
              </div>
              
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('header.search')}
                    className="w-64 pl-10 pr-4 py-2 bg-facebook-lightgray dark:bg-dark-card rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-facebook-blue transition-all duration-200 text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-textSecondary border-2 border-red-500"
                  />
                  <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-dark-textSecondary"></i>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-dark-textSecondary dark:hover:text-dark-text"
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" className="p-3 rounded-full relative">
                <i className="bi bi-house-door text-xl text-facebook-blue"></i>
              </Button>
              <Button variant="ghost" className="p-3 rounded-full relative">
                <i className="bi bi-people text-xl text-gray-600 dark:text-dark-textSecondary"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-facebook-red text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" className="p-3 rounded-full">
                <i className="bi bi-play-btn text-xl text-gray-600 dark:text-dark-textSecondary"></i>
              </Button>
              <Button variant="ghost" className="p-3 rounded-full">
                <i className="bi bi-shop text-xl text-gray-600 dark:text-dark-textSecondary"></i>
              </Button>
              <Button variant="ghost" className="p-3 rounded-full">
                <i className="bi bi-controller text-xl text-gray-600 dark:text-dark-textSecondary"></i>
              </Button>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageSelector />
              
              <Button variant="ghost" className="p-2 rounded-full">
                <i className="bi bi-grid-3x3-gap text-xl text-gray-700 dark:text-dark-textSecondary"></i>
              </Button>
              <Button variant="ghost" className="p-2 rounded-full relative">
                <i className="bi bi-chat-dots text-xl text-gray-700 dark:text-dark-textSecondary"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-facebook-red text-white text-xs rounded-full flex items-center justify-center">2</span>
              </Button>
              <Button variant="ghost" className="p-2 rounded-full relative">
                <i className="bi bi-bell text-xl text-gray-700 dark:text-dark-textSecondary"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-facebook-red text-white text-xs rounded-full flex items-center justify-center">5</span>
              </Button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <Avatar src={user.avatar} alt={user.name} size="sm" isOnline={user.isOnline} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-gray-200 dark:border-dark-border py-2">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                      <div className="flex items-center space-x-3">
                        <Avatar src={user.avatar} alt={user.name} size="md" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-dark-text">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-dark-textSecondary">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-hover flex items-center space-x-3 transition-colors">
                        <i className="bi bi-person text-gray-500 dark:text-dark-textSecondary"></i>
                        <span>{t('header.profile')}</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-hover flex items-center space-x-3 transition-colors">
                        <i className="bi bi-gear text-gray-500 dark:text-dark-textSecondary"></i>
                        <span>{t('header.settings')}</span>
                      </button>
                      <button 
                        onClick={() => setShowStorageInfo(true)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-hover flex items-center space-x-3 transition-colors"
                      >
                        <i className="bi bi-hdd text-gray-500 dark:text-dark-textSecondary"></i>
                        <span>{t('header.storage')}</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-hover flex items-center space-x-3 transition-colors">
                        <i className="bi bi-question-circle text-gray-500 dark:text-dark-textSecondary"></i>
                        <span>{t('header.help')}</span>
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-dark-border" />
                      <button
                        onClick={handleClearData}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 flex items-center space-x-3 transition-colors"
                      >
                        <i className="bi bi-trash text-red-500"></i>
                        <span>{t('header.clearData')}</span>
                      </button>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-hover flex items-center space-x-3 transition-colors"
                      >
                        <i className="bi bi-box-arrow-right text-gray-500 dark:text-dark-textSecondary"></i>
                        <span>{t('header.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
              >
                <i className="bi bi-list text-xl text-gray-700 dark:text-dark-textSecondary"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-dark-border py-4">
              <div className="flex justify-around">
                <Button variant="ghost" className="p-3">
                  <i className="bi bi-house-door text-xl text-facebook-blue"></i>
                </Button>
                <Button variant="ghost" className="p-3">
                  <i className="bi bi-people text-xl text-gray-600 dark:text-dark-textSecondary"></i>
                </Button>
                <Button variant="ghost" className="p-3">
                  <i className="bi bi-play-btn text-xl text-gray-600 dark:text-dark-textSecondary"></i>
                </Button>
                <Button variant="ghost" className="p-3">
                  <i className="bi bi-shop text-xl text-gray-600 dark:text-dark-textSecondary"></i>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Storage Info Modal */}
      <Modal
        isOpen={showStorageInfo}
        onClose={() => setShowStorageInfo(false)}
        title={t('storage.title')}
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-dark-text mb-2">{t('storage.usage')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-dark-textSecondary">{t('storage.used')}</span>
                <span className="text-gray-900 dark:text-dark-text">{(storageInfo.used / 1024).toFixed(2)} KB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-dark-textSecondary">{t('storage.total')}</span>
                <span className="text-gray-900 dark:text-dark-text">{(storageInfo.total / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                <div 
                  className="bg-facebook-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-dark-textSecondary">
                {storageInfo.percentage.toFixed(1)}% used
              </p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-dark-textSecondary">
            <p className="mb-2">{t('storage.description')}</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>{t('storage.posts')}</li>
              <li>{t('storage.likes')}</li>
              <li>{t('storage.profile')}</li>
              <li>{t('storage.preferences')}</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="danger"
              onClick={handleClearData}
              className="flex-1"
            >
              {t('header.clearData')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowStorageInfo(false)}
              className="flex-1"
            >
              {t('storage.close')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
