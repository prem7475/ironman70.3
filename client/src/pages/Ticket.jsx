import React, { useEffect, useState } from 'react';
import { Calendar, Download, Ticket as TicketIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import useStore from '../store/useStore';
import { generateRaceTicketPDF, getGoogleCalendarUrl, getVerificationUrl } from '../utils/ticket';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Ticket = () => {
  const { registrationId } = useParams();
  const user = useStore(state => state.user);
  const [registration, setRegistration] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [pdfState, setPdfState] = useState('idle');

  useEffect(() => {
    const token = localStorage.getItem('paceforge_token');
    if (!token) return setError('Please sign in to view this ticket.');
    fetch(`${API_URL}/registrations/${encodeURIComponent(registrationId)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async response => {
        if (!response.ok) throw new Error((await response.json()).msg || 'Registration not found');
        return response.json();
      })
      .then(async data => {
        setRegistration(data);
        setQrCode(await QRCode.toDataURL(getVerificationUrl(data.registrationId), { margin: 2, width: 240 }));
      })
      .catch(err => setError(err.message));
  }, [registrationId]);

  const downloadPdf = async () => {
    setPdfState('loading');
    try {
      await generateRaceTicketPDF(registration);
      setPdfState('idle');
    } catch {
      setPdfState('error');
    }
  };

  if (error) return <div className="pt-32 pb-20 container mx-auto px-6 text-center"><h1 className="text-4xl font-black uppercase italic">{error}</h1><Link to="/login" className="hero-button inline-block mt-8">Sign In</Link></div>;
  if (!registration) return <div className="pt-32 pb-20 container mx-auto px-6 text-center text-gray-500">Loading registration...</div>;

  const calendarUrl = getGoogleCalendarUrl(registration);
  const participant = registration.participant || {};

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10"><span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Digital Registration</span><h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Race <span className="text-primary">Ticket</span></h1></div>
        <div className="glass-card p-8 md:p-12 border-none">
          <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-white/10 pb-8">
            <div><p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3">PACEFORGE | TRAIN. TRACK. CONQUER.</p><h2 className="text-3xl md:text-4xl font-black uppercase italic">{registration.event.title}</h2><p className="text-gray-400 mt-3">{new Date(registration.event.date).toLocaleDateString('en-IN', { dateStyle: 'long' })} | {registration.event.location}</p></div>
            <img src={qrCode} alt="Registration verification QR code" className="w-40 h-40 bg-white p-2 self-center md:self-start" />
          </div>
          <div className="grid sm:grid-cols-2 gap-8 py-8 border-b border-white/10">
            <div><p className="text-[10px] text-gray-500 uppercase tracking-widest">Participant</p><p className="text-2xl font-black italic mt-2">{participant.name || user?.name}</p><p className="text-gray-400 text-sm mt-1">{participant.email}</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase tracking-widest">Race Entry</p><p className="font-black uppercase mt-2">{registration.category}</p><p className="text-gray-400 mt-1">{registration.distance || 'Distance to be confirmed'}</p><p className="text-gray-400 mt-1">Fee: ₹{Number(registration.amount || 0).toLocaleString()}</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase tracking-widest">Registration ID</p><p className="font-black text-primary mt-2">{registration.registrationId}</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase tracking-widest">Booking ID / BIB</p><p className="font-black mt-2">{registration.bookingId} / {registration.bibNumber || 'Not assigned'}</p></div>
          </div>
          <div className="flex flex-wrap gap-4 pt-8">
            <button onClick={downloadPdf} disabled={pdfState === 'loading'} className="hero-button flex items-center gap-2">{pdfState === 'loading' ? 'Generating PDF...' : <><Download size={16} /> Download PDF</> }</button>
            {calendarUrl ? <a href={calendarUrl} target="_blank" rel="noreferrer" className="hero-button flex items-center gap-2"><Calendar size={16} /> Add to Google Calendar</a> : <span className="text-gray-500 text-sm">Calendar event unavailable because this race has no confirmed date.</span>}
            <Link to="/my-races" className="px-6 py-3 border border-white/10 rounded-md uppercase text-[10px] font-black tracking-widest">My Races</Link>
          </div>
          {pdfState === 'error' && <p className="text-primary text-sm mt-4">Unable to generate ticket. <button onClick={downloadPdf} className="underline">Try again</button></p>}
          <p className="text-gray-500 text-xs mt-8 flex items-center gap-2"><TicketIcon size={14} /> Need help? Contact the configured PACEFORGE support team.</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
