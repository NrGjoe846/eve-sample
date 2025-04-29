import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import './GuildStyles.css';

const GuildInfo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="holo-card p-6 w-80"
    >
      <Users className="w-8 h-8 text-cyan-400 mb-4" />
      <h2 className="text-xl font-semibold text-white">Your Guild</h2>
      <p className="text-gray-300 mt-2">Guild Name: The Pioneers</p>
      <p className="text-gray-300">Members: 42</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="neon-button mt-4 w-full"
      >
        Manage Guild
      </motion.button>
    </motion.div>
  );
};

export default GuildInfo;
