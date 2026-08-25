import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, ChevronRight, Filter } from 'lucide-react';
import useStore from '../store/useStore';

const Shop = () => {
  const addToCart = useStore((state) => state.addToCart);
  const [animatingItem, setAnimatingItem] = useState(null);

  const products = [
    { id: 1, name: 'PaceForge Tech Tee', price: 1499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', rating: 4.8 },
    { id: 2, name: 'Elite Carbon Wheels', price: 85000, category: 'Cycling', image: 'https://images.unsplash.com/photo-1532298229144-0ee0c9ec5cd0?q=80&w=800', rating: 5.0 },
    { id: 3, name: 'Hydration Vest 5L', price: 4200, category: 'Running', image: 'https://images.unsplash.com/photo-1596460654972-273f55099c23?q=80&w=800', rating: 4.7 },
    { id: 4, name: 'Recovery Massage Gun', price: 12500, category: 'Recovery', image: 'https://images.unsplash.com/photo-1631541909061-70eca9003504?q=80&w=800', rating: 4.9 },
    { id: 5, name: 'Pro Swim Goggles', price: 2100, category: 'Swimming', image: 'https://images.unsplash.com/photo-1557939403-1760a0e47505?q=80&w=800', rating: 4.6 },
    { id: 6, name: 'Energy Gel Pack (x12)', price: 1800, category: 'Nutrition', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=800', rating: 4.8 },
  ];

  const handleAddToCart = (product, e) => {
    const card = e.currentTarget.closest('.glass-card');
    const img = card.querySelector('img');
    const rect = img.getBoundingClientRect();
    const cartIcon = document.getElementById('cart-icon');
    const cartRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 100, top: 20 };

    setAnimatingItem({
      id: Date.now(),
      image: product.image,
      start: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      },
      end: {
        x: cartRect.left,
        y: cartRect.top,
        width: 20,
        height: 20
      }
    });

    addToCart(product);

    setTimeout(() => {
      setAnimatingItem(null);
    }, 800);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <AnimatePresence>
        {animatingItem && (
          <motion.img
            key={animatingItem.id}
            src={animatingItem.image}
            initial={{
              position: 'fixed',
              left: animatingItem.start.x,
              top: animatingItem.start.y,
              width: animatingItem.start.width,
              height: animatingItem.start.height,
              borderRadius: '12px',
              zIndex: 1000,
              opacity: 1
            }}
            animate={{
              left: animatingItem.end.x,
              top: animatingItem.end.y,
              width: animatingItem.end.width,
              height: animatingItem.end.height,
              opacity: 0,
              scale: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="pointer-events-none object-cover"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">Official Gear</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">The <span className="text-primary">Forge</span> Shop</h1>
          <div className="h-1.5 w-32 bg-primary mt-4 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">
            <Filter size={14} className="text-primary" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card group overflow-hidden border-none flex flex-col h-full"
          >
            <div className="h-80 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-md uppercase italic tracking-widest">
                {product.category}
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-yellow-500 text-[10px] font-black">
                    <Star size={14} className="fill-current mr-1" /> {product.rating}
                  </div>
                  <span className="text-2xl font-black italic text-white">₹{product.price.toLocaleString()}</span>
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-6 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
              </div>
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="hero-button w-full flex items-center justify-center space-x-2 group/btn"
              >
                <ShoppingBag size={18} />
                <span>Add to Bag</span>
                <ChevronRight size={18} className="opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
