import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGlowEffect } from '../hooks/useGlowEffect';
import { DNSGuide } from '../components/DNSGuide';
import { ZapretGuide } from '../components/ZapretGuide';
import { HostsGuide } from '../components/HostsGuide';
import { TgWsProxyGuide } from '../components/TgWsProxyGuide';
import { CloudflareGuide } from '../components/CloudflareGuide';

export const Bypass = () => {
  const { t } = useTranslation();
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const rawTableItems = t('dashboard.bypass_table.items', { returnObjects: true });
  const tableItems = Array.isArray(rawTableItems) ? rawTableItems : [];

  useScrollReveal();
  useGlowEffect();

  useEffect(() => {
    document.title = `${t('dashboard.cards.bypass.title')} | Wiki by D1x2k`;
    window.scrollTo(0, 0);
  }, [t]);

  // Lock body scroll when modal is open and prevent layout shift
  useEffect(() => {
    if (selectedGuideId) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `calc(24px + ${scrollbarWidth}px)`;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedGuideId]);

  return (
    <>
      <div className="glow-bg"></div>
      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span>{t('nav.back')}</span>
        </Link>

        <div className="welcome-screen scroll-reveal" style={{ minHeight: 'auto', paddingTop: '3vh', paddingBottom: '3vh' }}>
          <header className="hero no-select">
            <h1 className="text-gradient-animated" style={{ fontSize: '36px', marginBottom: '16px' }}>🛡️ {t('dashboard.cards.bypass.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              {t('dashboard.cards.bypass.desc')}
            </p>
          </header>
        </div>

        <section id="guide-content" className="scroll-reveal content-section" style={{ minHeight: '60vh' }}>
          <div className="table-container glow-card" style={{ marginTop: '10px' }}>
            <table className="kms-table bypass-table">
              <thead>
                <tr>
                  <th><div className="table-th-content"><span>📁</span> {t('dashboard.bypass_table.columns.name')}</div></th>
                  <th><div className="table-th-content"><span>📝</span> {t('dashboard.bypass_table.columns.desc')}</div></th>
                  <th><div className="table-th-content"><span>💻</span> {t('dashboard.bypass_table.columns.platform')}</div></th>
                </tr>
              </thead>
              <tbody>
                {tableItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className="bypass-tr"
                    onClick={() => setSelectedGuideId(item.id)}
                  >
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div
                        style={{
                          color: '#d8b4fe',
                          fontSize: '16px',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          textShadow: '0 0 10px rgba(168, 85, 247, 0.4)'
                        }}
                      >
                        {item.name}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {item.platforms.map((platform) => (
                          <span key={platform} style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '4px 10px',
                            fontSize: '12px',
                            color: '#e2e8f0'
                          }}>
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="scroll-reveal">
          <div>v2.0.0</div>
          <div>Guide by D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k</div>
          <div>&copy; 2026 Instructions. D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k dev.</div>
        </footer>

        <div className="scroll-spacer"></div>
      </div>

      <AnimatePresence>
        {selectedGuideId && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGuideId(null)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)'
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '85vh',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
                  {tableItems.find(item => item.id === selectedGuideId)?.name}
                </h2>
                <button
                  onClick={() => setSelectedGuideId(null)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                    e.currentTarget.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="custom-scrollbar" style={{
                padding: '32px',
                overflowY: 'auto',
                flex: 1,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontSize: '16px'
              }}>
                {selectedGuideId === 'dns' ? (
                  <DNSGuide />
                ) : selectedGuideId === 'zapret' ? (
                  <ZapretGuide />
                ) : selectedGuideId === 'hosts' ? (
                  <HostsGuide />
                ) : selectedGuideId === 'tg_ws_proxy' ? (
                  <TgWsProxyGuide />
                ) : selectedGuideId === 'cloudflare' ? (
                  <CloudflareGuide />
                ) : (
                  <>
                    <p>
                      Здесь будет очень много текста, подробный гайд, команды и скриншоты для настройки 
                      <strong> {tableItems.find(item => item.id === selectedGuideId)?.name}</strong>.
                    </p>
                    <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                      <em>(Место для будущего контента гайда)</em>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
