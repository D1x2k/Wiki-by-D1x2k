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
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <div className="modal-wrapper">
            <motion.div
              className="modal-card glow-card"
              role="dialog"
              aria-modal="true"
              aria-label={t('feedback.title')}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <motion.button
                type="button"
                onClick={onClose}
                className="modal-close"
                aria-label={t('feedback.close')}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </motion.button>

              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-gradient-animated modal-title"
              >
                {t('feedback.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="modal-desc"
              >
                {t('feedback.desc')}
              </motion.p>

              {state === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="modal-success"
                >
                  <span style={{ fontSize: '24px' }}>🎉</span>
                  <span>{t('feedback.success')}</span>
                </motion.div>
              ) : state === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="modal-error"
                >
                  <span style={{ fontSize: '24px' }}>⚠️</span>
                  <span>{t('feedback.error')}</span>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="modal-form"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                  }}
                >
                  <motion.div
                    className="form-field"
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <label className="form-label">{t('feedback.type_label')}</label>
                    <div className="form-types">
                      {(['idea', 'bug', 'other'] as const).map((opt) => (
                        <motion.button
                          key={opt}
                          type="button"
                          onClick={() => setType(opt)}
                          className={`type-btn ${type === opt ? 'active' : ''}`}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {t(`feedback.types.${opt}`)}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="form-field"
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  >
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
                  </motion.div>

                  <motion.div
                    className="form-field"
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  >
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
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="submit-btn"
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    disabled={!canSubmit}
                    whileHover={canSubmit ? { scale: 1.02, y: -2, boxShadow: '0 8px 30px rgba(168, 85, 247, 0.6)' } : {}}
                    whileTap={canSubmit ? { scale: 0.98 } : {}}
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
                </motion.form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
