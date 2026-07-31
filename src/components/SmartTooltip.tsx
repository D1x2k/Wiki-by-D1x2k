import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface SmartTooltipProps {
  children: ReactNode;
  content: string | ReactNode;
}

export const SmartTooltip = ({ children, content }: SmartTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isVisible && spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    }
  }, [isVisible]);

  return (
    <>
      <span 
        ref={spanRef}
        className="smart-tooltip-anchor"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{ 
          borderBottom: isVisible ? '1px solid #8b5cf6' : '1px dashed rgba(139, 92, 246, 0.6)', 
          color: isVisible ? '#c4b5fd' : '#a78bfa', 
          cursor: 'help',
          transition: 'all 0.2s ease',
          paddingBottom: '1px'
        }}
      >
        {children}
      </span>
      {createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: "calc(-100% + 10px)", x: "-50%", scale: 0.95 }}
              animate={{ opacity: 1, y: "-100%", x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: "calc(-100% + 10px)", x: "-50%", scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: coords.y - 8,
                left: coords.x,
                padding: '10px 14px',
                background: 'rgba(15, 15, 20, 0.95)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(139, 92, 246, 0.2)',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                whiteSpace: 'nowrap',
                zIndex: 99999,
                backdropFilter: 'blur(10px)',
                pointerEvents: 'none'
              }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
