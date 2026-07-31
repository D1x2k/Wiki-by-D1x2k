import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const AnimatedStepsContainer = ({ children, className = "", style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
  return (
    <motion.div 
      className={`steps-container ${className}`} 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedStepItem = ({ children, style }: { children: ReactNode, style?: React.CSSProperties }) => {
  return (
    <motion.div className="step-item" style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

export const AnimatedGroupContainer = ({ children, className = "", style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
  return (
    <motion.div 
      className={className} 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedGroupItem = ({ children, className = "", style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
};
