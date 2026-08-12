import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const CloudflareGuide = () => {
  const { t } = useTranslation();
  
  const downloadSteps = t('dashboard.cloudflare_guide.download.steps', { returnObjects: true }) as string[];
  const setupSteps = t('dashboard.cloudflare_guide.setup.steps', { returnObjects: true }) as string[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {t('dashboard.cloudflare_guide.intro')}
      </p>

      {/* 1. Download Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.cloudflare_guide.download.title')}
        </h3>
        
        <ol style={{ paddingLeft: '20px', margin: '16px 0', color: 'var(--text-secondary)' }}>
          {Array.isArray(downloadSteps) && downloadSteps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>

        <a 
          href={t('dashboard.cloudflare_guide.download.link')}
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
          {t('dashboard.cloudflare_guide.download.link')}
        </a>
      </motion.div>

      {/* 2. Setup Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.cloudflare_guide.setup.title')}
        </h3>
        
        <ol style={{ paddingLeft: '20px', margin: '16px 0 0 0', color: 'var(--text-secondary)' }}>
          {Array.isArray(setupSteps) && setupSteps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: (idx === 1 || idx === 2) ? '16px' : '8px' }}>
              <div>{step}</div>
              {idx === 1 && (
                <div style={{ marginTop: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={`${import.meta.env.BASE_URL}images/Cloudflare.png`}
                    alt="Cloudflare Setup Options" 
                    style={{ 
                      width: '100%', 
                      maxWidth: '500px', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }} 
                  />
                </div>
              )}
              {idx === 2 && (
                <div style={{ marginTop: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={`${import.meta.env.BASE_URL}images/cf-connect.png`}
                    alt="Cloudflare Connect" 
                    style={{ 
                      width: '100%', 
                      maxWidth: '500px', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }} 
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
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
          {t('dashboard.cloudflare_guide.troubleshooting.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          {t('dashboard.cloudflare_guide.troubleshooting.desc')}
        </p>

        <div style={{ marginTop: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={`${import.meta.env.BASE_URL}images/cf-error.png`}
            alt="Cloudflare Connection Error" 
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }} 
          />
        </div>

        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          {t('dashboard.cloudflare_guide.troubleshooting.fix_text')}
          <a 
            href={t('dashboard.cloudflare_guide.troubleshooting.fix_link_url')} 
            style={{ color: '#60a5fa', textDecoration: 'underline' }}
          >
            {t('dashboard.cloudflare_guide.troubleshooting.fix_link_text')}
          </a>.
        </p>
      </motion.div>
    </div>
  );
};
