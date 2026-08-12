import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TerminalCard } from './TerminalCard';

export const DNSGuide = () => {
  const { t } = useTranslation();
  const win11Steps = t('dashboard.dns_guide.win11.steps', { returnObjects: true }) as string[];
  const win10Steps = t('dashboard.dns_guide.win10.steps', { returnObjects: true }) as string[];
  const browserSteps = t('dashboard.dns_guide.browser.steps', { returnObjects: true }) as string[];

  const renderCopyable = (text: string, labelColor: string) => {
    const parts = text.split(': ');
    if (parts.length < 2) return <div style={{ color: labelColor, fontWeight: 'bold' }}>{text}</div>;
    
    const label = parts[0];
    const value = parts.slice(1).join(': ');

    return (
      <div style={{ marginBottom: '12px' }}>
        <div style={{ color: labelColor, fontWeight: 'bold', marginBottom: '8px' }}>{label}:</div>
        <TerminalCard 
          command={value} 
          hidePrefix={true}
          style={{ marginTop: 0 }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {t('dashboard.dns_guide.intro')}
      </p>

      {/* Windows 11 Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.dns_guide.win11.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{t('dashboard.dns_guide.win11.desc')}</p>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          {renderCopyable(t('dashboard.dns_guide.win11.primary'), '#a855f7')}
          {renderCopyable(t('dashboard.dns_guide.win11.secondary'), '#a855f7')}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '16px 0' }}></div>
          {renderCopyable(t('dashboard.dns_guide.win11.doh'), '#10b981')}
        </div>

        <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)' }}>
          {Array.isArray(win11Steps) && win11Steps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>
      </motion.div>

      {/* Windows 10 Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.dns_guide.win10.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{t('dashboard.dns_guide.win10.desc')}</p>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          {renderCopyable(t('dashboard.dns_guide.win10.primary'), '#a855f7')}
          {renderCopyable(t('dashboard.dns_guide.win10.secondary'), '#a855f7')}
        </div>

        <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)' }}>
          {Array.isArray(win10Steps) && win10Steps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>
      </motion.div>

      {/* Browser Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.dns_guide.browser.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{t('dashboard.dns_guide.browser.desc')}</p>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          {renderCopyable(t('dashboard.dns_guide.browser.doh'), '#10b981')}
        </div>

        <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)' }}>
          {Array.isArray(browserSteps) && browserSteps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
};
