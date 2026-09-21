import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { TerminalCard } from '../components/TerminalCard';
import { Toast } from '../components/Toast';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGlowEffect } from '../hooks/useGlowEffect';
import { AnimatedStepsContainer, AnimatedStepItem } from '../components/AnimatedSteps';

export const WindowsActivationGuide = () => {
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('windows.title')} | Wiki by D1x2k`;
  }, [t]);

  useScrollReveal();
  useGlowEffect();

  const handleCopy = () => {
    setShowToast(false);
    setTimeout(() => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      setShowToast(true);
      toastTimeoutRef.current = window.setTimeout(() => {
        setShowToast(false);
      }, 1800);
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
            <h1 className="text-gradient-animated">🔑 {t('windows.title')}</h1>
          </header>
        </div>

        <section id="guide-content" className="scroll-reveal content-section" style={{ minHeight: '60vh' }}>
          <div>
            <h2>🛠️ {t('windows.manual.title')}</h2>

            <AnimatedStepsContainer>
              <AnimatedStepItem>
                <div className="step-number">01</div>
                <div className="step-content">
                  <div className="step-title-main">
                    <Trans i18nKey="windows.manual.step1">
                      Откройте <span className="inline-code">Командную строку</span> <b>от имени Администратора</b>.
                    </Trans>
                  </div>
                </div>
              </AnimatedStepItem>
              <AnimatedStepItem>
                <div className="step-number">02</div>
                <div className="step-content">
                  <div className="step-title-main" style={{ marginBottom: '16px' }}>
                    <Trans i18nKey="windows.manual.step2">
                      Скопируйте, вставьте и нажмите <b>Enter</b> для каждой из команд ниже.
                    </Trans>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{t('windows.manual.list1')}</div>
                      <TerminalCard style={{ marginTop: 0 }} command="slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX" onCopy={handleCopy} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{t('windows.manual.list2')}</div>
                      <TerminalCard style={{ marginTop: 0 }} command="slmgr /skms kms.digiboy.ir" onCopy={handleCopy} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{t('windows.manual.list3')}</div>
                      <TerminalCard style={{ marginTop: 0 }} command="slmgr /ato" onCopy={handleCopy} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{t('windows.manual.list4')}</div>
                      <TerminalCard style={{ marginTop: 0 }} command="slmgr /xpr" onCopy={handleCopy} />
                    </div>
                  </div>

                  <div className="security-box" style={{ marginTop: '20px', padding: '16px', borderStyle: 'solid', background: 'rgba(255, 255, 255, 0.005)' }}>
                    <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                      <Trans i18nKey="windows.manual.info">
                        💡 <b>Важно:</b> Ключ в строке по умолчанию настроен на версию <b>Pro</b>. Если у вас установлена другая редакция, просто скопируйте нужный ключ из таблицы ниже и замените им первый блок символов (<span className="inline-code">W269N-...</span>) в команде перед тем, как нажать <b>Enter</b>.
                      </Trans>
                    </div>
                  </div>
                </div>
              </AnimatedStepItem>
            </AnimatedStepsContainer>
          </div>

          <div>
            <h2>📋 {t('windows.manual.table_title')}</h2>
            <div className="table-container glow-card">
              <table className="kms-table">
                <thead>
                  <tr>
                    <th><div className="table-th-content"><span>💻</span> {t('windows.manual.table_edition')}</div></th>
                    <th><div className="table-th-content"><span>🔑</span> {t('windows.manual.table_key')}</div></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Windows 10 / 11 Pro</b></td>
                    <td>
                      <span className="inline-code" style={{ cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText('W269N-WFGWX-YVC9B-4J6C9-T83GX'); handleCopy(); }}>
                        W269N-WFGWX-YVC9B-4J6C9-T83GX
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Windows 10 / 11 Home</b></td>
                    <td>
                      <span className="inline-code" style={{ cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText('TX9XD-98N7V-6WMQ6-BX7FG-H8Q99'); handleCopy(); }}>
                        TX9XD-98N7V-6WMQ6-BX7FG-H8Q99
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Windows 10 / 11 Enterprise</b></td>
                    <td>
                      <span className="inline-code" style={{ cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText('NPPR9-FWDCX-D2C8J-H872K-2YT43'); handleCopy(); }}>
                        NPPR9-FWDCX-D2C8J-H872K-2YT43
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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

