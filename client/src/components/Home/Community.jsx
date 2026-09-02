import React from 'react';
import { Camera, Share2, Video, Globe } from 'lucide-react';

const Community = () => (
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
);

export default Community;
