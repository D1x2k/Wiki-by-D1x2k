import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGlowEffect } from '../hooks/useGlowEffect';
import { Toast } from '../components/Toast';
import { AnimatedStepsContainer, AnimatedStepItem } from '../components/AnimatedSteps';
import { SmartTooltip } from '../components/SmartTooltip';

const MultilineCodeCard = ({ code, onCopy, expandable = false }: { code: string, onCopy: () => void, expandable?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const [justCopied, setJustCopied] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={`glow-card ${justCopied ? 'copy-success-glow' : ''}`} style={{ 
      position: 'relative', 
      background: '#040404', 
      borderRadius: '12px', 
      marginTop: '14px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.04)'
    }}>
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
        transition: 'max-height 0.4s ease'
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
          <button onClick={() => setIsExpanded(!isExpanded)} style={{
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
        <button onClick={() => { 
          navigator.clipboard.writeText(code); 
          onCopy(); 
          setJustCopied(true);
          setTimeout(() => setJustCopied(false), 1200);
        }} style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          color: 'var(--text-secondary)',
          padding: '6px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
        >{t('terminal.copy')}</button>
      </div>
    </div>
  );
};

export const CloudflareGuide = () => {
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);
  const { t } = useTranslation();

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
      toastTimeoutRef.current = window.setTimeout(() => setShowToast(false), 1800);
    }, 10);
  };

  const domainList = `cloudflare-ech.com
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
cloudflare-dns.com
cloudflare-esni.com
cloudflare-gateway.com
cloudflare-quic.com
cloudflare.com
cloudflare.net
cloudflare.tv
cloudflareaccess.com
cloudflareapps.com
cloudflarebolt.com
cloudflareclient.com
cloudflareinsights.com
cloudflareok.com
cloudflarepartners.com
cloudflareportal.com
cloudflarepreview.com
cloudflareresolve.com
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
downloads.cloudflareclient.com`;

  const targetList = `Warp1 = "cloudflarecp.com"
Warp2 = "warp.plus"
Warp3 = "cloudflareaccess.com"
Warp4 = "cloudflare.net"`;

  return (
    <>
      <div className="glow-bg"></div>

      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span>{t('nav.back')}</span>
        </Link>
          
        <div className="welcome-screen scroll-reveal" style={{ minHeight: 'auto', paddingTop: '3vh', paddingBottom: '3vh' }}>
          <header className="hero no-select">
            <h1 className="text-gradient-animated" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{t('cloudflare.title')} <SmartTooltip content={t('cloudflare.tooltip')}>Cloudflare One Client</SmartTooltip></h1>
          </header>
        </div>

        <section id="guide-content" className="scroll-reveal content-section" style={{ minHeight: '60vh' }}>
          
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

            <AnimatedStepItem style={{ alignItems: 'flex-start' }}>
              <div className="step-number" style={{ marginTop: '4px' }}>02</div>
              <div className="step-content">
                <div className="step-title-main" style={{ marginBottom: '16px' }}>
                  <Trans i18nKey="cloudflare.step2.title">
                    Перейдите по пути <span className="inline-code">lists\list-general.txt</span> и вставьте туда следующие домены:
                  </Trans>
                </div>
                <MultilineCodeCard code={domainList} onCopy={handleCopy} expandable={true} />
              </div>
            </AnimatedStepItem>

            <AnimatedStepItem style={{ alignItems: 'flex-start' }}>
              <div className="step-number" style={{ marginTop: '4px' }}>03</div>
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

