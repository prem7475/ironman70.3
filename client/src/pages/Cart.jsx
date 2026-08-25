import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, X, ArrowRight, Minus, Plus, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-6 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-gray-500 mx-auto border border-white/10">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Your Bag is <span className="text-primary">Empty</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Looks like you haven't added any gear yet.</p>
          <Link to="/shop" className="hero-button inline-block w-full">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">Checkout</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Your <span className="text-primary">Gear</span> Bag</h1>
        <div className="h-1.5 w-32 bg-primary mt-4 rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 flex items-center space-x-6 border-none"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">{item.category}</p>
                    <h3 className="text-xl font-black uppercase italic text-white leading-none">{item.name}</h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center space-x-4 bg-black/40 rounded-lg p-1 border border-white/5">
                    <button className="p-1 hover:text-primary transition-colors"><Minus size={14}/></button>
                    <span className="text-sm font-black italic">{item.quantity}</span>
                    <button className="p-1 hover:text-primary transition-colors"><Plus size={14}/></button>
                  </div>
                  <p className="text-xl font-black italic text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <button
            onClick={clearCart}
            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors flex items-center ml-4"
          >
            Clear All Items
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-10 border-none bg-gradient-to-br from-white/5 to-transparent">
            <h3 className="text-2xl font-black uppercase italic mb-8">Summary</h3>
            <div className="space-y-4 text-[10px] font-black uppercase tracking-widest border-b border-white/5 pb-8 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-white">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline mb-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total</span>
              <span className="text-4xl font-black italic text-primary">₹{total.toLocaleString()}</span>
            </div>
            <button className="hero-button w-full flex items-center justify-center space-x-3 group">
              <CreditCard size={20} />
              <span>Checkout Now</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary text-center">
              Athlete Exclusive: Free shipping on orders over ₹5,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
