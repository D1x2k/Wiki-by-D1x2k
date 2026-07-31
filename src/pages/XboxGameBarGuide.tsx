import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { TerminalCard } from '../components/TerminalCard';
import { FeatureCard } from '../components/FeatureCard';
import { Toast } from '../components/Toast';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGlowEffect } from '../hooks/useGlowEffect';
import { AnimatedStepsContainer, AnimatedStepItem, AnimatedGroupContainer, AnimatedGroupItem } from '../components/AnimatedSteps';
import { SmartTooltip } from '../components/SmartTooltip';

export const XboxGameBarGuide = () => {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');
  const toastTimeoutRef = useRef<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('xbox.title')} | Wiki by D1x2k`;
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
            <h1 className="text-gradient-animated">🎮 {t('xbox.title')}</h1>
          </header>
        </div>

        <section id="guide-content" className="scroll-reveal content-section" style={{ minHeight: '60vh' }}>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '12px', width: 'fit-content', margin: '0 auto 24px auto' }}>
            <button
              onClick={() => setActiveTab('auto')}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'auto' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === 'auto' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}>
              {t('xbox.tabs.auto')}
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'manual' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === 'manual' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}>
              {t('xbox.tabs.manual')}
            </button>
          </div>

          {activeTab === 'auto' && (
            <div className="tab-content" style={{ animation: 'fade-in 0.3s ease-out' }}>
              <h2>🗑️ {t('xbox.auto.title')}</h2>
              <AnimatedStepsContainer>
                <AnimatedStepItem>
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="xbox.auto.step1">
                        Откройте <span className="inline-code">Командную строку (cmd)</span> <b>от имени Администратора</b>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>
                <AnimatedStepItem style={{ alignItems: 'flex-start' }}>
                  <div className="step-number" style={{ marginTop: '4px' }}>02</div>
                  <div className="step-content">
                    <div className="step-title-main" style={{ marginBottom: '16px' }}>
                      <Trans i18nKey="xbox.auto.step2">
                        Вставьте следующую команду и нажмите <b>Enter</b>:
                      </Trans>
                    </div>
                    <TerminalCard
                      style={{ marginTop: 0 }}
                      command={'powershell "iwr \'https://raw.githubusercontent.com/D1x2k/Wiki-by-D1x2k/main/Delete-gamebar.bat\' -OutF $env:TEMP\\Delete-gamebar.bat; start $env:TEMP\\Delete-gamebar.bat -v runas"'}
                      onCopy={handleCopy}
                    />
                  </div>
                </AnimatedStepItem>
              </AnimatedStepsContainer>

              <div style={{ marginTop: '48px', marginBottom: '48px' }}>
                <h2>🚀 {t('xbox.auto.adv_title')}</h2>
                <AnimatedGroupContainer className="features-grid">
                  <AnimatedGroupItem style={{ height: '100%' }}>
                    <FeatureCard icon="📥">
                      <Trans i18nKey="xbox.auto.adv1">
                        Автоматически скачает самую актуальную и свежую версию кода напрямую с площадки <a href="https://github.com/D1x2k/Wiki-by-D1x2k/blob/main/Delete-gamebar.bat" target="_blank" rel="noreferrer" className="inline-code feature-link">GitHub</a>.
                      </Trans>
                    </FeatureCard>
                  </AnimatedGroupItem>
                  <AnimatedGroupItem style={{ height: '100%' }}>
                    <FeatureCard icon="🔑">
                      {t('xbox.auto.adv2')}
                    </FeatureCard>
                  </AnimatedGroupItem>
                  <AnimatedGroupItem style={{ height: '100%' }}>
                    <FeatureCard icon="🗑️">
                      <Trans i18nKey="xbox.auto.adv3">
                        Соблюдает чистоту: после завершения процесса сразу удалит временный исполняемый файл из директории <span className="inline-code">%TEMP%</span>.
                      </Trans>
                    </FeatureCard>
                  </AnimatedGroupItem>
                </AnimatedGroupContainer>
              </div>

              <div style={{ marginTop: '48px' }}>
                <h2>🛡️ {t('xbox.auto.sec_title')}</h2>
                <AnimatedGroupContainer className="security-box">
                  <AnimatedGroupItem className="security-item">
                    <Trans i18nKey="xbox.auto.sec1">
                      Команда осуществляет загрузку проверенного <span className="inline-code">.bat</span> файла исключительно с официального репозитория проекта. Вы лично можете убедиться в этом, изучив исходную веб-ссылку внутри команды.
                    </Trans>
                  </AnimatedGroupItem>
                  <AnimatedGroupItem className="security-item">
                    <Trans i18nKey="xbox.auto.sec2">
                      Архитектура <span className="inline-code">.bat</span> файла полностью прозрачна и открыта.
                    </Trans>
                  </AnimatedGroupItem>
                  <AnimatedGroupItem className="security-item">
                    <Trans i18nKey="xbox.auto.sec3">
                      Мы поддерживаем свободу выбора: вы всегда можете скачать этот <span className="inline-code">.bat</span> файл вручную и запустить его самостоятельно, либо настроить всё через ручной режим.
                    </Trans>
                  </AnimatedGroupItem>
                </AnimatedGroupContainer>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="tab-content" style={{ animation: 'fade-in 0.3s ease-out' }}>
              <h2>🗑️ {t('xbox.manual.title')}</h2>
              <AnimatedStepsContainer className="mb-40" style={{ marginBottom: '40px' }}>
                <AnimatedStepItem>
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="xbox.manual.step1">
                        Откройте <span className="inline-code">Командную строку (cmd)</span> <b>от имени Администратора</b>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>
                <AnimatedStepItem style={{ alignItems: 'flex-start' }}>
                  <div className="step-number" style={{ marginTop: '4px' }}>02</div>
                  <div className="step-content">
                    <div className="step-title-main" style={{ marginBottom: '16px' }}>
                      <Trans i18nKey="xbox.manual.step2">
                        Вставьте следующую команду и нажмите <b>Enter</b>:
                      </Trans>
                    </div>
                    <TerminalCard
                      style={{ marginTop: 0 }}
                      command={'powershell -NoProfile -Command "Get-AppxProvisionedPackage -Online | Where-Object {$_.DisplayName -like \'*XboxGamingOverlay*\'} | Remove-AppxProvisionedPackage -Online; Get-AppxPackage -AllUsers *Microsoft.XboxGamingOverlay* | Remove-AppxPackage -AllUsers"'}
                      onCopy={handleCopy}
                    />
                  </div>
                </AnimatedStepItem>
              </AnimatedStepsContainer>

              <h2>🔧 {t('xbox.manual.fix_title')}</h2>
              <AnimatedStepsContainer>
                <AnimatedStepItem>
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="xbox.manual.fix_step1">
                        Откройте <span className="inline-code">Командную строку (cmd)</span> <b>от имени Администратора</b>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>
                <AnimatedStepItem style={{ alignItems: 'flex-start' }}>
                  <div className="step-number" style={{ marginTop: '4px' }}>02</div>
                  <div className="step-content">
                    <div className="step-title-main" style={{ marginBottom: '16px' }}>{t('xbox.manual.fix_step2')}</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{t('xbox.manual.fix_list1')}</div>
                        <TerminalCard style={{ marginTop: 0 }} command='reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f' onCopy={handleCopy} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                          {t('xbox.manual.fix_list2')}
                          <SmartTooltip content={t('xbox.manual.fix_list2_tooltip')}>GameDVR</SmartTooltip>
                          {t('xbox.manual.fix_list2_2')}
                        </div>
                        <TerminalCard style={{ marginTop: 0 }} command='reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f' onCopy={handleCopy} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{t('xbox.manual.fix_list3')}</div>
                        <TerminalCard style={{ marginTop: 0 }} command='reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 2 /f' onCopy={handleCopy} />
                        <TerminalCard style={{ marginTop: '10px' }} command='reg add "HKCU\System\GameConfigStore" /v "GameDVR_DSEBehavior" /t REG_DWORD /d 2 /f' onCopy={handleCopy} />
                      </div>
                    </div>
                  </div>
                </AnimatedStepItem>
              </AnimatedStepsContainer>

              <AnimatedGroupContainer className="features-grid" style={{ marginTop: '32px' }}>
                <AnimatedGroupItem style={{ height: '100%' }}>
                  <FeatureCard icon="🔄">
                    <Trans i18nKey="xbox.manual.reboot">
                      После применения всех изменений <b>рекомендуется перезагрузить компьютер</b> для вступления настроек в силу.
                    </Trans>
                  </FeatureCard>
                </AnimatedGroupItem>
              </AnimatedGroupContainer>
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

