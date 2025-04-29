import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './GuildStyles.css';

const JoinGuild = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for guild:', searchQuery);
  };

  return (
    <div className="space-background">
      <div className="cosmic-overlay" />
      <motion.div className="floating-astronaut" initial={{ x: 200, y: 100 }} />

      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent animate-[textGlow_2s_infinite]">
            Join a Galactic Crew
          </h1>
          <p className="text-gray-300 mt-2">Find your place among the stars</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <form onSubmit={handleSearch} className="mb-8 flex space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input flex-1"
              placeholder="Search for a guild"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="neon-button"
            >
              Search
            </motion.button>
          </form>

          <div className="space-y-6">
            <motion.div className="holo-card p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400">The Pioneers</h3>
                <p className="text-gray-300">Level 10+ | Competitive</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button px-4 py-2"
              >
                Join
              </motion.button>
            </motion.div>

            <motion.div className="holo-card p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400">Code Warriors</h3>
                <p className="text-gray-300">Level 5+ | Casual</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button px-4 py-2"
              >
                Join
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/guild')}
          className="neon-button mt-12"
        >
          Back to Nexus
        </motion.button>
      </div>
    </div>
  );
};

export default JoinGuild;
