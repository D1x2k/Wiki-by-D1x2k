import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGlowEffect } from '../hooks/useGlowEffect';
import { Toast } from '../components/Toast';
import { AnimatedStepsContainer, AnimatedStepItem } from '../components/AnimatedSteps';
import { TabsSwitcher } from '../components/TabsSwitcher';
import unlikeScript from '../scripts/yamUnlike.js?raw';
import likeScript from '../scripts/yamLike.js?raw';

const MultilineCodeCard = ({ code, onCopy, expandable = false }: { code: string, onCopy: () => void, expandable?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const [justCopied, setJustCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      onCopy();
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1200);
    }).catch(err => {
      console.error('Ошибка копирования: ', err);
    });
  };

  return (
    <div 
      className={`glow-card ${justCopied ? 'copy-success-glow' : ''}`} 
      style={{ 
        position: 'relative', 
        zIndex: 2,
        background: '#040404', 
        borderRadius: '12px', 
        marginTop: '14px', 
        overflow: 'hidden', 
        transition: 'all 0.3s ease', 
        border: '1px solid rgba(255, 255, 255, 0.04)',
        cursor: 'pointer'
      }}
      onClick={handleCopy}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        maxHeight: isExpanded ? '2000px' : '220px', 
        overflowY: 'hidden', 
        padding: '18px 20px', 
        paddingBottom: expandable ? '48px' : '18px', 
        paddingRight: expandable ? '20px' : '120px', 
        fontFamily: 'var(--font-mono)', 
        fontSize: '13px', 
        color: '#e4e4e7', 
        whiteSpace: 'pre-wrap', 
        lineHeight: '1.6', 
        transition: 'max-height 0.4s ease',
        userSelect: 'none'
      }}>
        {code}
      </div>
      
      {expandable && !isExpanded && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to top, #040404 20%, transparent)',
          pointerEvents: 'none'
        }} />
      )}

      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        {expandable && (
          <button 
            type="button"
            onClick={(e) => { 
              e.stopPropagation(); 
              setIsExpanded(!isExpanded); 
            }} 
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-secondary)',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
          >
            {isExpanded ? t('terminal.collapse') : t('terminal.expand')}
          </button>
        )}
        <button 
          type="button"
          onClick={(e) => { 
            e.stopPropagation(); 
            handleCopy(); 
          }} 
          style={{
            background: isHovered ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            border: isHovered ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid rgba(255, 255, 255, 0.04)',
            color: isHovered ? '#d8b4fe' : 'var(--text-secondary)',
            boxShadow: isHovered ? '0 0 10px rgba(168, 85, 247, 0.2)' : 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s'
          }}
        >
          {t('terminal.copy')}
        </button>
      </div>
    </div>
  );
};

