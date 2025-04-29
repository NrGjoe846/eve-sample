import React, { useState, useEffect } from 'react';
import { Settings, Volume2, Bell, Shield, Palette, X, Eye, Sparkles, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [volume, setVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState('friends');
  const [panelColor, setPanelColor] = useState('bg-black/90');
  const [isChanging, setIsChanging] = useState(false);
  const [instructionText, setInstructionText] = useState('Click anywhere to customize the dashboard');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');

  const fontSizes = [
    { id: 'small', name: 'Small', scale: '0.875' },
    { id: 'medium', name: 'Medium', scale: '1' },
    { id: 'large', name: 'Large', scale: '1.125' }
  ];

  const colors = [
    'bg-black/90',
    'bg-blue-900/90',
    'bg-purple-900/90',
    'bg-indigo-900/90'
  ];

  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => setIsChanging(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isChanging]);

  useEffect(() => {
    applyFontSize(fontSize);
  }, []);

  const handlePanelClick = () => {
    setIsChanging(true);
    setPanelColor(prev => {
      const currentIndex = colors.indexOf(prev);
      return colors[(currentIndex + 1) % colors.length];
    });
    setInstructionText(prev => 
      prev === 'Click anywhere to customize the dashboard'
        ? 'Dashboard customization mode activated!'
        : 'Click anywhere to customize the dashboard'
    );
  };

  const applyFontSize = (size: string) => {
    setFontSize(size);
    const scale = fontSizes.find(fs => fs.id === size)?.scale || '1';
    document.documentElement.style.fontSize = `${parseFloat(scale) * 16}px`;
    localStorage.setItem('fontSize', size);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`absolute top-16 right-4 w-96 max-h-[80vh] overflow-y-auto backdrop-blur-xl ${panelColor} rounded-xl border border-white/10 shadow-2xl transition-colors duration-300`}
      onClick={handlePanelClick}
    >
      <div className="sticky top-0 bg-inherit p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold">Settings</h3>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }} 
            className="p-1 hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Font Size */}
        <motion.div 
          className="space-y-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-400">Font Size</h4>
            <Type className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {fontSizes.map((size) => (
              <motion.button
                key={size.id}
                onClick={(e) => {
                  e.stopPropagation();
                  applyFontSize(size.id);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg flex items-center justify-center ${
                  fontSize === size.id 
                    ? 'bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10'
                } border hover:bg-white/10 transition-all duration-300`}
              >
                <span className="text-sm" style={{ fontSize: `${parseFloat(size.scale) * 1}em` }}>
                  {size.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Volume Control */}
        <motion.div 
          className="space-y-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-400">Sound</h4>
            <Volume2 className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-full accent-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>

        {/* Notifications */}
        <motion.div 
          className="flex items-center justify-between"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <h4 className="text-sm font-medium">Notifications</h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </motion.div>

        {/* Privacy */}
        <motion.div 
          className="space-y-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-400" />
            <h4 className="text-sm font-medium">Privacy</h4>
          </div>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </motion.div>
      </div>

      <motion.div 
        className="sticky bottom-0 bg-inherit p-4 border-t border-white/10"
        whileHover={{ scale: 1.02 }}
      >
        <motion.button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-300"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPanel;
