import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Trophy, Zap, Shield, ChevronRight,
  MapPin, Calendar, Star, Users, Globe,
  Smartphone, Play, Apple, Heart, Search, Filter,
  Share2, MessageCircle, Camera, Video,
  Bike, Waves, Activity, Flag, LayoutGrid, Wrench,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const Home = () => {
  const { selectedCity } = useStore();
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const newsScrollRef = useRef(null);
  const [newsScrollPos, setNewsScrollPos] = useState(0);

  const categoryMap = [
    { name: 'All', icon: <LayoutGrid size={96} strokeWidth={1} /> },
    { name: 'Running', icon: <motion.path d="M15 22v-4l-3-3 1-6M9 22v-4l3-3M7 9l3-2 3 2M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="none" stroke="currentColor" strokeWidth="1" /> },
    { name: 'Cycling', icon: <Bike size={96} strokeWidth={1} /> },
    { name: 'Triathlon', icon: (
      <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Swimmer part */}
        <path d="M2 12c.5.5 1 .5 1.5 0s1-.5 1.5 0 1 .5 1.5 0" />
        {/* Cyclist part */}
        <circle cx="17" cy="19" r="2" />
        <path d="M15 19l2-4 2 4" />
        {/* Runner part */}
        <path d="M19 3l-2 2 2 2" />
      </svg>
    ) },
    { name: 'Swimming', icon: <Waves size={96} strokeWidth={1} /> },
    { name: 'Online', icon: <Globe size={96} strokeWidth={1} /> },
    { name: 'Workshop', icon: <Wrench size={96} strokeWidth={1} /> },
    { name: 'Marathon', icon: <Flag size={96} strokeWidth={1} /> },
  ];

  // Ultra-Professional Dynamic Running Silhouette (Matching Cycling Style)
  categoryMap[1].icon = (
    <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="16" cy="4" r="2" />
      {/* Body & Legs in high-speed stride */}
      <path d="M8 20l3-5 2-6 3-1 3 4 2-1" />
      <path d="M11 15l-3 7" />
      <path d="M13 9l-3 4-4-2" />
      {/* Motion Lines */}
      <line x1="2" y1="8" x2="5" y2="8" strokeWidth="1.5" opacity="0.8" />
      <line x1="1" y1="11" x2="6" y2="11" strokeWidth="1.5" opacity="0.8" />
      <line x1="2" y1="14" x2="5" y2="14" strokeWidth="1.5" opacity="0.8" />
    </svg>
  );

  // Ultra-Professional Triathlon Emblem (Unified Swim-Bike-Run)
  categoryMap[3].icon = (
    <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
       {/* Swimmer Part (Left) */}
       <path d="M2 14c1-1 2-1 3 0s2 1 3 0" strokeWidth="1.5" />
       <path d="M3 11l2-2 2 2" opacity="0.6" />

       {/* Cyclist Part (Center) */}
       <circle cx="12" cy="15" r="3" />
       <path d="M10 15l2-4h3l2 4" />

       {/* Runner Part (Right) */}
       <circle cx="19" cy="7" r="1.5" />
       <path d="M17 12l2-3 2 2" />
       <path d="M19 9l1.5-1.5" />

       {/* Motion Lines */}
       <line x1="2" y1="6" x2="5" y2="6" opacity="0.4" />
       <line x1="4" y1="4" x2="7" y2="4" opacity="0.4" />
    </svg>
  );

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'right' ? scrollLeft + clientWidth / 2 : scrollLeft - clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const updateScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollPosition(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  const handleNewsScroll = (direction) => {
    if (newsScrollRef.current) {
      const { scrollLeft, clientWidth } = newsScrollRef.current;
      const scrollTo = direction === 'right' ? scrollLeft + clientWidth / 1.5 : scrollLeft - clientWidth / 1.5;
      newsScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const updateNewsScrollPosition = () => {
    if (newsScrollRef.current) {
      const { scrollLeft } = newsScrollRef.current;
      // Estimate which item is first (width of first is ~500px, others ~350px)
      setNewsScrollPos(scrollLeft);
    }
  };

  const allEvents = [
    { id: 1, title: 'Mumbai Midnight Marathon 2024', date: 'Oct 15, 2024', location: 'Mumbai', category: 'Marathon', participants: '4.5k+', rating: '4.9', type: 'Physical', price: '₹1200', image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800' },
    { id: 2, title: 'Delhi Heritage Half Marathon', date: 'Nov 12, 2024', location: 'Delhi', category: 'Running', participants: '3.2k+', rating: '4.8', type: 'Physical', price: '₹800', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800' },
    { id: 3, title: 'Bangalore Tech Cyclothon', date: 'Dec 05, 2024', location: 'Bangalore', category: 'Cycling', participants: '5.1k+', rating: '4.7', type: 'Physical', price: '₹950', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?q=80&w=800' },
    { id: 4, title: 'Iron Endurance Training Camp', date: 'Jan 20, 2025', location: 'Mumbai', category: 'Workshop', participants: '120+', rating: '5.0', type: 'Physical', price: '₹4500', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
    { id: 5, title: 'Yoga for Endurance Athletes', date: 'Every Sunday', location: 'Online', category: 'Online', participants: '2.8k+', rating: '4.9', type: 'Online', price: 'Free', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800' },
    { id: 6, title: 'Metabolic Nutrition Masterclass', date: 'Oct 20, 2024', location: 'Online', category: 'Workshop', participants: '1.5k+', rating: '4.6', type: 'Online', price: '₹499', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800' },
    { id: 7, title: 'Chennai Coastal Run', date: 'Feb 10, 2025', location: 'Chennai', category: 'Running', participants: '2.1k+', rating: '4.7', type: 'Physical', price: '₹600', image: 'https://images.unsplash.com/photo-1461891263870-bd2a7ff7a6c5?q=80&w=800' },
    { id: 8, title: 'Hyderabad Cycling Grand Prix', date: 'Mar 05, 2025', location: 'Hyderabad', category: 'Cycling', participants: '1.8k+', rating: '4.8', type: 'Physical', price: '₹1500', image: 'https://images.unsplash.com/photo-1530549387074-d562c0a1c8d7?q=80&w=800' },
    { id: 9, title: 'Pune Hill Marathon', date: 'Apr 12, 2025', location: 'Pune', category: 'Marathon', participants: '3.5k+', rating: '4.9', type: 'Physical', price: '₹1100', image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800' },
    { id: 10, title: 'Global 100km Challenge', date: 'Oct 01-31, 2024', location: 'Online', category: 'Cycling', participants: '15k+', rating: '4.8', type: 'Online', price: '₹299', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800' },
    { id: 11, title: 'Kolkata River Run', date: 'May 08, 2025', location: 'Kolkata', category: 'Running', participants: '1.2k+', rating: '4.5', type: 'Physical', price: '₹500', image: 'https://images.unsplash.com/photo-1530549387074-d562c0a1c8d7?q=80&w=800' },
    { id: 12, title: 'Tri-Series Goa (Pre-Registration)', date: 'Oct 25, 2024', location: 'Goa', category: 'Triathlon', participants: '800+', rating: '5.0', type: 'Physical', price: '₹8500', image: 'https://images.unsplash.com/photo-1530549387074-d562c0a1c8d7?q=80&w=800' },
    { id: 13, title: 'Swimming Strokes Clinic', date: 'Nov 05, 2024', location: 'Bangalore', category: 'Swimming', participants: '40+', rating: '4.9', type: 'Physical', price: '₹2000', image: 'https://images.unsplash.com/photo-1530549387074-d562c0a1c8d7?q=80&w=800' },
    { id: 14, title: 'Vertical Stair Climb', date: 'Dec 15, 2024', location: 'Mumbai', category: 'Running', participants: '250+', rating: '4.7', type: 'Physical', price: '₹750', image: 'https://images.unsplash.com/photo-1461891263870-bd2a7ff7a6c5?q=80&w=800' },
    { id: 15, title: 'Virtual Marathon Training', date: 'Weekly', location: 'Online', category: 'Online', participants: '1.1k+', rating: '4.8', type: 'Online', price: '₹1200', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800' },
  ];

  const newsItems = [
    { id: 1, title: 'How to Break the 2-Hour Marathon Limit', category: 'Spotlight', date: 'Aug 24, 2026', readTime: '8 Min Read', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800' },
    { id: 2, title: 'Top 5 Recovery Meals for Endurance Athletes', category: 'Nutrition', date: 'Aug 22, 2026', readTime: '5 Min Read', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800' },
    { id: 3, title: 'Mental Fortitude: Training Your Brain for the Last 10km', category: 'Training', date: 'Aug 20, 2026', readTime: '12 Min Read', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
    { id: 4, title: 'The Rise of Virtual Cycling Communities', category: 'Tech', date: 'Aug 18, 2026', readTime: '6 Min Read', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?q=80&w=800' }
  ];

  const filteredEvents = useMemo(() => {
    let base = allEvents;
    if (activeFilter !== 'All') {
      base = base.filter(e => e.category === activeFilter);
    }
    const city = selectedCity === 'Select City' || selectedCity === 'Detecting...' ? null : selectedCity;
    if (city) {
      const cityMatches = base.filter(e => e.location === city);
      return cityMatches.length > 0 ? cityMatches : base; // Fallback to all if no city match
    }
    return base;
  }, [activeFilter, selectedCity]);

  const onlineEvents = useMemo(() => allEvents.filter(e => e.type === 'Online').slice(0, 3), []);
  const [activeLobby, setActiveLobby] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lobbyData, setLobbyData] = useState({ name: '', email: '' });

  const handleJoinSession = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setActiveLobby(null);
    setLobbyData({ name: '', email: '' });
  };

  return (
    <div className="pt-20 font-ironman">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/herosection.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          {/* Subtle accent glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block px-4 py-1.5 mb-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Forge Your Legacy</span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-6">
            ANYTHING IS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">POSSIBLE.</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium mb-12 uppercase tracking-wide">
             The ultimate athletic ecosystem in <span className="text-white">{selectedCity === 'Select City' ? 'India' : selectedCity}</span>. Join the elite community and push your boundaries.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/events" className="hero-button">Explore Events</Link>
            <Link to="/health" className="px-8 py-3 font-black uppercase tracking-widest border-2 border-white/10 rounded-md hover:bg-white hover:text-black transition-all">Training Portal</Link>
          </div>
        </div>
      </section>

      {/* Forge News Intel */}
      <section className="py-20 bg-hero-dark/30 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Forge <span className="text-primary">News</span></h2>
              <div className="h-1.5 w-20 bg-primary mt-2"></div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleNewsScroll('left')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all group"
              >
                <ChevronLeft size={20} className="text-gray-400 group-hover:text-white" />
              </button>
              <button
                onClick={() => handleNewsScroll('right')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all group"
              >
                <ChevronRight size={20} className="text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          <div
            ref={newsScrollRef}
            onScroll={updateNewsScrollPosition}
            className="flex space-x-8 overflow-x-auto pb-10 scrollbar-hide snap-x"
          >
             {newsItems.map((item, idx) => {
               // Determine if this is the "first" visible item
               // We'll use index and scroll position to highlight the first one
               const isFirstVisible = idx === 0 || (newsScrollPos > (idx * 300 - 150) && newsScrollPos < (idx * 300 + 150));

               return (
                 <div
                   key={item.id}
                   className={`group relative h-[400px] shrink-0 overflow-hidden rounded-xl transition-all duration-500 snap-start ${
                     idx === 0 ? 'w-[600px]' : 'w-[400px]'
                   }`}
                 >
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
                       <span className="text-[10px] font-black uppercase bg-primary px-3 py-1 w-fit mb-4 italic rounded-sm">{item.category}</span>
                       <h3 className={`font-black uppercase italic leading-tight mb-4 ${idx === 0 ? 'text-4xl' : 'text-2xl'}`}>{item.title}</h3>
                       <div className="flex justify-between items-end">
                          <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">{item.date} • {item.readTime}</p>
                          {idx === 0 && (
                            <button className="bg-white text-black text-[10px] font-black uppercase px-6 py-2 rounded-sm hover:bg-primary hover:text-white transition-all">
                              Know More
                            </button>
                          )}
                       </div>
                    </div>
                 </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* Quick Filters (Ironman Squared Style) */}
      <section className="py-16 bg-black border-b border-white/5 relative">
        <div className="container mx-auto px-6 relative">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-4">
               <Filter size={16} className="text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Filter By Category</span>
            </div>

            {/* Scroll Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all group"
              >
                <ChevronLeft size={20} className="text-gray-400 group-hover:text-white" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all group"
              >
                <ChevronRight size={20} className="text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={updateScrollPosition}
            className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide snap-x"
          >
            {categoryMap.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveFilter(cat.name)}
                className={`relative w-48 h-48 rounded-2xl shrink-0 transition-all duration-300 border-2 group overflow-hidden snap-start ${
                  activeFilter === cat.name
                    ? 'bg-primary/10 border-primary shadow-[0_0_40px_rgba(225,6,0,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-primary/50'
                }`}
              >
                {/* Label on Top Right - Weighted Heavy */}
                <div className="absolute top-6 right-6 z-20">
                  <span className={`text-2xl font-black italic uppercase tracking-tighter transition-colors ${
                    activeFilter === cat.name ? 'text-white' : 'text-white/80 group-hover:text-primary'
                  }`}>
                    {cat.name}
                  </span>
                </div>

                {/* Big Red Icon - Positioned at 75% depth/top */}
                <div className={`absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 transform w-full flex justify-center ${
                  activeFilter === cat.name
                    ? 'text-primary scale-[2.2] translate-y-[-15%]'
                    : 'text-primary opacity-30 group-hover:opacity-100 group-hover:scale-[2.1]'
                }`}>
                  {cat.icon}
                </div>

                {/* Depth Gradient Glow */}
                {activeFilter === cat.name && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none"></div>
                )}
              </button>
            ))}
          </div>

          {/* Dotted Progress Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  (scrollPosition * 2) >= i - 0.5 && (scrollPosition * 2) <= i + 0.5
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Featured Events Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">
                 {selectedCity !== 'Select City' ? `Near ${selectedCity}` : 'Elite Lineup'}
               </span>
               <h2 className="text-5xl font-black uppercase italic tracking-tighter">Premier <span className="text-primary">Events</span></h2>
            </div>
            <Link to="/events" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-primary flex items-center group transition-colors">
              Full Calendar <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEvents.slice(0, 4).map(event => (
              <div key={event.id} className="glass-card group overflow-hidden border-none cursor-pointer flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-sm uppercase italic tracking-widest">
                    {event.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-md">
                    {event.price}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase text-gray-500 flex items-center">
                        <MapPin size={12} className="mr-1.5 text-primary" /> {event.location}
                      </span>
                      <div className="flex items-center text-yellow-500 text-[10px] font-black">
                        <Star size={12} className="fill-current mr-1" /> {event.rating}
                      </div>
                    </div>
                    <h3 className="text-xl font-black uppercase italic mb-6 group-hover:text-primary transition-colors leading-tight line-clamp-2">{event.title}</h3>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-5">
                    <div className="text-[10px] font-black uppercase text-gray-400 flex items-center">
                      <Calendar size={14} className="mr-2 text-primary" /> {event.date}
                    </div>
                    <div className="flex items-center text-[10px] font-black uppercase text-gray-500">
                      <Users size={14} className="mr-2" /> {event.participants}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Events Showcase */}
      <section className="py-20 bg-primary/5 relative">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">Global Access</span>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter">Online <span className="text-primary">Connect</span></h2>
            </div>
            <Link to="/events" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-primary flex items-center group transition-colors">
              View All <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
             {onlineEvents.map((event, idx) => (
               <div key={event.id} className="glass-card aspect-square relative group overflow-hidden border-none shadow-2xl !rounded-2xl">
                  {/* Image Background */}
                  <img src={event.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center space-x-2 mb-4">
                       <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Live Session</span>
                    </div>

                    <h4 className="text-2xl font-black uppercase italic mb-4 leading-tight tracking-tighter">{event.title}</h4>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
                        <Users size={12} className="mr-2 text-primary" /> {event.participants} Athletes
                      </div>
                      <button
                        onClick={() => setActiveLobby(event)}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors flex items-center group/btn"
                      >
                        Enter Lobby <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Lobby Overlay - Slide from right */}
                  <AnimatePresence>
                    {activeLobby?.id === event.id && (
                      <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4 }}
                        className="absolute inset-0 bg-black z-30 p-8 flex flex-col justify-center"
                      >
                         <button
                           onClick={() => setActiveLobby(null)}
                           className="absolute top-6 right-6 text-gray-500 hover:text-white"
                         >
                           <ChevronLeft size={24} />
                         </button>
                         <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Join <span className="text-primary">Session</span></h3>
                         <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-8">Secure your spot in the lobby</p>

                         <form onSubmit={handleJoinSession} className="space-y-4">
                            <input
                              type="text"
                              required
                              placeholder="FULL NAME"
                              value={lobbyData.name}
                              onChange={(e) => setLobbyData({...lobbyData, name: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 p-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-colors"
                            />
                            <input
                              type="email"
                              required
                              placeholder="ATHLETE EMAIL"
                              value={lobbyData.email}
                              onChange={(e) => setLobbyData({...lobbyData, email: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 p-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-colors"
                            />
                            <button type="submit" className="hero-button w-full py-4 text-[10px]">
                              Join Session
                            </button>
                         </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Top Right Floating ID */}
                  <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                     <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 px-3 py-1 rounded-sm">
                       INTEL-{event.id.toString().padStart(3, '0')}
                     </span>
                  </div>
               </div>
             ))}
          </div>

          {/* Success Popup */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-card max-w-lg p-12 text-center relative border-primary/20"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Trophy className="text-primary" size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">Registration <span className="text-primary">Successful</span></h3>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-relaxed mb-10">
                    The link of the session and details have been sent to you via email. Thank you for showing your interest. We hope you lead a healthy lifestyle ahead!
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="text-primary text-xl font-black uppercase italic tracking-tighter hover:text-white transition-colors animate-pulse"
                  >
                    THANK YOU
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Prepare, Fuel, Recover (Ironman Well-being Style) */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 text-center mb-20 max-w-4xl">
           <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-10 leading-[1.1] bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
             "SWIM 2.4 MILES, BIKE 112 MILES, RUN 26.2 MILES, <br className="hidden md:block"/> BRAG FOR THE REST OF YOUR LIFE."
           </motion.h2>
           <p className="text-[11px] text-primary font-black uppercase tracking-[0.5em] mb-4">— JOHN COLLINS, 1978</p>
           <p className="text-gray-400 text-sm uppercase tracking-wider font-medium leading-relaxed max-w-2xl mx-auto">
             The PaceForge Journey is a life changing experience that proves Anything is Possible. Ensure you have the right mix of training, recovery and nutrition on your journey to your finish line.
           </p>
        </div>

        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Prepare', desc: 'Your training is the heart of your PaceForge preparation. Training with purpose is the best way to reach your finish line and get there faster.', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
                { title: 'Fuel', desc: 'Nutrition is one of our favorite topics. From daily fueling to the complexities of race day, we’re here to help you power through.', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800' },
                { title: 'Recover', desc: 'Restoring and replenishing your body helps you build fitness and perform at your best on race day. Make the most of your recovery with elite protocols.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800' }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-none group overflow-hidden flex flex-col shadow-2xl">
                   <div className="h-64 overflow-hidden relative">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                   </div>
                   <div className="p-10 text-black flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">{item.title}</h3>
                        <p className="text-gray-600 text-[13px] leading-relaxed mb-12 font-medium">{item.desc}</p>
                      </div>
                      <button className="flex items-center w-full group/btn">
                         <span className="flex-1 text-[11px] font-black uppercase tracking-[0.2em] text-left py-4 px-6 border border-black/10 group-hover/btn:bg-black group-hover/btn:text-white transition-all">Learn More</span>
                         <span className="bg-black text-white p-4 border border-black transition-all group-hover/btn:bg-primary group-hover/btn:border-primary flex items-center justify-center">
                            <ArrowRight size={20} />
                         </span>
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Connect With Us */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-xl text-center lg:text-left">
                 <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">
                    Join The <br className="hidden md:block"/> <span className="text-primary">Global</span> Community
                 </h2>
                 <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-12 leading-loose">
                    Connect with 50,000+ elite athletes, share your victories, and get exclusive PaceForge intel before anyone else.
                 </p>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                    <a href="#" className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all border border-white/10 shadow-xl group">
                      <Camera size={24} className="text-gray-400 group-hover:text-white" />
                    </a>
                    <a href="#" className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all border border-white/10 shadow-xl group">
                      <Share2 size={24} className="text-gray-400 group-hover:text-white" />
                    </a>
                    <a href="#" className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all border border-white/10 shadow-xl group">
                      <Video size={24} className="text-gray-400 group-hover:text-white" />
                    </a>
                    <a href="#" className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all border border-white/10 shadow-xl group">
                      <Globe size={24} className="text-gray-400 group-hover:text-white" />
                    </a>
                 </div>
              </div>
              <div className="glass-card p-12 w-full lg:w-[500px] border-none shadow-2xl relative">
                 <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                 <h3 className="text-2xl font-black uppercase italic mb-6">Forge Intel</h3>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-10 leading-relaxed">Get race alerts, metabolic tips, and exclusive event access straight to your inbox.</p>
                 <form className="space-y-6">
                    <div className="relative group">
                       <input type="email" className="input-hero !bg-black/50 !rounded-md" placeholder="ATHLETE@DOMAIN.COM" />
                    </div>
                    <button className="hero-button w-full py-5 !rounded-md shadow-2xl">Sign Up For Intel</button>
                    <p className="text-[9px] text-gray-600 font-bold uppercase text-center tracking-widest">Anything Is Possible. Unsubscribe at any time.</p>
                 </form>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
