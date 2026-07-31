import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLanguage = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
    
    const container = document.querySelector('.container') as HTMLElement;
    if (container) {
      container.style.transition = 'opacity 0.2s ease-in, transform 0.2s ease-in';
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        i18n.changeLanguage(nextLang);
        localStorage.setItem('language', nextLang);
        
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
      i18n.changeLanguage(nextLang);
      localStorage.setItem('language', nextLang);
      setIsAnimating(false);
    }
  };

  const isRu = i18n.language.startsWith('ru');

  return (
    <motion.button
      onClick={toggleLanguage}
      className="lang-switcher"
      whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.6), rgba(15, 15, 20, 0.8))',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '8px 16px',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: '13px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <span style={{ 
        opacity: isRu ? 1 : 0.4, 
        color: isRu ? '#c4b5fd' : '#fff',
        transition: 'all 0.3s ease'
      }}>RU</span>
      <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
      <span style={{ 
        opacity: !isRu ? 1 : 0.4,
        color: !isRu ? '#c4b5fd' : '#fff',
        transition: 'all 0.3s ease'
      }}>EN</span>
    </motion.button>
  );
};