export const YandexMusicGuide = () => {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'unlike' | 'like'>('unlike');
  const toastTimeoutRef = useRef<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('yandex_music.title')} | Wiki by D1x2k`;
  }, [t]);

  useScrollReveal();
  useGlowEffect();

  const handleCopy = () => {
    setShowToast(false);
    setTimeout(() => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      setShowToast(true);
      toastTimeoutRef.current = window.setTimeout(() => setShowToast(false), 1800);
    }, 10);
  };

  return (
    <>
      <div className="glow-bg"></div>

      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span>{t('nav.back')}</span>
        </Link>
          
        <div className="welcome-screen scroll-reveal" style={{ minHeight: 'auto', paddingTop: '3vh', paddingBottom: '3vh' }}>
          <header className="hero no-select">
            <h1 className="text-gradient-animated" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>🎵 {t('yandex_music.title')}</h1>
            <p className="hero-tagline" style={{ marginTop: '12px' }}>{t('yandex_music.subtitle')}</p>
          </header>
        </div>

        <section id="guide-content" className="scroll-reveal content-section" style={{ minHeight: '60vh' }}>
          
          {/* Переключатель вкладок */}
          <TabsSwitcher
            activeTab={activeTab}
            onChange={setActiveTab}
            layoutId="yandexMusicTabs"
            tabs={[
              { id: 'unlike', label: t('yandex_music.tabs.unlike') },
              { id: 'like', label: t('yandex_music.tabs.like') },
            ]}
          />

          {activeTab === 'unlike' && (
            <div className="tab-content" style={{ animation: 'fade-in 0.3s ease-out' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2>{t('yandex_music.unlike.title')}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginTop: '8px' }}>
                  {t('yandex_music.unlike.desc')}
                </p>
              </div>

              <AnimatedStepsContainer>
                <AnimatedStepItem>
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="yandex_music.unlike.step1">
                        Откройте веб-версию <a href="https://music.yandex.ru" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-soft)', fontWeight: 'bold' }}>Яндекс Музыки</a> и перейдите в раздел <strong>Коллекция → Мне нравится</strong>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>

                <AnimatedStepItem>
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="yandex_music.unlike.step2">
                        Откройте консоль разработчика: нажмите клавишу <strong>F12</strong> (или <strong>Ctrl + Shift + I</strong>) и выберите вкладку <strong>Console</strong>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>

                <AnimatedStepItem>
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="yandex_music.unlike.step3">
                        Если браузер блокирует вставку, введите в консоль команду <span className="inline-code">allow pasting</span> (или <span className="inline-code">разрешить вставку</span>) и нажмите <strong>Enter</strong>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>

                <AnimatedStepItem>
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <div className="step-title-main" style={{ marginBottom: '16px' }}>
                      <Trans i18nKey="yandex_music.unlike.step4">
                        Скопируйте скрипт ниже, вставьте в консоль и нажмите <strong>Enter</strong>.
                      </Trans>
                    </div>
                    <MultilineCodeCard code={unlikeScript} onCopy={handleCopy} expandable={true} />
                  </div>
                </AnimatedStepItem>
              </AnimatedStepsContainer>
            </div>
          )}

          {activeTab === 'like' && (
            <div className="tab-content" style={{ animation: 'fade-in 0.3s ease-out' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2>{t('yandex_music.like.title')}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginTop: '8px' }}>
                  {t('yandex_music.like.desc')}
                </p>
              </div>

              <AnimatedStepsContainer>
                <AnimatedStepItem>
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="yandex_music.like.step1">
                        Откройте веб-версию <a href="https://music.yandex.ru" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-soft)', fontWeight: 'bold' }}>Яндекс Музыки</a> и откройте <strong>плейлист или альбом</strong>, треки из которого хотите добавить.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>

                <AnimatedStepItem>
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="yandex_music.like.step2">
                        Откройте консоль разработчика: нажмите клавишу <strong>F12</strong> (или <strong>Ctrl + Shift + I</strong>) и выберите вкладку <strong>Console</strong>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>

                <AnimatedStepItem>
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="yandex_music.like.step3">
                        Если браузер блокирует вставку, введите в консоль команду <span className="inline-code">allow pasting</span> (или <span className="inline-code">разрешить вставку</span>) и нажмите <strong>Enter</strong>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>

                <AnimatedStepItem>
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <div className="step-title-main" style={{ marginBottom: '16px' }}>
                      <Trans i18nKey="yandex_music.like.step4">
                        Скопируйте скрипт ниже, вставьте в консоль и нажмите <strong>Enter</strong>.
                      </Trans>
                    </div>
                    <MultilineCodeCard code={likeScript} onCopy={handleCopy} expandable={true} />
                  </div>
                </AnimatedStepItem>
              </AnimatedStepsContainer>
            </div>
          )}

        </section>

        <footer className="scroll-reveal">
          <div>v2.0.0</div>
          <div>Guide by D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k</div>
          <div>&copy; 2026 Instructions. D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k dev.</div>
        </footer>

        <div className="scroll-spacer"></div>
      </div>

      <Toast show={showToast} />
    </>
  );
};
