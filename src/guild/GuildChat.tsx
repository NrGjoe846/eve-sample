import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import './GuildStyles.css';

const GuildChat = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="holo-card p-6 w-80"
    >
      <MessageSquare className="w-8 h-8 text-pink-400 mb-4" />
      <h2 className="text-xl font-semibold text-white">Guild Chat</h2>
      <div className="text-gray-300 mt-2 h-24 overflow-y-auto">
        <p>[User1]: Great job team!</p>
        <p>[User2]: Next event is tomorrow!</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="neon-button mt-4 w-full"
      >
        Open Chat
      </motion.button>
    </motion.div>
  );
};

export default GuildChat;
