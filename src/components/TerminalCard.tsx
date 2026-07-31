import { useState } from 'react';
import type { FC, CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalCardProps {
  command: string;
  onCopy: () => void;
  style?: CSSProperties;
}

export const TerminalCard: FC<TerminalCardProps> = ({ command, onCopy, style }) => {
  const [justCopied, setJustCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(command).then(() => {
      onCopy();
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1200);
    }).catch(err => {
      console.error('Ошибка копирования: ', err);
    });
  };

  return (
    <div className={`terminal-card glow-card ${justCopied ? 'copy-success-glow' : ''}`} style={style} onClick={handleCopy}>
      <div className="command-container">
        <span className="command-text">{command}</span>
      </div>
      <div className="copy-wrapper">
        <div className="copy-icon">{t('terminal.copy')}</div>
      </div>

    </div>
  );
};
