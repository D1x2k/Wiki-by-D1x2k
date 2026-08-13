
import { useState, useEffect } from 'react';
import { TiltCard } from '../components/TiltCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FeedbackModal } from '../components/FeedbackModal';

export const Dashboard = () => {
  const { t } = useTranslation();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    document.title = `${t('dashboard.title')} | Wiki by D1x2k`;
  }, [t]);

  return (
    <>
      <div className="glow-bg"></div>
      <div className="container" style={{ padding: '60px 0' }}>
        <header className="hero no-select">
          <h1 className="text-gradient-animated" style={{ marginBottom: '40px' }}>📚 {t('dashboard.title')}<br />Wiki by D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k</h1>
        </header>

        <section style={{ width: '100%', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <motion.button
            onClick={() => setIsFeedbackOpen(true)}
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '20px',
              color: '#d8b4fe',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 16px rgba(168, 85, 247, 0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{ fontSize: '24px' }}>💡</span>
            {t('feedback.button')}
          </motion.button>
        </section>

        <section style={{ width: '100%' }}>
          <div className="grid-2">

            <TiltCard to="/activation" className="action-btn glow-card" style={{ textDecoration: 'none', height: '100%', flexDirection: 'column', gap: '20px', padding: '32px 24px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.svg className="btn-icon" viewBox="0 0 24 24" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></motion.svg>
                <span className="btn-text" style={{ fontSize: '18px' }}>{t('dashboard.cards.windows.title')}</span>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, flex: 1 }}>
                {t('dashboard.cards.windows.desc')}
              </span>
            </TiltCard>

            <TiltCard to="/xbox-game-bar" className="action-btn glow-card" style={{ textDecoration: 'none', height: '100%', flexDirection: 'column', gap: '20px', padding: '32px 24px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></motion.svg>
                <span className="btn-text" style={{ fontSize: '18px' }}>{t('dashboard.cards.xbox.title')}</span>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, flex: 1 }}>
                {t('dashboard.cards.xbox.desc')}
              </span>
            </TiltCard>



            <TiltCard to="/windows-apps" className="action-btn glow-card" style={{ textDecoration: 'none', height: '100%', flexDirection: 'column', gap: '20px', padding: '32px 24px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></motion.svg>
                <span className="btn-text" style={{ fontSize: '18px' }}>{t('dashboard.cards.windows_apps.title')}</span>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, flex: 1 }}>
                {t('dashboard.cards.windows_apps.desc')}
              </span>
            </TiltCard>
          </div>
        </section>

        <footer style={{ marginTop: '60px' }}>
          <div>v2.0.0</div>
          <div>Guides by D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k</div>
          <div>&copy; 2026 Instructions. D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k dev.</div>
        </footer>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
};

