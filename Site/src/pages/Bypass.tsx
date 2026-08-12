import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Bypass = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('dashboard.cards.bypass.title')} | Wiki by D1x2k`;
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <>
      <div className="glow-bg" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(239, 68, 68, 0.15) 0%, rgba(0, 0, 0, 0) 100%)' }}></div>
      <div className="container welcome-screen" style={{ minHeight: '80vh', textAlign: 'center', padding: '0 20px' }}>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            marginBottom: '10px'
          }}
        >
          <motion.svg 
            width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </motion.svg>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-gradient-animated"
          style={{ fontSize: '42px', fontWeight: 800, margin: '0 0 16px 0', background: 'linear-gradient(120deg, #ffffff, #fca5a5, #ef4444, #ffffff)', backgroundSize: '300% 300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {t('dashboard.wip_bypass.title')}
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.6, marginBottom: '40px' }}
        >
          {t('dashboard.wip_bypass.desc')}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {t('dashboard.wip_bypass.back')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </>
  );
};
