import React, { useState } from 'react';
import { User, Settings, Bell, Menu, X, Gift, Compass, BookOpen, Trophy, Store, Users } from 'lucide-react'; // Added Users for Guild icon
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import NotificationsPanel from './notifications/NotificationsPanel';
import SettingsPanel from './settings/SettingsPanel';
import logoImage from '../assets/logo.png';

const Navigation = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: <Compass className="w-5 h-5" />, label: 'Explore', path: '/about' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'My Courses', path: '/courses' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Achievements', path: '/achievements' },
    { icon: <Users className="w-5 h-5" />, label: 'Guild', path: '/guild' }, // Added Guild menu item
    { icon: <Gift className="w-5 h-5" />, label: 'Rewards', path: '/rewards' },
    { icon: <Store className="w-5 h-5" />, label: 'Store', path: '/store' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/10 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoImage} alt="UNAI Verse Logo" className="w-8 h-8" />
              <span className="text-xl font-bold">UNAI TECH</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 ml-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-teal-400 to-purple-500 text-white hover:from-teal-500 hover:to-purple-600'
                    } ${
                      item.label === 'My Courses' ? 'relative overflow-hidden' : ''
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.label === 'My Courses' && (
                      <span className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              className="nav-icon-button relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>

            <button
              className="nav-icon-button"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-6 h-6" />
            </button>

            <Link
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 text-white hover:from-teal-500 hover:to-purple-600 transition-all duration-300"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden nav-icon-button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-white/10">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-teal-400 to-purple-500 text-white hover:from-teal-500 hover:to-purple-600'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Notifications Panel */}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}

      {/* Settings Panel */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </nav>
  );
};

export default Navigation;
