import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Ticket, History, Calendar, Settings, Award,
  MapPin, Activity, Zap, ShieldCheck, ChevronRight,
  TrendingUp, Dna, Trophy
} from 'lucide-react';
import useStore from '../store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Profile = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [account, setAccount] = useState(user);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/profile');
      return;
    }
    const token = localStorage.getItem('paceforge_token');
    fetch(`${API_URL}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : null)
      .then(data => data && setAccount(data));
    fetch(`${API_URL}/registrations/my-races`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : [])
      .then(registrations => setUpcomingEvents(registrations.filter(registration => registration.status !== 'CANCELLED')));
    fetch(`${API_URL}/wallet`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : { walletBalance: 0 })
      .then(data => setWalletBalance(data.walletBalance || 0));
  }, [user, navigate]);

  if (!user) return null;
  const pastEvents = [];

  const health = account?.healthDetails || {};
  const stats = [
    ['Height', health.height ? `${health.height} cm` : 'Not set'],
    ['Weight', health.weight ? `${Number(health.weight).toFixed(1)} kg` : 'Not set'],
    ['BMI', health.bmi || 'Not set'],
    ['VO2 Max', health.vo2Max ? `${health.vo2Max} ml/kg/min` : 'Not set']
  ];

  return (
    <div className="pt-24 pb-12 container mx-auto px-6 max-w-7xl">
      {/* Profile Header - Redesigned for Impact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 mb-10 relative overflow-hidden !rounded-2xl border-none shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12 relative z-10">
          <div className="relative">
            <div className="w-40 h-40 bg-hero-gray rounded-xl p-1 bg-gradient-to-br from-primary to-transparent">
               <div className="w-full h-full bg-hero-gray rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
               </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 p-3 bg-primary rounded-xl shadow-2xl"
            >
              <Settings size={20} />
            </motion.button>
          </div>

          <div className="text-center lg:text-left flex-1 space-y-8">
            <div className="space-y-2">
              <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-start space-y-4 lg:space-y-0 lg:space-x-6">
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{account.name.split(' ')[0]} <span className="text-primary">{account.name.split(' ')[1] || ''}</span></h1>
                <span className="bg-white/5 text-primary border border-primary/20 text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] w-fit mx-auto lg:mx-0 backdrop-blur-md">
                  Elite Athlete
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-500 font-bold uppercase tracking-widest text-sm">
                 <MapPin size={16} className="text-primary" />
                 <span>Mumbai, Maharashtra</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'BMI STATUS', val: account?.healthDetails?.bmi || '—', sub: account?.healthDetails?.bmiCategory || 'NOT SET', color: 'text-green-500' },
                 { label: 'GLOBAL RANK', val: '#1,240', sub: 'TOP 2%', color: 'text-primary' },
                 { label: 'TOTAL RACES', val: '14', sub: 'COMPLETED', color: 'text-white' },
                 { label: 'EXPERIENCE', val: 'LVL 24', sub: 'PRO TIER', color: 'text-primary' }
               ].map((item, i) => (
                 <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                    <p className="text-[9px] font-black uppercase text-gray-500 mb-2 tracking-widest">{item.label}</p>
                    <p className="text-xl font-black italic mb-1">{item.val}</p>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${item.color}`}>{item.sub}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-3 glass-card p-6 md:p-8 border-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Athlete profile</p><h2 className="text-2xl font-black uppercase italic tracking-tighter">Performance <span className="text-primary">Vitals</span></h2></div>
            <Link to="/health" className="hero-button inline-flex items-center justify-center gap-2 px-5 py-3 text-[10px]"><Settings size={15} /> {health.height || health.weight || health.bmi ? 'Update metrics' : 'Add your metrics'}</Link>
          </div>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-7">{stats.map(([label, value]) => <div key={label} className="bg-black/40 border border-white/5 rounded-md p-4"><p className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</p><p className="text-lg font-black italic mt-2">{value}</p></div>)}<Link to="/wallet" className="bg-primary/10 border border-primary/30 rounded-md p-4 hover:bg-primary/20"><p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Wallet</p><p className="text-lg font-black italic mt-2">₹{walletBalance.toLocaleString()}</p></Link></div>
        </section>
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-10">
          {/* Active Passes */}
          <section>
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-[0_0_20px_rgba(225,6,0,0.1)]">
                  <Ticket size={20} />
                </div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Active <span className="text-primary">Passes</span></h2>
              </div>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <motion.div
                  key={event.registrationId || event._id}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="glass-card p-6 flex flex-col md:flex-row justify-between items-center group cursor-pointer border-none bg-gradient-to-br from-white/5 to-transparent shadow-xl"
                >
                  <div className="flex items-center space-x-6 mb-6 md:mb-0">
                    <div className="w-16 h-16 bg-black/40 rounded-xl flex items-center justify-center text-primary border border-white/5 group-hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                       <Activity size={28} className="relative z-10" />
                       <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/20 transition-all"></div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-1 block">{event.category}</span>
                      <h3 className="font-black uppercase italic text-xl mb-1">{event.event?.title}</h3>
                      <div className="flex items-center space-x-4">
                        <p className="text-gray-500 text-[10px] font-black flex items-center uppercase tracking-widest">
                          <Calendar size={12} className="mr-2 text-primary" /> {event.event?.date && new Date(event.event.date).toLocaleDateString('en-IN')}
                        </p>
                        <p className="text-gray-500 text-[10px] font-black flex items-center uppercase tracking-widest">
                          <ShieldCheck size={12} className="mr-2 text-primary" /> ID: {event.registrationId}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to={`/my-races/${event.registrationId}/ticket`} className="hero-button py-3 px-8 text-[10px] shadow-2xl">
                    Digital Entry
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Past History */}
          <section>
            <div className="flex items-center space-x-3 mb-6 px-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500">
                <History size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gray-500">Previous <span className="text-gray-400">Victories</span></h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 opacity-70 hover:opacity-100 transition-opacity">
              {pastEvents.map(event => (
                <div key={event.id} className="glass-card p-8 border-none bg-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                     <Trophy size={60} />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-black uppercase italic text-lg text-gray-300 leading-tight">{event.title}</h3>
                    <Award className="text-orange-500 shrink-0" size={20} />
                  </div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <div>
                       <p className="text-[9px] font-black uppercase text-gray-600 mb-1">Finish Time</p>
                       <p className="text-lg font-black italic text-white">{event.time}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black uppercase text-gray-600 mb-1">Rank</p>
                       <p className="text-2xl font-black italic text-primary">{event.rank}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          {/* Performance Radar */}
          <div className="glass-card p-8 border-none bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden !rounded-xl">
             <h3 className="text-xl font-black uppercase italic mb-8 flex items-center">
                <Activity className="text-primary mr-3" size={20} /> Athlete Vitals
             </h3>
             <div className="space-y-6">
                {stats.map((stat, i) => (
                  <div key={i}>
                     <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest items-center">
                        <span className="flex items-center text-gray-400">{stat.icon}<span className="ml-2">{stat.label}</span></span>
                        <span className="text-primary">{stat.value}%</span>
                     </div>
                     <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full shadow-[0_0_15px_rgba(225,6,0,0.5)]"
                        ></motion.div>
                     </div>
                  </div>
                ))}
             </div>
             <button className="hero-button w-full mt-10 py-4 text-[10px] !bg-white/5 border border-white/10 hover:!bg-white hover:text-black transition-all">
                Recalibrate Metrics
             </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="glass-card p-8 border-none !rounded-xl">
             <h3 className="text-xl font-black uppercase italic mb-6">Quick Actions</h3>
             <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Register New Race', icon: <Trophy size={14}/> },
                  { label: 'Download Nutrition', icon: <Activity size={14}/> },
                  { label: 'Find Local Clubs', icon: <MapPin size={14}/> }
                ].map((item, i) => (
                  <button key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                    <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">
                       <span className="text-primary mr-3">{item.icon}</span>
                       {item.label}
                    </span>
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
