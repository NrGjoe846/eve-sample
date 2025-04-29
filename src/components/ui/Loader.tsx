import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = true, text = 'Loading...' }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-[#1a1a2e]/80 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex gap-2">
          {/* Hidden SVG for gradient definition */}
          <svg height={0} width={0} viewBox="0 0 64 64" className="absolute">
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="loader-gradient">
                <stop stopColor="#973BED" />
                <stop stopColor="#007CFF" offset={1} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Letter U */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 64 64" 
            height={64} 
            width={64} 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <path 
              strokeLinejoin="round" 
              strokeLinecap="round" 
              strokeWidth={8} 
              stroke="url(#loader-gradient)" 
              d="M 10,4 V 40 C 10,52 20,60 32,60 C 44,60 54,52 54,40 V 4" 
              className="animate-dashArray"
              pathLength={360} 
            />
          </motion.svg>
          
          {/* Letter N */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 64 64" 
            height={64} 
            width={64} 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <path 
              strokeLinejoin="round" 
              strokeLinecap="round" 
              strokeWidth={8} 
              stroke="url(#loader-gradient)" 
              d="M 10,60 V 4 L 54,60 V 4" 
              className="animate-dashArray"
              pathLength={360} 
            />
          </motion.svg>
          
          {/* Letter A */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 64 64" 
            height={64} 
            width={64} 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <path 
              strokeLinejoin="round" 
              strokeLinecap="round" 
              strokeWidth={8} 
              stroke="url(#loader-gradient)" 
              d="M 10,60 L 32,4 L 54,60 M 22,36 H 42" 
              className="animate-dashArray"
              pathLength={360} 
            />
          </motion.svg>
          
          {/* Letter I */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 64 64" 
            height={64} 
            width={64} 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <path 
              strokeLinejoin="round" 
              strokeLinecap="round" 
              strokeWidth={8} 
              stroke="url(#loader-gradient)" 
              d="M 32,4 V 60" 
              className="animate-dashArray"
              pathLength={360} 
            />
          </motion.svg>
        </div>

        {text && (
          <motion.p 
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {text}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Loader;
