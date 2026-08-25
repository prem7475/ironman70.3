import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, MessageSquare, Heart, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-hero-dark border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="PaceForge" className="h-8 w-auto" onError={(e) => e.target.style.display='none'}/>
              <div className="text-xl font-black uppercase tracking-tighter italic">
                PACE<span className="text-primary">FORGE</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              The premier destination for athletes to discover elite sporting events, track metabolic performance, and push their limits.
            </p>
            <div className="flex space-x-4">
              {[Globe, Share2, MessageSquare, Heart].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase italic tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
              <li><Link to="/events" className="hover:text-primary transition-colors">All Events</Link></li>
              <li><Link to="/health" className="hover:text-primary transition-colors">Health Center</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Athlete Profile</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Leaderboards</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-black uppercase italic tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Registration Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety Protocols</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-black uppercase italic tracking-widest mb-6">Connect</h4>
            <div className="flex items-center space-x-3 text-gray-400 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary transition-colors">
                <MapPin size={16} />
              </div>
              <span className="text-sm font-medium italic">Mumbai HQ, Maharashtra, India</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary transition-colors">
                <Mail size={16} />
              </div>
              <span className="text-sm font-medium">support@paceforge.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary transition-colors">
                <Phone size={16} />
              </div>
              <span className="text-sm font-medium">+91 1800-PACE-FORGE</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
          <p>© 2026 PACEFORGE. ANYTHING IS POSSIBLE.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
