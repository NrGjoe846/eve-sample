import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const Store = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="absolute top-8 left-8 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Space Explorer Academy</h1>
          <p className="text-lg text-gray-400">
            Embark on your journey through the cosmos of coding.
          </p>
        </div>

        {/* Section 1: Buy Courses Using Gems */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-300 mb-8 text-center">Buy Courses Using Gems</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Beginner',
                price: '50 Gems',
                description: 'Perfect for getting started',
                image: 'https://i.pinimg.com/736x/9b/dd/61/9bdd617089e58df7e2b1a565127c680c.jpg'
              },
              {
                name: 'Intermediate',
                price: '150 Gems',
                description: 'Take your skills further',
                image: 'https://i.pinimg.com/474x/35/f4/a3/35f4a33e79f0949492251ef51884cb5d.jpg'
              },
              {
                name: 'Advanced',
                price: '300 Gems',
                description: 'Master the universe of coding',
                image: 'https://i.pinimg.com/474x/d8/ba/56/d8ba5696459b0a2c034babd31e5cc9c8.jpg'
              }
            ].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gray-900 rounded-2xl p-8 border border-blue-500/20 shadow-lg"
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={course.image}
                    alt={`${course.name} astronaut`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">{course.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-blue-400">{course.price}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full font-medium bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                >
                  Enroll Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Buy Gems Using Gold Coins */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Buy Gems Using Gold Coins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter Pack',
                price: '100 Coins',
                gems: '50 Gems',
                image: 'https://i.pinimg.com/474x/85/30/49/85304998efcd1abb394635b9d334b5b5.jpg'
              },
              {
                name: 'Pro Pack',
                price: '250 Coins',
                gems: '150 Gems',
                image: 'https://i.pinimg.com/474x/b6/2a/d0/b62ad0e19df3aff234e5317da3b05e3a.jpg'
              },
              {
                name: 'Ultimate Pack',
                price: '500 Coins',
                gems: '300 Gems',
                image: 'https://i.pinimg.com/474x/4d/ae/e0/4daee0056d2aa40f807d309cff508923.jpg'
              }
            ].map((pack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gray-900 rounded-2xl p-8 border border-yellow-500/20 shadow-lg"
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={pack.image}
                    alt={`${pack.name} pack`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{pack.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{pack.gems}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-yellow-400">{pack.price}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full font-medium bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
                >
                  Purchase Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Guild Membership */}
        <section>
          <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">Guild Membership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Explorer Guild',
                price: 'Free',
                features: ['Access to community forums', 'Basic challenges']
              },
              {
                name: 'Adventurer Guild',
                price: '100 Gems',
                features: ['All Explorer features', 'Priority support', 'Exclusive events']
              }
            ].map((guild, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gray-900 rounded-2xl p-8 border border-purple-500/20 shadow-lg"
              >
                <h3 className="text-xl font-bold text-purple-400 mb-4">{guild.name}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {guild.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-purple-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-purple-400">{guild.price}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full font-medium bg-purple-500 hover:bg-purple-600 transition-all duration-300"
                >
                  Join Guild
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Store;
