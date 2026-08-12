import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Dashboard } from './pages/Dashboard';
import { WindowsActivationGuide } from './pages/WindowsActivationGuide';
import { XboxGameBarGuide } from './pages/XboxGameBarGuide';
import { CloudflareGuide } from './pages/CloudflareGuide';
import { WindowsAppsGuide } from './pages/WindowsAppsGuide';
import { Bypass } from './pages/Bypass';
import { NotFound } from './pages/NotFound';
import { ParticlesBackground } from './components/ParticlesBackground';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SocialLinks } from './components/SocialLinks';
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/activation" element={<PageWrapper><WindowsActivationGuide /></PageWrapper>} />
        <Route path="/xbox-game-bar" element={<PageWrapper><XboxGameBarGuide /></PageWrapper>} />
        <Route path="/cloudflare" element={<PageWrapper><CloudflareGuide /></PageWrapper>} />
        <Route path="/windows-apps" element={<PageWrapper><WindowsAppsGuide /></PageWrapper>} />
        <Route path="/bypass-instructions" element={<PageWrapper><Bypass /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="header-controls">
        <SocialLinks />
        <LanguageSwitcher />
      </div>
      <ParticlesBackground />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
