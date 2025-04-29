import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import './GuildStyles.css';

const GuildAchievements = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="holo-card p-6 w-80"
    >
      <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
      <h2 className="text-xl font-semibold text-white">Guild Achievements</h2>
      <ul className="text-gray-300 mt-2 space-y-2">
        <li>🏆 Top Rank #1 - Q1 2025</li>
        <li>🏆 Community Spirit Award</li>
      </ul>
    </motion.div>
  );
};

export default GuildAchievements;
