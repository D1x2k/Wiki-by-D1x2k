import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const ZapretGuide = () => {
  const { t } = useTranslation();
  const downloadSteps = t('dashboard.zapret_guide.download.steps', { returnObjects: true }) as string[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {t('dashboard.zapret_guide.intro')}
      </p>

      {/* 1. Download Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.zapret_guide.download.title')}
        </h3>
        <ol style={{ paddingLeft: '20px', margin: '16px 0 24px 0', color: 'var(--text-secondary)' }}>
          {Array.isArray(downloadSteps) && downloadSteps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>
        
        <a 
          href={t('dashboard.zapret_guide.download.link')}
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: '#d8b4fe',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'all 0.2s',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.25)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.15)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.1)';
          }}
        >
          {t('dashboard.zapret_guide.download.link')}
        </a>
      </motion.div>

      {/* 2. Run Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.zapret_guide.run.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{t('dashboard.zapret_guide.run.desc')}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#a855f7', fontWeight: 'bold', fontFamily: 'monospace' }}>general (ALT, FAKE...).bat</span>
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('dashboard.zapret_guide.run.general')}
            </p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#a855f7', fontWeight: 'bold', fontFamily: 'monospace' }}>service.bat</span>
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('dashboard.zapret_guide.run.service')}
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', borderRadius: '4px', color: '#fef08a', fontSize: '14px' }}>
          {t('dashboard.zapret_guide.run.note')}
        </div>
      </motion.div>

      {/* 3. Custom Domains Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.zapret_guide.custom.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{t('dashboard.zapret_guide.custom.desc')}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#3b82f6', fontWeight: 'bold', fontFamily: 'monospace' }}>list-general-user.txt</span>
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('dashboard.zapret_guide.custom.general_txt')}
            </p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#ef4444', fontWeight: 'bold', fontFamily: 'monospace' }}>list-exclude-user.txt</span>
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('dashboard.zapret_guide.custom.exclude_txt')}
            </p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#10b981', fontWeight: 'bold', fontFamily: 'monospace' }}>ipset-all.txt</span>
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('dashboard.zapret_guide.custom.ipset_txt')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
