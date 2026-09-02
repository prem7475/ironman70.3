import React from 'react';
import {
  LayoutGrid, Bike, Waves, Globe, Wrench, Flag
} from 'lucide-react';

export const PAGE_TITLES = {
  '/': 'PACEFORGE',
  '/events': 'PACEFORGE - Races',
  '/races': 'PACEFORGE - Races',
  '/health': 'PACEFORGE - Training',
  '/profile': 'PACEFORGE - Profile',
  '/my-races': 'PACEFORGE - My Races',
  '/shop': 'PACEFORGE - Shop',
  '/cart': 'PACEFORGE - Cart',
  '/login': 'PACEFORGE - Login',
  '/register': 'PACEFORGE - Register'
};

export const CATEGORY_TITLES = {
  marathon: 'Marathon Races',
  cycling: 'Cycling Races',
  swimming: 'Swimming Races',
  triathlon: 'Triathlon Races',
  duathlon: 'Duathlon Races',
  ironman: 'IRONMAN Races',
  hyrox: 'HYROX Races',
  'devils-circuit': 'Devils Circuit Races'
};

export const CATEGORY_MAP = [
  { name: 'All', icon: <LayoutGrid size={96} strokeWidth={1} /> },
  {
    name: 'Running',
    icon: (
      <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="4" r="2" />
        <path d="M8 20l3-5 2-6 3-1 3 4 2-1" />
        <path d="M11 15l-3 7" />
        <path d="M13 9l-3 4-4-2" />
        <line x1="2" y1="8" x2="5" y2="8" strokeWidth="1.5" opacity="0.8" />
        <line x1="1" y1="11" x2="6" y2="11" strokeWidth="1.5" opacity="0.8" />
        <line x1="2" y1="14" x2="5" y2="14" strokeWidth="1.5" opacity="0.8" />
      </svg>
    )
  },
  { name: 'Cycling', icon: <Bike size={96} strokeWidth={1} /> },
  {
    name: 'Triathlon',
    icon: (
      <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
         <path d="M2 14c1-1 2-1 3 0s2 1 3 0" strokeWidth="1.5" />
         <path d="M3 11l2-2 2 2" opacity="0.6" />
         <circle cx="12" cy="15" r="3" />
         <path d="M10 15l2-4h3l2 4" />
         <circle cx="19" cy="7" r="1.5" />
         <path d="M17 12l2-3 2 2" />
         <path d="M19 9l1.5-1.5" />
         <line x1="2" y1="6" x2="5" y2="6" opacity="0.4" />
         <line x1="4" y1="4" x2="7" y2="4" opacity="0.4" />
      </svg>
    )
  },
  { name: 'Swimming', icon: <Waves size={96} strokeWidth={1} /> },
  { name: 'Online', icon: <Globe size={96} strokeWidth={1} /> },
  { name: 'Workshop', icon: <Wrench size={96} strokeWidth={1} /> },
  { name: 'Marathon', icon: <Flag size={96} strokeWidth={1} /> },
];

export const ALL_EVENTS = [
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

export const NEWS_ITEMS = [
  { id: 1, title: 'How to Break the 2-Hour Marathon Limit', category: 'Spotlight', date: 'Aug 24, 2026', readTime: '8 Min Read', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800' },
  { id: 2, title: 'Top 5 Recovery Meals for Endurance Athletes', category: 'Nutrition', date: 'Aug 22, 2026', readTime: '5 Min Read', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800' },
  { id: 3, title: 'Mental Fortitude: Training Your Brain for the Last 10km', category: 'Training', date: 'Aug 20, 2026', readTime: '12 Min Read', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
  { id: 4, title: 'The Rise of Virtual Cycling Communities', category: 'Tech', date: 'Aug 18, 2026', readTime: '6 Min Read', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?q=80&w=800' }
];

export const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];
