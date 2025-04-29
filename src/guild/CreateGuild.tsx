import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './GuildStyles.css';

const CreateGuild = () => {
  const [guildName, setGuildName] = useState('');
  const [level, setLevel] = useState('');
  const [guildType, setGuildType] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guild Creation:', { guildName, level, guildType, description });
    navigate('/guild');
  };

  return (
    <div className="space-background">
      <div className="cosmic-overlay" />
      <motion.div className="floating-astronaut" initial={{ x: 100, y: 300 }} />

      <div className="min-h-screen flex items-center justify-center text-white p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="holo-card p-8 w-full max-w-lg"
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent animate-[textGlow_2s_infinite]">
            Forge Your Guild
          </h1>
          <p className="text-gray-300 text-center mt-2">Craft a stellar legacy</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Guild Name</label>
              <input
                type="text"
                value={guildName}
                onChange={(e) => setGuildName(e.target.value)}
                className="glass-input w-full"
                placeholder="Enter guild name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Minimum Level</label>
              <input
                type="number"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="glass-input w-full"
                placeholder="Enter level requirement"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Guild Type</label>
              <select
                value={guildType}
                onChange={(e) => setGuildType(e.target.value)}
                className="glass-input w-full"
                required
              >
                <option value="" disabled>Select guild type</option>
                <option value="competitive">Competitive</option>
                <option value="casual">Casual</option>
                <option value="roleplay">Roleplay</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Guild Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="Describe your guild"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Guild Logo</label>
              <div className="h-32 w-32 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                {/* Placeholder for AI logo generator */}
                <span>AI Logo Coming Soon</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="neon-button w-full"
            >
              Launch Guild
            </motion.button>
          </form>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/guild')}
            className="neon-button w-full mt-4"
          >
            Back to Nexus
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateGuild;
