import type { FC } from 'react';

interface ToastProps {
  show: boolean;
}

import { useTranslation } from 'react-i18next';

export const Toast: FC<ToastProps> = ({ show }) => {
  const { t } = useTranslation();
  return (
    <div id="toast" className={`toast ${show ? 'show' : ''}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d8b4fe" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.6))' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      {t('toast.copied')}
    </div>
  );
};
