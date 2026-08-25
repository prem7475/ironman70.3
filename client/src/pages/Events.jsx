import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Trophy, ChevronRight, Users, Star, Info } from 'lucide-react';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Running', 'Cycling', 'Triathlon', 'Swimming', 'Marathon', 'Workshop'];

  const events = [
    {
      id: 1,
      title: 'Mumbai Midnight Marathon 2024',
      date: 'Oct 15, 2024',
      time: '11:00 PM',
      location: 'Marine Drive, Mumbai',
      price: '₹1,200',
      category: 'Marathon',
      difficulty: 'Elite',
      participants: '4.5k+ Joined',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200',
      description: 'Experience the magic of Mumbai at night. A flat, fast course along the iconic coastline pulse with the energy of thousands of runners.',
      highlights: ['AIMS Certified Course', 'Midnight Start', 'Elite Pacer Groups', 'Recovery Zones by PaceForge']
    },
    {
      id: 2,
      title: 'Delhi Heritage Half Marathon',
      date: 'Nov 12, 2024',
      time: '06:00 AM',
      location: 'Rajpath, Delhi',
      price: '₹800',
      category: 'Running',
      difficulty: 'Intermediate',
      participants: '3.2k+ Joined',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200',
      description: 'Run through history. This route takes you past India Gate, Humayun\'s Tomb and other architectural marvels of the capital.',
      highlights: ['Heritage Route', 'Flat Terrain', 'Post-run Breakfast', 'Cultural Performances']
    },
    {
      id: 3,
      title: 'Bangalore Tech Cyclothon',
      date: 'Dec 05, 2024',
      time: '05:30 AM',
      location: 'Nandi Hills, Bangalore',
      price: '₹950',
      category: 'Cycling',
      difficulty: 'Advanced',
      participants: '5.1k+ Joined',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?q=80&w=1200',
      description: 'The ultimate climbing challenge for cyclists in the Garden City. Test your gears and your grit on the loops of Nandi.',
      highlights: ['1200m Elevation Gain', 'Technical Descents', 'Mechanical Support', 'Chip Timing']
    },
    {
      id: 4,
      title: 'Iron Endurance Training Camp',
      date: 'Jan 20, 2025',
      time: '08:00 AM',
      location: 'Sanjay Gandhi National Park, Mumbai',
      price: '₹4,500',
      category: 'Workshop',
      difficulty: 'Professional',
      participants: '120+ Joined',
      rating: '5.0',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
      description: 'A 3-day intensive workshop covering transitions, metabolic efficiency, and mental conditioning for long-distance athletes.',
      highlights: ['Expert Coaching', 'Personal Biometric Analysis', 'Nutritional Planning', 'Simulation Drills']
    },
    {
      id: 5,
      title: 'Goa Coastal Triathlon',
      date: 'Feb 15, 2025',
      time: '06:15 AM',
      location: 'Miramar Beach, Goa',
      price: '₹6,500',
      category: 'Triathlon',
      difficulty: 'Extreme',
      participants: '850+ Joined',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1530549387074-d562c0a1c8d7?q=80&w=1200',
      description: 'Swim in the Arabian Sea, cycle through the scenic Goan villages, and run along the golden sands. The most beautiful race in India.',
      highlights: ['Olympic & Sprint Distances', 'Open Water Swim', 'Rolling Bike Course', 'Beach Finish Party']
    },
    {
      id: 6,
      title: 'Pune Hill Ultra Marathon',
      date: 'Mar 10, 2025',
      time: '04:00 AM',
      location: 'Lonavala, Pune',
      price: '₹1,800',
      category: 'Marathon',
      difficulty: 'Extreme',
      participants: '1.2k+ Joined',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1461891263870-bd2a7ff7a6c5?q=80&w=1200',
      description: 'Push your boundaries with 50km of pure grit. This ultra takes you through the misty western ghats and challenging inclines.',
      highlights: ['50km & 75km Categories', 'Trail & Road Mix', 'Hydration Support', 'Eco-friendly Race']
    }
  ];

  const filteredEvents = events.filter(e =>
    activeFilter === 'All' || e.category === activeFilter
  );

  if (selectedEvent) {
    return (
      <div className="pt-24 pb-12 container mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setSelectedEvent(null)}
          className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] flex items-center hover:text-primary transition-colors bg-white/5 px-5 py-2.5 rounded-lg border border-white/10"
        >
          <ChevronRight size={16} className="rotate-180 mr-2" /> Back to Dashboard
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card overflow-hidden border-none !rounded-2xl">
              <div className="h-[350px] relative">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-8">
                  <div>
                    <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-md uppercase italic tracking-widest mb-3 inline-block">
                      {selectedEvent.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">{selectedEvent.title}</h1>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-b border-white/5 pb-8">
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Timing</p>
                    <p className="font-bold text-sm uppercase italic flex items-center"><Clock size={14} className="mr-2 text-primary" /> {selectedEvent.time}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Location</p>
                    <p className="font-bold text-sm uppercase italic flex items-center"><MapPin size={14} className="mr-2 text-primary" /> {selectedEvent.location.split(',')[0]}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Fee</p>
                    <p className="font-black text-xl text-primary italic">{selectedEvent.price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Level</p>
                    <p className="font-bold text-sm uppercase italic">{selectedEvent.difficulty}</p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-400 font-medium">
                  <h3 className="text-white text-xl font-black uppercase italic mb-4">Event Description</h3>
                  <p className="leading-relaxed mb-6">
                    {selectedEvent.description}
                  </p>
                  <ul className="space-y-4">
                    {selectedEvent.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <Info size={18} className="text-primary mr-3 shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 border-t-4 border-t-primary !rounded-xl">
              <h3 className="text-2xl font-black uppercase italic mb-6">Secure Spot</h3>
              <form className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Emergency Phone</label>
                    <input type="text" className="input-hero" placeholder="+91 00000 00000" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Medical Conditions</label>
                    <textarea className="input-hero h-24 resize-none" placeholder="None / Specify..."></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">T-Shirt Size</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <button key={size} type="button" className="py-2 rounded-xl border border-white/10 hover:border-primary font-black transition-colors">{size}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <button type="button" className="hero-button w-full shadow-2xl mt-4">
                  Complete Registration
                </button>
                <p className="text-[9px] text-center text-gray-500 font-bold uppercase tracking-widest mt-4">
                  By clicking, you agree to the athlete waiver.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 container mx-auto px-6">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">Event Dashboard</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Forge Your <span className="text-primary">Race</span></h1>
          <div className="h-1.5 w-24 bg-primary mt-3 rounded-full"></div>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-md text-[9px] font-black uppercase tracking-widest transition-all border ${
                activeFilter === cat
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8">
        {filteredEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex flex-col lg:flex-row group overflow-hidden border-none cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="lg:w-2/5 h-[250px] lg:h-auto overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex space-x-3">
                    <span className="bg-white/5 border border-white/10 text-white text-[10px] font-black px-3 py-1 rounded-md uppercase italic tracking-widest">
                      {event.category}
                    </span>
                    <div className="flex items-center text-yellow-500 text-[10px] font-black">
                      <Star size={12} className="fill-current mr-1" /> {event.rating}
                    </div>
                  </div>
                  <span className="text-primary font-black uppercase italic tracking-widest text-[11px]">{event.difficulty}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase italic mb-4 leading-tight group-hover:text-primary transition-colors">{event.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="flex items-center"><Calendar size={14} className="mr-2 text-primary" /> {event.date}</div>
                  <div className="flex items-center"><MapPin size={14} className="mr-2 text-primary" /> {event.location.split(',')[0]}</div>
                  <div className="flex items-center"><Users size={14} className="mr-2 text-primary" /> {event.participants}</div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-gray-500 uppercase mb-1">Entry Fee</span>
                   <div className="text-2xl font-black italic text-white">{event.price}</div>
                </div>
                <button className="hero-button py-2.5 px-6 group">
                  <span className="flex items-center">
                    Register <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
