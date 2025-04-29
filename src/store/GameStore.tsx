import { motion } from 'framer-motion';
import FloatingCounters from './FloatingCounters';
import DailyRewards from './DailyRewards';
import StoreItems from './StoreItems';

const GameStore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-500/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -100, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 5 + Math.random() * 5 }}
          />
        ))}
      </div>

      <FloatingCounters />
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-5xl font-bold text-center mb-12 neon-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Store
        </motion.h1>
        <motion.div
          className="mb-12 p-6 rounded-2xl bg-gray-900/50 tech-border"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DailyRewards />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StoreItems />
        </motion.div>
      </div>
    </div>
  );
};

export default GameStore;
