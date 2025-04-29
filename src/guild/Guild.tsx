import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './GuildStyles.css';

const Guild = () => {
  const navigate = useNavigate();

  return (
    <div className="space-background">
      <div className="cosmic-overlay" />
      <motion.div className="floating-astronaut" initial={{ x: 50, y: 50 }} />
      <motion.div className="floating-astronaut" initial={{ x: 300, y: 200 }} />

      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent animate-[textGlow_2s_infinite]">
            Guild Nexus
          </h1>
          <p className="text-gray-300 mt-2">Embark on your cosmic guild journey</p>
        </motion.div>

        <div className="flex space-x-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/guild/join')}
            className="holo-card p-8 flex-1 text-center cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-cyan-400">Join Guild</h2>
            <p className="text-gray-300 mt-2">Discover a crew among the stars</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/guild/create')}
            className="holo-card p-8 flex-1 text-center cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-pink-400">Create Guild</h2>
            <p className="text-gray-300 mt-2">Forge your own galactic legacy</p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="neon-button mt-12"
        >
          Back to Orbit
        </motion.button>
      </div>
    </div>
  );
};

export default Guild;
