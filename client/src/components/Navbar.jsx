import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { User as UserIcon, LogIn, MapPin, ChevronDown, LogOut, Search, ShoppingBag, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const Navbar = () => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const searchRef = useRef(null);
  const { user, logout, selectedCity, setSelectedCity, cart, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Events', path: '/events' },
    { name: 'Training', path: '/health' },
    { name: 'Become a Forger', path: '/register' },
    { name: 'Results', path: user ? '/profile' : '/login?redirect=/profile' },
    { name: 'Shop', path: '/shop' },
  ];

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    };
    if (showSearchBar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchBar]);

  const handleLocationDetect = () => {
    setSelectedCity('Detecting...');
    setTimeout(() => {
      setSelectedCity('Mumbai');
      setShowCityDropdown(false);
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowMobileMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setShowSearchBar(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-white/5 font-ironman">
      <div className="bg-primary h-1 w-full"></div>

      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group shrink-0" onClick={() => setShowMobileMenu(false)}>
          <img src="/logo.png" alt="PaceForge" className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" onError={(e) => e.target.style.display='none'}/>
          <div className="text-2xl font-black uppercase tracking-tighter italic">
            PACE<span className="text-primary">FORGE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-primary active' : 'hover:text-primary'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-md border border-white/10 hover:border-primary/50 transition-all"
            >
              <MapPin size={12} className="text-primary" />
              <span className="text-[9px] font-black uppercase tracking-widest">{selectedCity}</span>
              <ChevronDown size={10} className={`transition-transform duration-300 ${showCityDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showCityDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 right-0 w-48 bg-hero-dark border border-white/10 rounded-lg overflow-hidden shadow-2xl z-[60]"
                >
                  <button
                    onClick={handleLocationDetect}
                    className="w-full text-left px-4 py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-colors flex items-center space-x-2"
                  >
                    <MapPin size={10} />
                    <span>Auto Detect</span>
                  </button>
                  <div className="border-t border-white/5 my-1"></div>
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => { setSelectedCity(city); setShowCityDropdown(false); }}
                      className="w-full text-left px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
            <button onClick={() => setShowSearchBar(!showSearchBar)} className="text-gray-400 hover:text-white transition-colors"><Search size={18}/></button>
            <Link to="/cart" id="cart-icon" className="text-gray-400 hover:text-white transition-colors relative">
              <ShoppingBag size={18}/>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[8px] font-black flex items-center justify-center rounded-full text-white">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Hamburger Menu Toggle */}
            <button
              className="xl:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden xl:block">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2 group">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-all shadow-lg shadow-primary/20">
                      <UserIcon size={18} className="text-white" />
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-primary transition-colors"><LogOut size={16}/></button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-all">
                  <LogIn size={14} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Search Bar */}
      <AnimatePresence>
        {showSearchBar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 z-40"
          >
            <div className="container mx-auto px-6 py-6" ref={searchRef}>
              <form onSubmit={handleSearch} className="w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH FOR EVENTS, TRAINING, OR GEAR..."
                  className="w-full bg-white/5 border border-white/10 focus:border-primary py-4 pl-12 pr-10 text-xl font-black uppercase italic outline-none transition-all rounded-md"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 top-[84px] bg-black z-50 xl:hidden overflow-y-auto"
          >
            <div className="p-6 flex flex-col space-y-8">
              {/* Mobile Nav Items */}
              <div className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={({ isActive }) =>
                      `text-2xl font-black uppercase italic tracking-widest transition-colors ${isActive ? 'text-primary' : 'text-white hover:text-primary'}`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              <div className="h-px bg-white/10"></div>

              {/* Mobile City Selector */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Current Base</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleLocationDetect}
                    className="col-span-2 flex items-center justify-center space-x-2 bg-primary/10 border border-primary/20 py-4 rounded-md text-primary font-black uppercase text-[10px] tracking-widest"
                  >
                    <MapPin size={14} />
                    <span>Auto Detect</span>
                  </button>
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => { setSelectedCity(city); setShowMobileMenu(false); }}
                      className={`py-3 rounded-md border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all ${selectedCity === city ? 'bg-primary border-primary text-white' : 'bg-white/5 text-gray-400'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/10"></div>

              {/* Mobile User Actions */}
              <div className="pb-10">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      to="/profile"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <UserIcon size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase italic leading-none">{user.name}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-primary mt-1">View Athlete Profile</p>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-primary transition-colors flex items-center justify-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Terminate Session</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="hero-button w-full flex items-center justify-center py-5 text-sm"
                  >
                    <LogIn size={18} className="mr-3" />
                    Sign In to Forge
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
