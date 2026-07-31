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

const appsList = [
  { key: 'copilot', cmd: 'Get-AppxPackage *Copilot* -AllUsers | Remove-AppxPackage' },
  { key: 'appcompat', cmd: 'Get-AppxPackage *ApplicationCompatibilityEnhancements* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'av1', cmd: 'Get-AppxPackage *AV1VideoExtension* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'avc', cmd: 'Get-AppxPackage *AVCEncoderVideoExtension* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'bingsearch', cmd: 'Get-AppxPackage *BingSearch* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'webexperience', cmd: 'Get-AppxPackage *Client.WebExperience* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'crossdevice', cmd: 'Get-AppxPackage *CrossDevice* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'devhome', cmd: 'Get-AppxPackage *Windows.DevHome* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'gameassist', cmd: 'Get-AppxPackage *GameAssist* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'heif', cmd: 'Get-AppxPackage *HEIFImageExtension* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'hevc', cmd: 'Get-AppxPackage *HEVCVideoExtension* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'winappruntime', cmd: 'Get-AppxPackage *WinAppRuntime.Main* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'mpeg2', cmd: 'Get-AppxPackage *MPEG2VideoExtension* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'onedrive', cmd: 'Get-AppxPackage *OneDriveSync* -AllUsers | Remove-AppxPackage' },
  { key: 'outlook', cmd: 'Get-AppxPackage *OutlookForWindows* -AllUsers | Remove-AppxPackage' },
  { key: 'paint', cmd: 'Get-AppxPackage *Paint* -AllUsers | Remove-AppxPackage' },
  { key: 'powerautomate', cmd: 'Get-AppxPackage *PowerAutomateDesktop* -AllUsers | Remove-AppxPackage' },
  { key: 'rawimage', cmd: 'Get-AppxPackage *RawImageExtension* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'solitaire', cmd: 'Get-AppxPackage *solitairecollection* -AllUsers | Remove-AppxPackage' },
  { key: 'store', cmd: 'Get-AppxPackage *WindowsStore* -AllUsers | Remove-AppxPackage' },
  { key: 'storepurchase', cmd: 'Get-AppxPackage *StorePurchaseApp* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'teams', cmd: 'Get-AppxPackage *Teams* -AllUsers | Remove-AppxPackage' },
  { key: 'todo', cmd: 'Get-AppxPackage *Todos* -AllUsers | Remove-AppxPackage' },
  { key: 'vp9', cmd: 'Get-AppxPackage *VP9VideoExtensions* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'webmedia', cmd: 'Get-AppxPackage *WebMediaExtensions* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'webp', cmd: 'Get-AppxPackage *WebpImageExtension* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'widgets', cmd: 'Get-AppxPackage *WidgetsPlatformRuntime* -AllUsers | Remove-AppxPackage', hasTooltip: true },
  { key: 'notepad', cmd: 'Get-AppxPackage *WindowsNotepad* -AllUsers | Remove-AppxPackage' },
  { key: 'quickassist', cmd: 'Get-AppxPackage *QuickAssist* -AllUsers | Remove-AppxPackage' },
  { key: 'stickynotes', cmd: 'Get-AppxPackage *MicrosoftStickyNotes* -AllUsers | Remove-AppxPackage' },
  { key: 'soundrecorder', cmd: 'Get-AppxPackage *SoundRecorder* -AllUsers | Remove-AppxPackage' },
  { key: 'calculator', cmd: 'Get-AppxPackage *windowscalculator* -AllUsers | Remove-AppxPackage' },
  { key: 'camera', cmd: 'Get-AppxPackage *windowscamera* -AllUsers | Remove-AppxPackage' },
  { key: 'mediaplayer', cmd: 'Get-AppxPackage *zunevideo* -AllUsers | Remove-AppxPackage' },
  { key: 'news', cmd: 'Get-AppxPackage *bingnews* -AllUsers | Remove-AppxPackage' },
  { key: 'snippingtool', cmd: 'Get-AppxPackage *ScreenSketch* -AllUsers | Remove-AppxPackage' },
  { key: 'weather', cmd: 'Get-AppxPackage *bingweather* -AllUsers | Remove-AppxPackage' },
  { key: 'remotedesktop', cmd: 'Get-AppxPackage *RemoteDesktop* -AllUsers | Remove-AppxPackage' },
  { key: 'yourphone', cmd: 'Get-AppxPackage *YourPhone* -AllUsers | Remove-AppxPackage' },
  { key: 'terminal', cmd: 'Get-AppxPackage *WindowsTerminal* -AllUsers | Remove-AppxPackage' },
  { key: 'gethelp', cmd: 'Get-AppxPackage *GetHelp* -AllUsers | Remove-AppxPackage' },
  { key: 'photos', cmd: 'Get-AppxPackage *photos* -AllUsers | Remove-AppxPackage' },
  { key: 'feedback', cmd: 'Get-AppxPackage *feedback* -AllUsers | Remove-AppxPackage' },
  { key: 'alarms', cmd: 'Get-AppxPackage *windowsalarms* -AllUsers | Remove-AppxPackage' },
];

export const WindowsAppsGuide = () => {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');
  const [searchQuery, setSearchQuery] = useState('');
  const toastTimeoutRef = useRef<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('windows_apps.title')} | Wiki by D1x2k`;
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

  const filteredApps = appsList.filter(app => {
    const localizedName = t(`windows_apps.manual.apps.${app.key}`).toLowerCase();
    const query = searchQuery.toLowerCase();
    return localizedName.includes(query) || app.key.toLowerCase().includes(query);
  });

  return (
    <>
      <div className="glow-bg"></div>

      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span>{t('nav.back')}</span>
        </Link>

        <div className="welcome-screen scroll-reveal" style={{ minHeight: 'auto', paddingTop: '3vh', paddingBottom: '3vh' }}>
          <header className="hero no-select">
            <h1 className="text-gradient-animated">🧹 {t('windows_apps.title')}</h1>
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
              {t('windows_apps.tabs.auto')}
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
              {t('windows_apps.tabs.manual')}
            </button>
          </div>

          {activeTab === 'auto' && (
            <div className="tab-content" style={{ animation: 'fade-in 0.3s ease-out' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '0', marginBottom: '48px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.8rem', marginBottom: '16px', background: 'linear-gradient(to right, #b485ff, #8050ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  WinVoid App Remover
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 24px auto', textAlign: 'center' }}>
                  {t('windows_apps.auto.winvoid_desc', 'Удаляйте системный мусор и предустановленные приложения Windows в один клик. Быстро, безопасно и стильно.')}
                </p>
                
                <div style={{ 
                  margin: '16px 0 48px 0', 
                  width: '125%', 
                  maxWidth: '125%', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(128, 80, 255, 0.08)', 
                  border: '1px solid rgba(128, 80, 255, 0.1)',
                  animation: 'float 6s ease-in-out infinite',
                  transform: 'translateY(0)'
                }}>
                  <img src={`${import.meta.env.BASE_URL}winvoid-preview.png`} alt="WinVoid App Remover" fetchPriority="high" loading="eager" style={{ width: '100%', display: 'block' }} />
                </div>

                <a 
                  href={`${import.meta.env.BASE_URL}WinVoid App Remover.exe`}
                  download="WinVoid_App_Remover.exe"
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #8050ff, #b485ff)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(128, 80, 255, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {t('windows_apps.auto.winvoid_download', 'Скачать WinVoid App Remover')}
                </a>

                <div style={{ marginTop: '64px', width: '125%', maxWidth: '125%', textAlign: 'left' }}>
                  <AnimatedGroupContainer className="features-grid">
                    <AnimatedGroupItem style={{ height: '100%' }}>
                      <FeatureCard icon="⚡">
                        <b>{t('windows_apps.auto.winvoid_feat1_title', 'Молниеносная скорость')}</b>
                        <div style={{ marginTop: '8px', opacity: 0.8, fontSize: '0.95em' }}>
                          {t('windows_apps.auto.winvoid_feat1_desc', 'Написано на Rust и Tauri, работает без задержек.')}
                        </div>
                      </FeatureCard>
                    </AnimatedGroupItem>
                    <AnimatedGroupItem style={{ height: '100%' }}>
                      <FeatureCard icon="🛡️">
                        <b>{t('windows_apps.auto.winvoid_feat2_title', 'Полная безопасность')}</b>
                        <div style={{ marginTop: '8px', opacity: 0.8, fontSize: '0.95em' }}>
                          {t('windows_apps.auto.winvoid_feat2_desc', 'Никаких скрытых скриптов, удаляет только то, что вы выбрали.')}
                        </div>
                      </FeatureCard>
                    </AnimatedGroupItem>
                    <AnimatedGroupItem style={{ height: '100%' }}>
                      <FeatureCard icon="🔄">
                        <b>{t('windows_apps.auto.winvoid_feat3_title', 'Легкое восстановление')}</b>
                        <div style={{ marginTop: '8px', opacity: 0.8, fontSize: '0.95em' }}>
                          {t('windows_apps.auto.winvoid_feat3_desc', 'Возможность вернуть удаленные приложения в один клик.')}
                        </div>
                      </FeatureCard>
                    </AnimatedGroupItem>
                  </AnimatedGroupContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="tab-content" style={{ animation: 'fade-in 0.3s ease-out' }}>
              <h2>🔧 {t('windows_apps.manual.title')}</h2>
              <AnimatedStepsContainer className="mb-40" style={{ marginBottom: '40px' }}>
                <AnimatedStepItem>
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <div className="step-title-main">
                      <Trans i18nKey="windows_apps.manual.step1">
                        Откройте <span className="inline-code">PowerShell</span> <b>от имени Администратора</b>.
                      </Trans>
                    </div>
                  </div>
                </AnimatedStepItem>
                <AnimatedStepItem style={{ alignItems: 'flex-start' }}>
                  <div className="step-number" style={{ marginTop: '4px' }}>02</div>
                  <div className="step-content" style={{ width: '100%' }}>
                    <div className="step-title-main" style={{ marginBottom: '16px' }}>
                      <Trans i18nKey="windows_apps.manual.step2">
                        Вставьте следующую команду и нажмите <b>Enter</b>:
                      </Trans>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                      <div className="search-container" style={{ position: 'relative', marginBottom: '8px' }}>
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={t('windows_apps.manual.search_placeholder', 'Поиск приложений...')}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            paddingLeft: '44px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'rgba(0, 0, 0, 0.2)',
                            color: '#fff',
                            fontSize: '15px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#8050ff'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                        <svg 
                          viewBox="0 0 24 24" 
                          width="18" 
                          height="18" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }}
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>

                      {filteredApps.length > 0 ? filteredApps.map(app => (
                        <div key={app.key}>
                          <div style={{ fontSize: '16px', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>
                            {app.hasTooltip ? (
                              <SmartTooltip content={t(`windows_apps.manual.apps.${app.key}_tooltip`)}>
                                {t(`windows_apps.manual.apps.${app.key}`)}
                              </SmartTooltip>
                            ) : (
                              t(`windows_apps.manual.apps.${app.key}`)
                            )}
                          </div>
                          <TerminalCard style={{ marginTop: 0 }} command={app.cmd} onCopy={handleCopy} />
                        </div>
                      )) : (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
                          {t('windows_apps.manual.no_results', 'Приложения не найдены')}
                        </div>
                      )}
                    </div>
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
