
import { useEffect } from 'react';
import { TiltCard } from '../components/TiltCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation();

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

            <TiltCard to="/cloudflare" className="action-btn glow-card" style={{ textDecoration: 'none', height: '100%', flexDirection: 'column', gap: '20px', padding: '32px 24px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}><path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1332 20.1793 10.1989 17.8688 10.0242C17.3719 6.6436 14.4849 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2334 4.01142 11.464 4.03362 11.6912C2.30232 12.3591 1 14.0298 1 16C1 18.2091 2.79086 20 5 20H17.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></motion.svg>
                <span className="btn-text" style={{ fontSize: '18px' }}>{t('dashboard.cards.cloudflare.title')}</span>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, flex: 1 }}>
                {t('dashboard.cards.cloudflare.desc')}
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
    </>
  );
};

