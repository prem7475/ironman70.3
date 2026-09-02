import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NEWS_ITEMS } from '../../constants';

const NewsIntel = ({ newsScrollRef, handleNewsScroll, newsScrollPos, updateNewsScrollPosition }) => (
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
         {NEWS_ITEMS.map((item, idx) => (
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
         ))}
      </div>
    </div>
  </section>
);

export default NewsIntel;
