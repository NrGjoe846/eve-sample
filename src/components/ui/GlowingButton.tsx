import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface GlowingButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  className: customClassName = '',
}) => {
  const baseStyles = "relative group rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 hover:from-blue-600 hover:via-cyan-500 hover:to-purple-600",
    secondary: "bg-white/10 hover:bg-white/20 border border-white/20",
    outline: "border-2 border-blue-500 hover:bg-blue-500/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  };

  const buttonClassName = twMerge(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    customClassName
  );

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClassName}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-75 blur-xl transition-all duration-300 animate-pulse" />
      
      {/* Sparkle Container */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 1 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Button Content */}
      <div className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && <span className="text-xl">{icon}</span>}
        {children}
      </div>
    </motion.button>
  );
};

export default GlowingButton;
