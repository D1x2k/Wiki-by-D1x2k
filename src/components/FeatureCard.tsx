import type { FC, ReactNode } from 'react';

interface FeatureCardProps {
  icon: string;
  children: ReactNode;
}

export const FeatureCard: FC<FeatureCardProps> = ({ icon, children }) => {
  return (
    <div className="feature-card glow-card">
      <span className="feature-icon">{icon}</span>
      <span className="feature-text">{children}</span>
    </div>
  );
};
