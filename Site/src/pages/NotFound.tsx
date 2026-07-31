import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFound: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="welcome-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          textAlign: 'center'
        }}
      >
        <div
          className="text-gradient-animated"
          style={{
            fontSize: '140px',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            textShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
            userSelect: 'none'
          }}
        >
          404
        </div>
        
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          letterSpacing: '-0.02em',
          color: '#ffffff'
        }}>
          {t('notfound.title')}
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)',
          fontSize: '16px',
          maxWidth: '400px',
          lineHeight: 1.6,
          marginBottom: '20px'
        }}>
          {t('notfound.desc')}
        </p>

        <motion.button 
          onClick={() => navigate('/')}
          className="action-btn glow-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            width: 'auto', 
            padding: '16px 32px',
            background: 'rgba(168, 85, 247, 0.1)',
            borderColor: 'rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
          }}
        >
          <span className="btn-text" style={{ color: '#d8b4fe' }}>
            {t('notfound.button')}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

