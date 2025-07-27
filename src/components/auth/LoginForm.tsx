import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-facebook-lightgray dark:bg-dark-bg flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        {/* Theme and Language Controls */}
        <div className="flex justify-end space-x-2 mb-8">
          <ThemeToggle />
          <LanguageSelector />
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <i className="bi bi-facebook text-facebook-blue text-6xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-facebook-blue mb-2">{t('auth.title')}</h1>
          <p className="text-gray-600 dark:text-dark-textSecondary text-lg">{t('auth.subtitle')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 border border-gray-200 dark:border-dark-border transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.email')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-textSecondary transition-colors duration-200"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.password')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-textSecondary transition-colors duration-200"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-lg font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('auth.loggingIn')}</span>
                </div>
              ) : (
                t('auth.login')
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-facebook-blue hover:underline text-sm"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>
          </form>

          <hr className="my-6 border-gray-200 dark:border-dark-border" />

          <div className="text-center">
            <Button
              variant="secondary"
              onClick={() => setShowSignup(!showSignup)}
              className="bg-facebook-green hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold"
            >
              {t('auth.createAccount')}
            </Button>
          </div>
        </div>

        {/* Sign Up Form */}
        {showSignup && (
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 mt-4 animate-slide-up border border-gray-200 dark:border-dark-border transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">{t('auth.signUp')}</h2>
            <p className="text-gray-600 dark:text-dark-textSecondary mb-4">{t('auth.signUpSubtitle')}</p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t('auth.firstName')}
                  className="px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-textSecondary transition-colors duration-200"
                />
                <input
                  type="text"
                  placeholder={t('auth.lastName')}
                  className="px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-textSecondary transition-colors duration-200"
                />
              </div>
              
              <input
                type="email"
                placeholder={t('auth.email')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-textSecondary transition-colors duration-200"
              />
              
              <input
                type="password"
                placeholder={t('auth.newPassword')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-textSecondary transition-colors duration-200"
              />

              <div>
                <label className="text-sm text-gray-600 dark:text-dark-textSecondary mb-2 block">{t('auth.birthday')}</label>
                <div className="grid grid-cols-3 gap-2">
                  <select className="px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text">
                    <option>{t('auth.month')}</option>
                    <option>January</option>
                    <option>February</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text">
                    <option>{t('auth.day')}</option>
                    <option>1</option>
                    <option>2</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-facebook-blue bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text">
                    <option>{t('auth.year')}</option>
                    <option>2000</option>
                    <option>1999</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-dark-textSecondary mb-2 block">{t('auth.gender')}</label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-gray-700 dark:text-dark-text">
                    <input type="radio" name="gender" value="female" className="mr-2" />
                    <span>{t('auth.female')}</span>
                  </label>
                  <label className="flex items-center text-gray-700 dark:text-dark-text">
                    <input type="radio" name="gender" value="male" className="mr-2" />
                    <span>{t('auth.male')}</span>
                  </label>
                  <label className="flex items-center text-gray-700 dark:text-dark-text">
                    <input type="radio" name="gender" value="custom" className="mr-2" />
                    <span>{t('auth.custom')}</span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-facebook-green hover:bg-green-600 text-white py-3 text-lg font-semibold"
              >
                {t('auth.signUp')}
              </Button>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-dark-textSecondary">{t('general.poweredBy')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
