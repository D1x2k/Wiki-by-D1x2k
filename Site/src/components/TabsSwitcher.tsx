import { motion } from 'framer-motion';

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
}

interface TabsSwitcherProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  layoutId?: string;
  className?: string;
}

export function TabsSwitcher<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  layoutId = 'activeGuideTab',
  className = '',
}: TabsSwitcherProps<T>) {
  return (
    <div className={`tabs-switcher ${className}`.trim()}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`tab-btn ${isActive ? 'active' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="tab-btn-active-bg"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="tab-btn-text">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
