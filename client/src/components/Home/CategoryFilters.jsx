import React from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORY_MAP } from '../../constants';

const CategoryFilters = ({ activeFilter, setActiveFilter, scrollContainerRef, handleScroll, updateScrollPosition, scrollPosition }) => (
  <section className="py-16 bg-black border-b border-white/5 relative">
    <div className="container mx-auto px-6 relative">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
           <Filter size={16} className="text-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Filter By Category</span>
        </div>

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
        {CATEGORY_MAP.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveFilter(cat.name)}
            className={`relative w-48 h-48 rounded-2xl shrink-0 transition-all duration-300 border-2 group overflow-hidden snap-start ${
              activeFilter === cat.name
                ? 'bg-primary/10 border-primary shadow-[0_0_40px_rgba(225,6,0,0.3)]'
                : 'bg-white/5 border-white/10 hover:border-primary/50'
            }`}
          >
            <div className="absolute top-6 right-6 z-20">
              <span className={`text-2xl font-black italic uppercase tracking-tighter transition-colors ${
                activeFilter === cat.name ? 'text-white' : 'text-white/80 group-hover:text-primary'
              }`}>
                {cat.name}
              </span>
            </div>
            <div className={`absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 transform w-full flex justify-center ${
              activeFilter === cat.name
                ? 'text-primary scale-[2.2] translate-y-[-15%]'
                : 'text-primary opacity-30 group-hover:opacity-100 group-hover:scale-[2.1]'
            }`}>
              {cat.icon}
            </div>
            {activeFilter === cat.name && (
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none"></div>
            )}
          </button>
        ))}
      </div>

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
);

export default CategoryFilters;
