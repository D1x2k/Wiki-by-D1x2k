import { motion } from 'framer-motion';

export const SocialLinks = () => {
  const links = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@D1x2k-',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/D1x2k/Wiki-by-D1x2k',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '12px'
    }}>
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.05, 
            borderColor: 'rgba(139, 92, 246, 0.6)', 
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 25px rgba(139, 92, 246, 0.4)',
            color: '#d8b4fe'
          }}
          whileTap={{ scale: 0.95 }}
          title={link.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            background: 'rgba(15, 15, 20, 0.85)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px', // Square with rounded corners
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(139, 92, 246, 0.2)', // Purple glow from SmartTooltip
            color: '#c4b5fd', // Purple-ish icon color
            backdropFilter: 'blur(10px)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
            textDecoration: 'none'
          }}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
};
