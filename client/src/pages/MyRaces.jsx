import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MyRaces = () => {
  const user = useStore(state => state.user);
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('paceforge_token');
    if (!token) return setError('Please sign in to view your races.');
    fetch(`${API_URL}/registrations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async response => { if (!response.ok) throw new Error('Unable to load registrations'); return response.json(); })
      .then(setRegistrations)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="pt-32 pb-20 container mx-auto px-6 text-center"><h1 className="text-4xl font-black uppercase italic">{error}</h1><Link to="/login" className="hero-button inline-block mt-8">Sign In</Link></div>;

  return <div className="pt-32 pb-20 container mx-auto px-6"><div className="mb-12"><span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Athlete Records</span><h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">My <span className="text-primary">Races</span></h1></div><div className="space-y-5">{registrations.length === 0 ? <p className="text-gray-500 uppercase tracking-widest text-sm">No registrations found for {user?.name || 'this account'}.</p> : registrations.map(registration => <div key={registration.registrationId} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-none"><div><p className="text-primary text-[10px] font-black uppercase tracking-widest">{registration.status}</p><h2 className="text-2xl font-black uppercase italic mt-2">{registration.event?.title}</h2><p className="text-gray-400 text-sm mt-2">{registration.category} | {registration.event?.location}</p><p className="text-gray-500 text-xs mt-2">{registration.registrationId}</p></div><Link to={`/my-races/${registration.registrationId}/ticket`} className="hero-button text-center">View Ticket</Link></div>)}</div></div>;
};

export default MyRaces;
