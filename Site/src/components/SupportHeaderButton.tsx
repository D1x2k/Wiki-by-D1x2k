import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const SupportHeaderButton = () => {
  const { t } = useTranslation();

  return (
    <motion.a
      href="https://pay.cloudtips.ru/p/7d8930d9"
      target="_blank"
      rel="noopener noreferrer"
      className="support-header-btn"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      title={t('support.button', 'Поддержать проект')}
    >
      <span className="support-header-icon">❤️</span>
      <span className="support-header-text">{t('support.header_button', 'Поддержать')}</span>
      <span className="support-header-arrow">↗</span>
    </motion.a>
  );
};
