import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  const isRu = i18n.language.startsWith('ru');
  const currentLang = isRu ? 'ru' : 'en';

  const switchLanguage = (targetLang: 'ru' | 'en') => {
    if (isAnimating || currentLang === targetLang) return;
    setIsAnimating(true);

    const container = document.querySelector('.container') as HTMLElement;
    if (container) {
      container.style.transition = 'opacity 0.2s ease-in, transform 0.2s ease-in';
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';

      setTimeout(() => {
        i18n.changeLanguage(targetLang);
        localStorage.setItem('language', targetLang);

        container.style.transition = 'none';
        container.style.transform = 'translateY(-10px)';

        void container.offsetHeight; // Force reflow

        container.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';

        setTimeout(() => {
          container.style.transition = '';
          container.style.transform = '';
          container.style.opacity = '';
          setIsAnimating(false);
        }, 200);
      }, 200);
    } else {
      i18n.changeLanguage(targetLang);
      localStorage.setItem('language', targetLang);
      setIsAnimating(false);
    }
  };

  const languages: { id: 'ru' | 'en'; label: string }[] = [
    { id: 'ru', label: 'RU' },
    { id: 'en', label: 'EN' },
  ];

  return (
    <div className="lang-switcher-container">
      {languages.map((lang) => {
        const isActive = currentLang === lang.id;
        return (
          <motion.button
            key={lang.id}
            type="button"
            onClick={() => switchLanguage(lang.id)}
            className={`lang-btn ${isActive ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeLanguage"
                className="lang-btn-active-bg"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="lang-btn-text">{lang.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
