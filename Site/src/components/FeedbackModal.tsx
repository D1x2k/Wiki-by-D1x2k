import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const { t } = useTranslation();
  const [type, setType] = useState('idea');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '351a74c1-94ea-4e56-81ec-2b2f14c3cb1f',
          subject: `Новое обращение с Wiki (Тема: ${t(`feedback.types.${type}`)})`,
          from_name: 'Предложка Wiki by D1x2k',
          'Тема обращения': t(`feedback.types.${type}`),
          'Текст сообщения': message,
          'Контакт для связи': contact || 'Не указан'
        })
      });

      if (response.status === 200) {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          setIsSuccess(false);
          setMessage('');
          setContact('');
          setType('idea');
          onClose();
        }, 2500);
      } else {
        console.error('Form submission failed');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Network error during form submission', error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 999,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            pointerEvents: 'none'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                pointerEvents: 'auto',
                width: '90%',
                maxWidth: '520px',
                background: 'rgba(15, 15, 20, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.15)',
              }}
            >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '24px',
                lineHeight: 1,
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              &times;
            </button>

            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gradient-animated" 
              style={{ margin: '0 0 12px 0', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}
            >
              {t('feedback.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ margin: '0 0 32px 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px', lineHeight: 1.6 }}
            >
              {t('feedback.desc')}
            </motion.p>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '30px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  color: '#34d399',
                  fontWeight: 600,
                  fontSize: '18px'
                }}
              >
                🎉 {t('feedback.success')}
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '13px', color: '#c4b5fd', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {t('feedback.type_label')}
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['idea', 'bug', 'other'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setType(opt)}
                        style={{
                          flex: 1,
                          padding: '12px 8px',
                          background: type === opt ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                          border: type === opt ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          color: type === opt ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontFamily: 'inherit',
                          fontWeight: type === opt ? 600 : 400,
                          transition: 'all 0.2s ease',
                          boxShadow: type === opt ? '0 0 15px rgba(168, 85, 247, 0.2)' : 'none',
                        }}
                      >
                        {t(`feedback.types.${opt}`)}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label htmlFor="message" style={{ fontSize: '13px', color: '#c4b5fd', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {t('feedback.message_label')}
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('feedback.message_placeholder')}
                    required
                    className="custom-scrollbar"
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '16px',
                      color: '#fff',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      resize: 'none',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.2), inset 0 2px 4px rgba(0,0,0,0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
                    }}
                  />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label htmlFor="contact" style={{ fontSize: '13px', color: '#c4b5fd', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {t('feedback.contact_label')}
                  </label>
                  <input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t('feedback.contact_placeholder')}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      color: '#fff',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.2), inset 0 2px 4px rgba(0,0,0,0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
                    }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  disabled={isSubmitting || !message.trim()}
                  whileHover={(!isSubmitting && message.trim()) ? { scale: 1.02, y: -2, boxShadow: '0 8px 25px rgba(168, 85, 247, 0.5)' } : {}}
                  whileTap={(!isSubmitting && message.trim()) ? { scale: 0.98 } : {}}
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #a855f7, #d8b4fe)',
                    border: 'none',
                    borderRadius: '16px',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: (isSubmitting || !message.trim()) ? 'not-allowed' : 'pointer',
                    opacity: (isSubmitting || !message.trim()) ? 0.6 : 1,
                    boxShadow: (isSubmitting || !message.trim()) ? 'none' : '0 4px 15px rgba(168, 85, 247, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} 
                        style={{ width: '18px', height: '18px', border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%' }} 
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
