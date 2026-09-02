import React from 'react';
import { Users, ChevronRight, ArrowRight, ChevronLeft, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const OnlineConnect = ({ onlineEvents, activeLobby, setActiveLobby, lobbyData, setLobbyData, handleJoinSession, showSuccess, setShowSuccess }) => (
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
         {onlineEvents.map((event) => (
           <div key={event.id} className="glass-card aspect-square relative group overflow-hidden border-none shadow-2xl !rounded-2xl">
              <img src={event.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
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
                          type="text" required placeholder="FULL NAME"
                          value={lobbyData.name} onChange={(e) => setLobbyData({...lobbyData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-colors"
                        />
                        <input
                          type="email" required placeholder="ATHLETE EMAIL"
                          value={lobbyData.email} onChange={(e) => setLobbyData({...lobbyData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-colors"
                        />
                        <button type="submit" className="hero-button w-full py-4 text-[10px]">Join Session</button>
                     </form>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                 <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 px-3 py-1 rounded-sm">
                   INTEL-{event.id.toString().padStart(3, '0')}
                 </span>
              </div>
           </div>
         ))}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
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
);

export default OnlineConnect;
