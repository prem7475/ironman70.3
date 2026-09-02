import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TrainingInfo = () => (
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
);

export default TrainingInfo;
