import React from 'react';
import { MapPin, Star, Calendar, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedEvents = ({ selectedCity, filteredEvents }) => (
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
);

export default FeaturedEvents;
