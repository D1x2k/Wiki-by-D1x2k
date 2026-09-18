import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackType = 'idea' | 'bug' | 'other';
type FormState = 'idle' | 'submitting' | 'success' | 'error';

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const { t } = useTranslation();
  const [type, setType] = useState<FeedbackType>('idea');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [state, setState] = useState<FormState>('idle');

  // Escape для закрытия + блокировка прокрутки фона
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (state !== 'success') return;
    const timer = window.setTimeout(() => {
      setState('idle');
      setMessage('');
      setContact('');
      setType('idea');
      onClose();
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [state, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || state === 'submitting') return;

    setState('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '351a74c1-94ea-4e56-81ec-2b2f14c3cb1f',
          subject: `Новое обращение с Wiki (Тема: ${t(`feedback.types.${type}`)})`,
          from_name: 'Предложка Wiki by D1x2k',
          'Тема обращения': t(`feedback.types.${type}`),
          'Текст сообщения': message,
          'Контакт для связи': contact || 'Не указан',
        }),
      });

      setState(response.ok ? 'success' : 'error');
    } catch (error) {
      console.error('Network error during form submission', error);
      setState('error');
    }
  };

  const canSubmit = state !== 'submitting' && message.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
          />
          <motion.div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={t('feedback.title')}
            initial={{ opacity: 0, y: -28, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              type="button"
              onClick={onClose}
              className="modal-close"
              aria-label={t('feedback.close')}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              &times;
            </motion.button>

            <h2 className="modal-title">
              {t('feedback.title')}
            </h2>
            <p className="modal-desc">
              {t('feedback.desc')}
            </p>

            {state === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="modal-success"
              >
                <span style={{ fontSize: '24px' }}>🎉</span>
                <span>{t('feedback.success')}</span>
              </motion.div>
            ) : state === 'error' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="modal-error"
              >
                <span style={{ fontSize: '24px' }}>⚠️</span>
                <span>{t('feedback.error')}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-field">
                  <label className="form-label">{t('feedback.type_label')}</label>
                  <div className="form-types">
                    {(['idea', 'bug', 'other'] as const).map((opt) => {
                      const isActive = type === opt;
                      return (
                        <motion.button
                          key={opt}
                          type="button"
                          onClick={() => setType(opt)}
                          className={`type-btn ${isActive ? 'active' : ''}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeFeedbackType"
                              className="type-btn-active-bg"
                              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                            />
                          )}
                          <span className="type-btn-text">{t(`feedback.types.${opt}`)}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="form-label">
                    {t('feedback.message_label')}
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('feedback.message_placeholder')}
                    required
                    className="form-textarea custom-scrollbar"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact" className="form-label">
                    {t('feedback.contact_label')}
                  </label>
                  <input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t('feedback.contact_placeholder')}
                    className="form-input"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={!canSubmit}
                  whileHover={canSubmit ? { scale: 1.02, y: -2, boxShadow: '0 8px 32px rgba(168, 85, 247, 0.65)' } : {}}
                  whileTap={canSubmit ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.15 }}
                >
                  {state === 'submitting' ? (
                    <>
                      <motion.span
                        className="spinner"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      />
                      {t('feedback.submitting')}
                    </>
                  ) : (
                    t('feedback.submit')
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
