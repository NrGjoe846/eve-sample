import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCurrencyStore } from './useCurrencyStore';

interface StoreItem {
  id: string;
  title: string;
  amount: number;
  price: string;
  image: string;
  type: 'gems' | 'gold';
}

const StoreItems = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gems' | 'gold'>('gems');
  const { addGems, addGold } = useCurrencyStore();

  const storeItems: StoreItem[] = [
    { id: 'gem1', title: 'FISTFUL OF GEMS', amount: 100, price: '$0.99', image: '💎', type: 'gems' },
    { id: 'gem2', title: 'BUNCH OF GEMS', amount: 500, price: '$4.99', image: '💎', type: 'gems' },
    { id: 'gem3', title: 'PILE OF GEMS', amount: 1200, price: '$9.99', image: '💎', type: 'gems' },
    { id: 'gold1', title: 'POUCH OF GOLD', amount: 1000, price: '$0.99', image: '🪙', type: 'gold' },
    { id: 'gold2', title: 'BAG OF GOLD', amount: 5000, price: '$4.99', image: '🪙', type: 'gold' },
    { id: 'gold3', title: 'CHEST OF GOLD', amount: 12000, price: '$9.99', image: '🪙', type: 'gold' },
  ];

  const filteredItems = storeItems.filter(item => item.type === activeTab);

  const handleBuy = (item: StoreItem) => {
    setSelectedItem(item.id);
    setTimeout(() => {
      setSelectedItem(null);
      if (item.type === 'gems') addGems(item.amount);
      if (item.type === 'gold') addGold(item.amount);
    }, 1000);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center mb-6">
        <div className="relative flex rounded-xl tech-border p-1">
          <motion.div
            className="absolute h-full bg-cyan-500/30 rounded-xl"
            animate={{ x: activeTab === 'gems' ? 0 : '100%', width: '50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <button
            className={`relative px-6 py-2 font-bold ${activeTab === 'gems' ? 'text-cyan-300 neon-text' : 'text-gray-400'}`}
            onClick={() => setActiveTab('gems')}
          >
            GEMS
          </button>
          <button
            className={`relative px-6 py-2 font-bold ${activeTab === 'gold' ? 'text-yellow-300 neon-text' : 'text-gray-400'}`}
            onClick={() => setActiveTab('gold')}
          >
            GOLD
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            className="card-3d p-6 rounded-xl bg-gradient-to-br from-cyan-600/20 to-purple-600/20 tech-border"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div className="text-5xl mb-4 gem-shine" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              {item.image}
            </motion.div>
            <h3 className="text-lg font-bold text-white neon-text">{item.title}</h3>
            <p className="text-2xl text-white">{item.amount.toLocaleString()}</p>
            <motion.button
              className={`mt-4 w-full py-2 rounded bg-gradient-to-r ${item.type === 'gems' ? 'from-cyan-500 to-blue-600' : 'from-yellow-500 to-amber-600'} pulse-glow`}
              onClick={() => handleBuy(item)}
              disabled={selectedItem === item.id}
              whileHover={{ scale: 1.05 }}
            >
              {selectedItem === item.id ? 'PROCESSING...' : item.price}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoreItems;
