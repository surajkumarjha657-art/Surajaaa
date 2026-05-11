import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Utensils, Coffee, Leaf, Zap, Star } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'All', icon: Utensils },
    { name: 'North Indian Snacks', icon: Leaf },
    { name: 'Thalis', icon: Zap },
    { name: 'Tea & Coffee', icon: Coffee },
    { name: 'Desserts', icon: Star },
    { name: 'Beverages', icon: Coffee },
  ];

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const q = query(collection(db, 'dishes'), orderBy('name', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
        // Fallback data for demo if database is empty
        setDishes([
          { id: '1', name: 'Signature Mutton Thali', price: 550, category: 'Thalis', description: 'Our most loved thali with slow-cooked mutton, parantha, rice, and sides.', isChefRecommended: true, imageUrl: 'https://picsum.photos/seed/thali1/400/400' },
          { id: '2', name: 'Triveni Shammi Kebab', price: 380, category: 'North Indian Snacks', description: 'Melt-in-mouth lamb kebabs served with mint chutney.', isChefRecommended: true, imageUrl: 'https://picsum.photos/seed/kebab1/400/400' },
          { id: '3', name: 'Mixed Veg Thali', price: 420, category: 'Thalis', description: 'Seasonal vegetables, dal tadka, rice, and laccha parantha.', isChefRecommended: false, imageUrl: 'https://picsum.photos/seed/vegthali/400/400' },
          { id: '4', name: 'Masala Ginger Tea', price: 80, category: 'Tea & Coffee', description: 'The famous Triveni chai brewed with fresh ginger.', isChefRecommended: false, imageUrl: 'https://picsum.photos/seed/chai/400/400' },
          { id: '5', name: 'Hot Butter Apple Pie', price: 180, category: 'Desserts', description: 'Warm apple pie served with a dollop of cream.', isChefRecommended: true, imageUrl: 'https://picsum.photos/seed/pie/400/400' },
          { id: '6', name: 'Paneer Tikka', price: 320, category: 'North Indian Snacks', description: 'Marinated paneer cubes grilled to perfection.', isChefRecommended: false, imageUrl: 'https://picsum.photos/seed/paneer/400/400' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-cafe-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 pb-12 border-b border-cafe-brown/10">
          <div className="space-y-4 max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-cafe-olive text-[11px] uppercase tracking-[0.3em] font-bold block"
            >
              Curated Selection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-serif text-cafe-brown italic"
            >
              Sensory <span className="text-cafe-terracotta not-italic">Menu</span>
            </motion.h1>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cafe-brown/40" size={16} />
            <input 
              type="text" 
              placeholder="Find a dish..."
              className="w-full bg-transparent border-b border-cafe-brown/20 py-3 pl-12 pr-4 focus:outline-none focus:border-cafe-terracotta transition-colors text-sm italic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mb-20 overflow-x-auto">
          <div className="flex gap-10 whitespace-nowrap pb-4 border-b border-cafe-brown/5">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-4 ${
                  activeCategory === cat.name 
                    ? 'text-cafe-terracotta' 
                    : 'text-cafe-brown/40 hover:text-cafe-brown'
                }`}
              >
                {cat.name}
                {activeCategory === cat.name && (
                  <motion.div 
                    layoutId="catUnderline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-terracotta" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-cafe-brown/5">
                  <img 
                    src={dish.imageUrl} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {dish.isChefRecommended && (
                    <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-md px-4 py-2 border-l border-b border-cafe-brown/10 text-[9px] font-bold uppercase tracking-widest text-cafe-terracotta z-10">
                       Chef Recommended
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-2xl font-serif text-cafe-brown italic group-hover:text-cafe-terracotta transition-colors">{dish.name}</h3>
                    <div className="h-[1px] flex-grow mx-4 bg-cafe-brown/10"></div>
                    <span className="text-cafe-brown font-bold text-sm">₹{dish.price}</span>
                  </div>
                  <p className="text-xs text-cafe-dark/60 leading-relaxed font-light mb-6 italic">
                    {dish.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDishes.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-cafe-dark/40 italic">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
