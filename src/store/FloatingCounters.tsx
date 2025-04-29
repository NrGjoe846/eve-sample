import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, Coins, X } from 'lucide-react';
import { useCurrencyStore } from './useCurrencyStore';

const FloatingCounters = () => {
  const [showStats, setShowStats] = useState(false);
  const { gems, gold, loginStreak, maxLoginStreak } = useCurrencyStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      <motion.div className="relative" whileHover={{ scale: 1.05 }}>
        <motion.div
          className="flex items-center space-x-4 bg-gray-900/80 backdrop-blur-md p-3 rounded-full tech-border"
          animate={{ boxShadow: ['var(--gem-glow)', 'none', 'var(--gem-glow)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.div className="gem-shine" whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
            <Diamond className="h-6 w-6 text-cyan-300" />
          </motion.div>
          <motion.span
            className="font-bold text-cyan-300 neon-text"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {gems.toLocaleString()}
          </motion.span>

          <motion.div className="gem-shine" whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
            <Coins className="h-6 w-6 text-yellow-300" />
          </motion.div>
          <motion.span
            className="font-bold text-yellow-300 neon-text"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {gold.toLocaleString()}
          </motion.span>

          <motion.button
            className="ml-2 p-1 rounded-full bg-blue-500/20"
            onClick={() => setShowStats(!showStats)}
            whileHover={{ scale: 1.2 }}
          >
            <X size={16} className="text-cyan-300" />
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-72 p-4 bg-gray-900/95 backdrop-blur-md rounded-xl tech-border"
            >
              <h3 className="text-lg font-bold text-white neon-text mb-2">Currency Stats</h3>
              <div className="space-y-2 text-white">
                <p>Gems: <span className="text-cyan-300">{gems.toLocaleString()}</span></p>
                <p>Gold: <span className="text-yellow-300">{gold.toLocaleString()}</span></p>
                <p>Streak: <span className="text-purple-300">{loginStreak} / {maxLoginStreak}</span></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingCounters;
