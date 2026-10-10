import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const DomainNoticePill = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const domain = 'wiki-by-d1x2k.ru';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(domain).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div 
      className="domain-header-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="domain-header-pill"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCopy}
      >
        <span className="domain-pill-dot" />
        
        <svg 
          className="domain-pill-globe" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        <span className="domain-pill-badge">
          {t('domain_pill.badge')}
        </span>

        <span className="domain-pill-domain">
          {copied ? (
            <span className="domain-pill-copied-text">
              ✓ {t('domain_pill.copied')}
            </span>
          ) : (
            domain
          )}
        </span>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="domain-custom-tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <span>{t('domain_pill.tooltip_text')}</span>
            <span className="domain-tooltip-sub">{copied ? `✓ ${t('domain_pill.copied')}` : t('domain_pill.tooltip_sub')}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
