import { useEffect } from 'react';

export const useGlowEffect = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.glow-card');
      
      cards.forEach(card => {
        const htmlCard = card as HTMLElement;
        const rect = htmlCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        htmlCard.style.setProperty('--card-x', `${x}px`);
        htmlCard.style.setProperty('--card-y', `${y}px`);
      });
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};
