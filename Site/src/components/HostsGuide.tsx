import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TerminalCard } from './TerminalCard';

export const HostsGuide = () => {
  const { t } = useTranslation();
  const editSteps = t('dashboard.hosts_guide.how_to_edit.steps', { returnObjects: true }) as string[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {t('dashboard.hosts_guide.intro')}
      </p>

      {/* 1. How it works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.hosts_guide.how_it_works.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          {t('dashboard.hosts_guide.how_it_works.desc')}
        </p>
      </motion.div>

      {/* 2. How to Edit Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.hosts_guide.how_to_edit.title')}
        </h3>
        
        <ol style={{ paddingLeft: '20px', margin: '16px 0 24px 0', color: 'var(--text-secondary)' }}>
          {Array.isArray(editSteps) && editSteps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: idx === 0 ? '16px' : '8px' }}>
              <div>{step}</div>
              {idx === 0 && (
                <div style={{ marginTop: '12px', marginBottom: '4px' }}>
                  <div style={{ color: '#60a5fa', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                    {t('dashboard.hosts_guide.how_to_edit.path_label')}
                  </div>
                  <TerminalCard 
                    command="C:\Windows\System32\drivers\etc\hosts" 
                    hidePrefix={true}
                    style={{ marginTop: 0 }}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </motion.div>

      {/* 3. Where to get IPs Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glow-card" 
        style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        <h3 style={{ marginTop: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {t('dashboard.hosts_guide.where_to_get.title')}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {t('dashboard.hosts_guide.where_to_get.desc')}
        </p>

        <div style={{ marginBottom: '12px' }}>
          <div style={{ color: '#34d399', fontWeight: 'bold', marginBottom: '8px' }}>
            {t('dashboard.hosts_guide.where_to_get.format_title')}
          </div>
          <TerminalCard 
            command={t('dashboard.hosts_guide.where_to_get.format_example')} 
            hidePrefix={true}
            style={{ marginTop: 0 }}
          />
        </div>
      </motion.div>
    </div>
  );
};
