import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { useWindowSize } from 'react-use';
import {
  Trophy, Star, Code, Book, Timer, Target, Award, GitBranch, Zap,
  Activity, Wallet, ChevronRight, Users, Sword, Shield, Crown,
  Gamepad, Gift, Sparkles, Map, Brain, Cpu, Globe, Hexagon, Share2
} from 'lucide-react';
import BackButton from '../BackButton';

const ProfileDashboard = () => {
  const [showAvatarCustomization, setShowAvatarCustomization] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { width, height } = useWindowSize();

  // User profile state
  const [userProfile, setUserProfile] = useState({
    userId: 'CosmicTraveler42',
    headline: 'Neural Navigator',
    contentFocus: 'AI & Quantum Computing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cosmic',
  });

  // Game stats with animated values
  const gameStats = {
    rank: 'Cosmic Explorer',
    powerLevel: 1250,
    missionsCompleted: 47,
    bossesDefeated: 12,
    specialItems: 8,
    energyLevel: 85,
    neuralCapacity: 92,
    quantumTokens: 3750,
  };

  // Animated stats using react-spring
  const { powerLevel } = useSpring({
    from: { powerLevel: 0 },
    to: { powerLevel: gameStats.powerLevel },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  const { energyLevel } = useSpring({
    from: { energyLevel: 0 },
    to: { energyLevel: gameStats.energyLevel },
    delay: 300,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: 'NeuroCoder', points: 15420, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', specialty: 'Quantum Computing' },
    { rank: 2, name: 'ByteMaster', points: 14250, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', specialty: 'Neural Networks' },
    { rank: 3, name: 'CyberPilot', points: 13890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', specialty: 'AI Systems' },
  ];

  // Active challenge missions
  const activeMissions = [
    { id: 1, title: 'Neural Network Mastery', progress: 75, reward: '500 QT' },
    { id: 2, title: 'Quantum Algorithm Challenge', progress: 45, reward: '750 QT' },
    { id: 3, title: 'Cybersecurity Mission', progress: 90, reward: '1000 QT' },
  ];

  // Avatar customization options
  const avatarOptions = {
    facialFeatures: ['Default', 'Sharp', 'Round', 'Soft'],
    hairstyles: ['Short', 'Long', 'Curly', 'Bald'],
    outfits: ['Casual', 'Tech', 'Cosmic', 'Formal'],
    accessories: ['Glasses', 'Headset', 'None', 'Pendant'],
  };

  const [avatarConfig, setAvatarConfig] = useState({
    facialFeature: 'Default',
    hairstyle: 'Short',
    outfit: 'Casual',
    accessory: 'None',
  });

  // Handle profile edit submission
  const handleProfileSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setUserProfile({
      ...userProfile,
      userId: formData.get('userId'),
      headline: formData.get('headline'),
      contentFocus: formData.get('contentFocus'),
    });
    setShowProfileEdit(false);
  };

  // Handle avatar customization save
  const handleAvatarSave = () => {
    const newAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.userId}&hair=${avatarConfig.hairstyle}&clothing=${avatarConfig.outfit}&accessories=${avatarConfig.accessory}`;
    setUserProfile({ ...userProfile, avatar: newAvatarUrl });
    setShowAvatarCustomization(false);
  };

  // Share functionality
  const shareUrl = window.location.href; // Dynamic URL for sharing
  const shareText = `Check out my profile on this awesome platform! Rank: ${gameStats.rank}, Power Level: ${gameStats.powerLevel}`;

  const shareOptions = [
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}` },
    { name: 'WhatsApp', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}` },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B15] text-white p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/circuit.svg')] opacity-5" />
              </div>

              <div className="relative flex flex-col items-center">
                <div className="relative w-40 h-40">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#power-gradient)"
                      strokeWidth="4"
                      strokeDasharray="439.8"
                      strokeDashoffset={440 - (440 * gameStats.powerLevel) / 2000}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="power-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-32 h-32 mx-auto mt-4"
                  >
                    <img
                      src={userProfile.avatar}
                      alt="Profile Avatar"
                      className="w-full h-full rounded-full border-4 border-white/20 object-cover"
                      onError={(e) => (e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback')}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAvatarCustomization(true)}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg text-sm font-medium"
                    >
                      Edit Avatar
                    </motion.button>
                  </motion.div>
                </div>

                <div className="text-center mt-6 space-y-2">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {userProfile.headline}
                  </h2>
                  <p className="text-blue-400">Level {Math.floor(gameStats.powerLevel / 100)}</p>
                  <p className="text-sm text-gray-400">{userProfile.contentFocus}</p>
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setShowProfileEdit(true)}
                      className="mt-2 px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      Edit Profile
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="mt-2 px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </motion.button>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <animated.span className="font-bold">
                      {powerLevel.to((n) => `Power Level: ${n.toFixed(0)}`)}
                    </animated.span>
                  </div>
                </div>

                {/* Share Menu Dropdown */}
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-48 right-0 bg-[#1A1A2E] rounded-lg shadow-lg p-2 z-50"
                    >
                      {shareOptions.map((option) => (
                        <a
                          key={option.name}
                          href={option.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                        >
                          {option.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                  <div className="relative p-4 bg-white/5 rounded-lg overflow-hidden group hover:bg-white/10 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Brain className="w-6 h-6 text-blue-400 mb-2" />
                    <div className="text-2xl font-bold text-blue-400">{gameStats.neuralCapacity}%</div>
                    <div className="text-sm text-gray-400">Neural Capacity</div>
                  </div>
                  <div className="relative p-4 bg-white/5 rounded-lg overflow-hidden group hover:bg-white/10 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Cpu className="w-6 h-6 text-purple-400 mb-2" />
                    <animated.div className="text-2xl font-bold text-purple-400">
                      {energyLevel.to((n) => `${n.toFixed(0)}%`)}
                    </animated.div>
                    <div className="text-sm text-gray-400">Energy Level</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Challenge Missions and Progress */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Map className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Challenge Missions</h2>
                </div>
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {activeMissions.map((mission, index) => (
                  <motion.div
                    key={mission.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-4 bg-white/5 rounded-lg border border-white/10 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{mission.title}</h3>
                        <span className="text-yellow-400">{mission.reward}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${mission.progress}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span>{mission.progress}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats and Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Performance Metrics</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Globe className="w-6 h-6" />, label: 'Global Rank', value: '#42' },
                  { icon: <Trophy className="w-6 h-6" />, label: 'Achievements', value: '24/50' },
                  { icon: <Target className="w-6 h-6" />, label: 'Accuracy', value: '94%' },
                  { icon: <Shield className="w-6 h-6" />, label: 'Defense', value: '850' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-4 bg-white/5 rounded-lg border border-white/10 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative flex items-center gap-3">
                      <div className="text-blue-400">{stat.icon}</div>
                      <div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                        <div className="text-xl font-bold">{stat.value}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Leaderboard and Reward Collection */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold">Leaderboard</h2>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-4 bg-white/5 rounded-lg border border-white/10 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center font-bold">
                        #{user.rank}
                      </div>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white/20"
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.specialty}</div>
                      </div>
                      <div className="ml-auto text-yellow-400">{user.points.toLocaleString()} XP</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Reward Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Hexagon className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold">Reward Collection</h2>
                </div>
                <span className="text-sm text-gray-400">{gameStats.specialItems} Items</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Quantum Core', rarity: 'Legendary', power: 2500 },
                  { name: 'Neural Amplifier', rarity: 'Epic', power: 1800 },
                  { name: 'Synapse Enhancer', rarity: 'Rare', power: 1200 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative p-4 bg-white/5 rounded-lg border border-white/10 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">{item.rarity}</p>
                        </div>
                      </div>
                      <div className="text-blue-400">{item.power} PWR</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        <AnimatePresence>
          {showProfileEdit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#1A1A2E] p-6 rounded-2xl w-full max-w-md"
              >
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400">User ID</label>
                    <input
                      type="text"
                      name="userId"
                      defaultValue={userProfile.userId}
                      className="w-full p-2 bg-white/5 rounded-lg border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Headline</label>
                    <input
                      type="text"
                      name="headline"
                      defaultValue={userProfile.headline}
                      className="w-full p-2 bg-white/5 rounded-lg border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Content Focus</label>
                    <input
                      type="text"
                      name="contentFocus"
                      defaultValue={userProfile.contentFocus}
                      className="w-full p-2 bg-white/5 rounded-lg border border-white/10 text-white"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 p-2 bg-blue-500 text-white rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProfileEdit(false)}
                      className="flex-1 p-2 bg-gray-500 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar Customization Modal */}
        <AnimatePresence>
          {showAvatarCustomization && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#1A1A2E] p-6 rounded-2xl w-full max-w-lg"
              >
                <h2 className="text-2xl font-bold mb-4">Customize Avatar</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.userId}&hair=${avatarConfig.hairstyle}&clothing=${avatarConfig.outfit}&accessories=${avatarConfig.accessory}`}
                      alt="Avatar Preview"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400">Facial Features</label>
                      <select
                        value={avatarConfig.facialFeature}
                        onChange={(e) => setAvatarConfig({ ...avatarConfig, facialFeature: e.target.value })}
                        className="w-full p-2 bg-white/5 rounded-lg border border-white/10 text-white"
                      >
                        {avatarOptions.facialFeatures.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">Hairstyle</label>
                      <select
                        value={avatarConfig.hairstyle}
                        onChange={(e) => setAvatarConfig({ ...avatarConfig, hairstyle: e.target.value })}
                        className="w-full p-2 bg-white/5 rounded-lg border border-white/10 text-white"
                      >
                        {avatarOptions.hairstyles.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">Outfit</label>
                      <select
                        value={avatarConfig.outfit}
                        onChange={(e) => setAvatarConfig({ ...avatarConfig, outfit: e.target.value })}
                        className="w-full p-2 bg-white/5 rounded-lg border border-white/10 text-white"
                      >
                        {avatarOptions.outfits.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">Accessories</label>
                      <select
                        value={avatarConfig.accessory}
                        onChange={(e) => setAvatarConfig({ ...avatarConfig, accessory: e.target.value })}
                        className="w-full p-2 bg-white/5 rounded-lg border border-white/10 text-white"
                      >
                        {avatarOptions.accessories.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleAvatarSave}
                    className="flex-1 p-2 bg-blue-500 text-white rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAvatarCustomization(false)}
                    className="flex-1 p-2 bg-gray-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(0.8); }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ProfileDashboard;
