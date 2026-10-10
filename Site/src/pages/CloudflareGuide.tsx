import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGlowEffect } from '../hooks/useGlowEffect';
import { Toast } from '../components/Toast';
import { AnimatedStepsContainer, AnimatedStepItem } from '../components/AnimatedSteps';
import { SmartTooltip } from '../components/SmartTooltip';
import { TabsSwitcher } from '../components/TabsSwitcher';
import { TerminalCard } from '../components/TerminalCard';
import { APP_VERSION } from '../config/version';

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
        maxHeight: isExpanded ? '2000px' : '150px', 
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
      
      {/* Плавный градиент затухания снизу при свернутом состоянии */}
      {expandable && !isExpanded && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to top, #040404, transparent)',
          pointerEvents: 'none'
        }} />
      )}

      {/* Кнопки управления (Копировать / Скрыть) */}
      <div style={{
        position: 'absolute',
        bottom: expandable ? '12px' : 'auto',
        top: expandable ? 'auto' : '14px',
        right: '14px',
        display: 'flex',
        gap: '8px',
        zIndex: 2
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

export const CloudflareGuide = () => {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'method1' | 'method2' | 'dns'>('method1');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [highlightedFaq, setHighlightedFaq] = useState<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const { t } = useTranslation();

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    document.title = `${t('cloudflare.title')} Cloudflare One Client | Wiki by D1x2k`;
  }, [t]);

  useScrollReveal();
  useGlowEffect();

  const handleCopy = () => {
    setShowToast(false);
    setTimeout(() => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      setShowToast(true);
      toastTimeoutRef.current = window.setTimeout(() => {
        setShowToast(false);
      }, 1800);
    }, 10);
  };

  const domainList = `cf-assets.www.cloudflare.com
cf-st.sc-cdn.net
challenges.cloudflare.com
client.warp.plus
cloudflare-dns.com
cloudflare-ech.com
cloudflare-gateway.com
cloudflare-quic.com
cloudflare.com
cloudflare.net
cloudflareaccess.com
cloudflareclient.com
cloudflareinsights.com
cloudflareok.com
cloudflareportal.com
cloudflarepreview.com
cloudflaressl.com
cloudflarestatus.com
cloudflarestorage.com
cloudflarestream.com
cloudflaretest.com
cloudflarewarp.com
every1dns.net
isbgpsafeyet.com
one.one.one.one
one.one.one
pacloudflare.com
pages.dev
trycloudflare.com
videodelivery.net
warp.plus
workers.dev
cloudflarecp.com
downloads.cloudflareclient.com
signin.aws.amazon.com
cloudfront.net
s3.amazonaws.com
awsstatic.com
console.aws.a2z.com
amazonaws.com
awsapps.com
sso.amazonaws.com
argotunnel.com
cfargotunnel.com
cfl.re
cloudflare-esni.com
cloudflare.tv
cloudflareapps.com
cloudflarebolt.com
cloudflarepartners.com
cloudflareresolve.com`;

  const targetList = `Warp1 = "cloudflarecp.com"
Warp2 = "warp.plus"
Warp3 = "cloudflareaccess.com"
Warp4 = "cloudflare.net"`;

  const allMethod2Commands = `warp-cli registration delete
warp-cli registration new
warp-cli tunnel protocol set MASQUE
warp-cli tunnel masque-options set h2-only`;

  const dohAddress = 'https://xbox-dns.ru/dns-query';

  const faqItems = [
    {
      qKey: 'cloudflare.faq.q2',
      aKey: 'cloudflare.faq.a2',
      defaultA: 'После всех проделанных действий обязательно <strong>рекомендую перезагрузить ПК!</strong> Это нужно для корректного применения настроек сети.',
    },
    {
      qKey: 'cloudflare.faq.q1',
      aKey: 'cloudflare.faq.a1',
      defaultA: 'Если после выполнения всех действий ничего не меняется, значит <strong>блокирует провайдер!</strong> К сожалению, такую блокировку обойти никак нельзя.',
    },
    {
      qKey: 'cloudflare.faq.q3',
      aKey: 'cloudflare.faq.a3',
      defaultA: 'Если вас подключает на <strong>российские серверы</strong>, то <strong>ИИ работать не будут!</strong> А также TikTok и некоторые зарубежные сервисы. Проверить, в какую страну и на какой сервер вас подключило, можно на сайте <1>2ip.io</1>.',
    },
    {
      qKey: 'cloudflare.faq.q4',
      aKey: 'cloudflare.faq.a4',
      defaultA: 'Изменить сервер, куда подключается Cloudflare One Client, <strong>НЕЛЬЗЯ!</strong> Если закинуло на <strong>российский сервер</strong> — или пользуйтесь на российских серверах (большинство заблокированных сайтов будут работать), или меняйте прогу.',
    },
    {
      qKey: 'cloudflare.faq.q5',
      aKey: 'cloudflare.faq.a5',
      defaultA: 'Версию <strong>zapret</strong> скачивайте только актуальную. В ней есть все файлы из видео!',
    },
  ];

  const openAndScrollToFaq = (faqKey: string) => {
    const idx = faqItems.findIndex((item) => item.qKey === faqKey);
    if (idx !== -1) {
      setOpenFaq(idx);
      setHighlightedFaq(idx);
      setTimeout(() => {
        const el = document.getElementById(`faq-item-${idx}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      setTimeout(() => {
        setHighlightedFaq(null);
      }, 2200);
    } else {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="glow-bg"></div>

      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span>{t('nav.back')}</span>
        </Link>
          
        <div className="welcome-screen scroll-reveal" style={{ minHeight: 'auto', paddingTop: '16px', paddingBottom: '0', gap: '14px' }}>
          <header className="hero no-select" style={{ marginBottom: '0' }}>
            <h1 className="text-gradient-animated" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '0 0 16px 0' }}>
              {t('cloudflare.title')} <SmartTooltip content={t('cloudflare.tooltip')}>Cloudflare One Client</SmartTooltip>
            </h1>
          </header>

          <TabsSwitcher
            activeTab={activeTab}
            onChange={setActiveTab}
            layoutId="cloudflareTabs"
            tabs={[
              { id: 'method1', label: t('cloudflare.tabs.method1') },
              { id: 'method2', label: t('cloudflare.tabs.method2') },
              { id: 'dns', label: t('cloudflare.tabs.dns') },
            ]}
          />

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('faq');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="faq-quick-hint-btn"
          >
            <span className="faq-hint-icon">💡</span>
            <span>{t('cloudflare.faq.quick_link')}</span>
          </button>
        </div>

        <section id="guide-content" className="scroll-reveal content-section" style={{ minHeight: 'auto', paddingTop: '8px', gap: '32px' }}>
          
          {activeTab === 'method1' && (
            <AnimatedStepsContainer>
              <AnimatedStepItem>
                <div className="step-number">01</div>
                <div className="step-content">
                  <div className="step-title-main">
                    <Trans i18nKey="cloudflare.step1.title">
                      Скачайте и распакуйте программу <a href="https://github.com/Flowseal/zapret-discord-youtube/releases" target="_blank" rel="noreferrer" style={{ color: 'inherit', fontWeight: 'bold' }}>zapret discord youtube</a>.
                    </Trans>
                  </div>
                </div>
              </AnimatedStepItem>

              <AnimatedStepItem>
                <span className="step-badge-yellow-corner">
                  <span className="step-badge-yellow-dot" />
                  <span>{t('cloudflare.step2.badge_new')}</span>
                </span>
                <div className="step-number">02</div>
                <div className="step-content">
                  <div className="step-title-main step-title-has-badge" style={{ marginBottom: '16px' }}>
                    <Trans i18nKey="cloudflare.step2.title">
                      Перейдите по пути <span className="inline-code">lists\list-general.txt</span> и вставьте туда следующие домены:
                    </Trans>
                  </div>
                  <MultilineCodeCard code={domainList} onCopy={handleCopy} expandable={true} />
                </div>
              </AnimatedStepItem>

              <AnimatedStepItem>
                <div className="step-number">03</div>
                <div className="step-content">
                  <div className="step-title-main" style={{ marginBottom: '16px' }}>
                    <Trans i18nKey="cloudflare.step3.title">
                      Перейдите в <span className="inline-code">utils/target.txt</span> и вставьте следующие строки:
                    </Trans>
                  </div>
                  <MultilineCodeCard code={targetList} onCopy={handleCopy} expandable={false} />
                </div>
              </AnimatedStepItem>
            </AnimatedStepsContainer>
          )}

          {activeTab === 'method2' && (
            <AnimatedStepsContainer>
              <AnimatedStepItem>
                <div className="step-number">01</div>
                <div className="step-content">
                  <div className="step-title-main" style={{ marginBottom: '8px' }}>
                    {t('cloudflare.method2.step1_title')}
                  </div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    <Trans
                      i18nKey="cloudflare.method2.step1_desc"
                      components={{
                        strong: <strong />,
                        1: (
                          <a
                            href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#d8b4fe', fontWeight: 600, textDecoration: 'underline' }}
                          >
                            Cloudflare Developers ↗
                          </a>
                        ),
                      }}
                    >
                      Перейдите на официальный сайт Cloudflare Developers и скачайте более старую версию приложения (откройте вкладку <strong>Previous version history</strong>, она находится чуть ниже Latest release).
                    </Trans>
                  </div>
                  <a
                    href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="method-link-btn"
                  >
                    <span>Cloudflare One Client — Previous versions</span>
                    <span>↗</span>
                  </a>
                </div>
              </AnimatedStepItem>

              <AnimatedStepItem>
                <div className="step-number">02</div>
                <div className="step-content">
                  <div className="step-title-main" style={{ marginBottom: '8px' }}>
                    {t('cloudflare.method2.step2_title')}
                  </div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '14px' }}>
                    <Trans
                      i18nKey="cloudflare.method2.step2_desc"
                      components={{
                        strong: <strong />,
                        1: <span className="inline-code" />,
                      }}
                    >
                      Откройте <span className="inline-code">Командную строку (cmd)</span> <strong>от имени Администратора</strong> и выполните следующие команды по очереди:
                    </Trans>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        {t('cloudflare.method2.cmd1_comment')}
                      </div>
                      <TerminalCard style={{ marginTop: 0 }} command="warp-cli registration delete" onCopy={handleCopy} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        {t('cloudflare.method2.cmd2_comment')}
                      </div>
                      <TerminalCard style={{ marginTop: 0 }} command="warp-cli registration new" onCopy={handleCopy} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        {t('cloudflare.method2.cmd3_comment')}
                      </div>
                      <TerminalCard style={{ marginTop: 0 }} command="warp-cli tunnel protocol set MASQUE" onCopy={handleCopy} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        {t('cloudflare.method2.cmd4_comment')}
                      </div>
                      <TerminalCard style={{ marginTop: 0 }} command="warp-cli tunnel masque-options set h2-only" onCopy={handleCopy} />
                    </div>
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      {t('cloudflare.method2.all_cmds_label')}
                    </div>
                    <MultilineCodeCard code={allMethod2Commands} onCopy={handleCopy} expandable={false} />
                  </div>
                </div>
              </AnimatedStepItem>

              <AnimatedStepItem>
                <div className="step-number">03</div>
                <div className="step-content">
                  <div className="step-title-main" style={{ marginBottom: '8px' }}>
                    {t('cloudflare.method2.step3_title')}
                  </div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    <Trans
                      i18nKey="cloudflare.method2.step3_desc"
                      components={{
                        strong: <strong />,
                      }}
                    >
                      После применения команд полностью <strong>перезапустите Cloudflare WARP</strong> и попробуйте подключиться снова.
                    </Trans>
                  </div>

                  <div
                    className="security-box"
                    style={{
                      marginTop: '16px',
                      padding: '14px 16px',
                      borderStyle: 'solid',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.005) 100%), #040404',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      zIndex: 2,
                    }}
                    onClick={() => openAndScrollToFaq('cloudflare.faq.q1')}
                  >
                    <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                      <Trans
                        i18nKey="cloudflare.method2.faq_hint"
                        components={{
                          strong: <strong />,
                          1: (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openAndScrollToFaq('cloudflare.faq.q1');
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#d8b4fe',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                padding: 0,
                                font: 'inherit',
                                fontWeight: 600,
                              }}
                            >
                              «После проделанных действий ничего не меняется?»
                            </button>
                          ),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </AnimatedStepItem>
            </AnimatedStepsContainer>
          )}

          {activeTab === 'dns' && (
            <AnimatedStepsContainer>
              <div className="dns-intro-card glow-card">
                <div className="dns-intro-header">
                  <h3 className="dns-intro-title">
                    <span>🌐</span> {t('cloudflare.dns.title')}
                  </h3>
                  <a
                    href="https://xbox-dns.ru/#setup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dns-intro-link"
                  >
                    <span>xbox-dns.ru</span>
                    <span>↗</span>
                  </a>
                </div>
                <p className="dns-intro-desc">
                  <Trans i18nKey="cloudflare.dns.desc" components={{ strong: <strong /> }} />
                </p>
              </div>

              <AnimatedStepItem>
                <div className="step-number">01</div>
                <div className="step-content">
                  <div className="step-title-main" style={{ marginBottom: '8px' }}>
                    {t('cloudflare.dns.chromium_title')}
                  </div>
                  <ol className="dns-instructions-list">
                    <li>
                      <Trans i18nKey="cloudflare.dns.chromium_step1" components={{ strong: <strong /> }} />
                    </li>
                    <li>
                      <Trans i18nKey="cloudflare.dns.chromium_step2" components={{ strong: <strong /> }} />
                    </li>
                    <li>
                      <Trans i18nKey="cloudflare.dns.chromium_step3" components={{ strong: <strong /> }} />
                    </li>
                    <li>
                      <Trans i18nKey="cloudflare.dns.chromium_step4" components={{ strong: <strong /> }} />
                    </li>
                  </ol>
                  <TerminalCard style={{ marginTop: '12px' }} command={dohAddress} onCopy={handleCopy} />
                </div>
              </AnimatedStepItem>

              <AnimatedStepItem>
                <div className="step-number">02</div>
                <div className="step-content">
                  <div className="step-title-main" style={{ marginBottom: '8px' }}>
                    {t('cloudflare.dns.firefox_title')}
                  </div>
                  <ol className="dns-instructions-list">
                    <li>
                      <Trans i18nKey="cloudflare.dns.firefox_step1" components={{ strong: <strong /> }} />
                    </li>
                    <li>
                      <Trans i18nKey="cloudflare.dns.firefox_step2" components={{ strong: <strong /> }} />
                    </li>
                    <li>
                      <Trans i18nKey="cloudflare.dns.firefox_step3" components={{ strong: <strong /> }} />
                    </li>
                    <li>
                      <Trans i18nKey="cloudflare.dns.firefox_step4" components={{ strong: <strong /> }} />
                    </li>
                  </ol>
                  <TerminalCard style={{ marginTop: '12px' }} command={dohAddress} onCopy={handleCopy} />
                </div>
              </AnimatedStepItem>
            </AnimatedStepsContainer>
          )}

          {/* Секция FAQ */}
          <div id="faq" className="faq-section" style={{ scrollMarginTop: '80px' }}>
            <h2 className="faq-title">
              <span>❓</span> {t('cloudflare.faq.title')}
            </h2>
            <div className="faq-list">
              {faqItems.map((item, idx) => {
                const isOpen = openFaq === idx;
                const isHighlighted = highlightedFaq === idx;
                return (
                  <div
                    key={idx}
                    id={`faq-item-${idx}`}
                    className={`faq-item ${isOpen ? 'open' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                    style={{ scrollMarginTop: '100px' }}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{t(item.qKey)}</span>
                      <span className="faq-chevron">▼</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="faq-answer">
                            <Trans
                              i18nKey={item.aKey}
                              components={{
                                strong: <strong />,
                                1: (
                                  <a
                                    href="https://2ip.io/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="faq-inline-link"
                                  >
                                    2ip.io ↗
                                  </a>
                                ),
                              }}
                            >
                              {item.defaultA}
                            </Trans>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* YouTube блок под FAQ */}
            <div className="faq-yt-footer">
              <div className="faq-yt-left">
                <svg width="22" height="16" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 2.616a3.016 3.016 0 0 0-2.122-2.136C19.505 0 12 0 12 0S4.495 0 2.624.48A3.016 3.016 0 0 0 .502 2.617C0 4.51 0 8.48 0 8.48s0 3.97.502 5.863a3.016 3.016 0 0 0 2.122 2.136C4.495 16.96 12 16.96 12 16.96s7.505 0 9.376-.481a3.016 3.016 0 0 0 2.122-2.136c.502-1.893.502-5.863.502-5.863s0-3.97-.502-5.864z" fill="#FF0000"/>
                  <path d="M9.6 12.114l6.24-3.634-6.24-3.635v7.269z" fill="#FFFFFF"/>
                </svg>
                <span className="faq-yt-text">{t('cloudflare.faq.yt_label')}</span>
              </div>
              <a
                href="https://www.youtube.com/@D1x2k-"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-yt-btn"
              >
                <span>D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k</span>
                <span>↗</span>
              </a>
            </div>
          </div>

        </section>

        <footer className="scroll-reveal">
          <div>{APP_VERSION}</div>
          <div>Guide by D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k</div>
          <div>&copy; 2026 Instructions. D1<span style={{ fontFamily: 'Arial, sans-serif' }}>x</span>2k dev.</div>
        </footer>

        <div className="scroll-spacer"></div>
      </div>

      <Toast show={showToast} />
    </>
  );
};
