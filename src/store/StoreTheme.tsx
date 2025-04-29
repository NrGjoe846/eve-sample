import React from 'react';

interface StoreThemeProps {
  children: React.ReactNode;
}

const StoreTheme: React.FC<StoreThemeProps> = ({ children }) => {
  return (
    <div className="store-theme">
      <style jsx global>{`
        .store-theme {
          --card-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
          --card-shadow-hover: 0 20px 40px -15px rgba(2, 12, 27, 0.9);
          --card-bg: linear-gradient(120deg, #2a3a57 0%, #1f2b45 100%);
          --neon-text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #0fa, 0 0 42px #0fa;
          --gem-glow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
          --gold-glow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-3d:hover {
          transform: translateY(-10px) rotateX(10deg) rotateY(5deg);
          box-shadow: var(--card-shadow-hover);
        }

        .neon-text {
          text-shadow: var(--neon-text-shadow);
        }

        .gem-shine {
          position: relative;
          overflow: hidden;
        }

        .gem-shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(0, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        .pulse-glow {
          animation: pulseGlow 1.5s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.9)); }
        }

        .tech-border {
          border: 1px solid rgba(0, 255, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }
      `}</style>
      {children}
    </div>
  );
};

export default StoreTheme;
