import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TerminalCard } from './TerminalCard';

export const TgWsProxyGuide = () => {
  const { t } = useTranslation();
  const downloadSteps = t('dashboard.tg_ws_proxy_guide.download.steps', { returnObjects: true }) as string[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {t('dashboard.tg_ws_proxy_guide.intro')}
      </p>

      {/* 1. Download & Launch Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.tg_ws_proxy_guide.download.title')}
        </h3>
        
        <ol style={{ paddingLeft: '20px', margin: '16px 0', color: 'var(--text-secondary)' }}>
          {Array.isArray(downloadSteps) && downloadSteps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>

        <a 
          href={t('dashboard.tg_ws_proxy_guide.download.link')}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '12px 16px',
            borderRadius: '8px',
            color: '#d8b4fe',
            textDecoration: 'none',
            fontSize: '14px',
            fontFamily: 'monospace',
            marginTop: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {t('dashboard.tg_ws_proxy_guide.download.link')}
        </a>
      </motion.div>

      {/* 2. Connection Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.tg_ws_proxy_guide.setup.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          {t('dashboard.tg_ws_proxy_guide.setup.desc')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#34d399', fontWeight: 'bold' }}>
              {t('dashboard.tg_ws_proxy_guide.setup.auto.title')}
            </span>
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('dashboard.tg_ws_proxy_guide.setup.auto.desc')}
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>
              {t('dashboard.tg_ws_proxy_guide.setup.manual.title')}
            </span>
            <p style={{ margin: '8px 0 16px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('dashboard.tg_ws_proxy_guide.setup.manual.desc')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{t('dashboard.tg_ws_proxy_guide.setup.manual.server')}</span>
                <TerminalCard command="127.0.0.1" hidePrefix={true} style={{ marginTop: 0, padding: '12px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{t('dashboard.tg_ws_proxy_guide.setup.manual.port')}</span>
                <TerminalCard command="1443" hidePrefix={true} style={{ marginTop: 0, padding: '12px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{t('dashboard.tg_ws_proxy_guide.setup.manual.secret')}</span>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <em>(Берется из логов или настроек трея / Taken from tray settings or logs)</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Troubleshooting Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
          {t('dashboard.tg_ws_proxy_guide.troubleshooting.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          {t('dashboard.tg_ws_proxy_guide.troubleshooting.desc')}
        </p>
      </motion.div>
    </div>
  );
};
