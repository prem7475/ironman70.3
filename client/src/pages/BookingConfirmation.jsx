import React, { useEffect, useState } from 'react';
import { Calendar, Download, Ticket as TicketIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { generateRaceTicketPDF, getGoogleCalendarUrl } from '../utils/ticket';

import { registrationService } from '../services/api';
import ActivityAnimation from '../components/ActivityAnimation';

const BookingConfirmation = () => {
  const { registrationId } = useParams();
  const [registration, setRegistration] = useState(null);
  const [error, setError] = useState('');
  const [pdfError, setPdfError] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    registrationService.getRegistration(registrationId)
      .then(async response => {
        setRegistration(response.data);
        try {
          await generateRaceTicketPDF(response.data);
        } catch {
          setPdfError('PDF auto-download was blocked. Use Download PDF below.');
        }
      })
      .catch(err => setError(err.response?.data?.msg || err.message));
  }, [registrationId]);

  const download = async () => {
    setGenerating(true);
    try {
      await generateRaceTicketPDF(registration);
    } catch {
      setError('Unable to generate ticket.');
    } finally {
      setGenerating(false);
    }
  };
  if (error) return <div className="pt-32 pb-20 container mx-auto px-6 text-center text-primary">{error}</div>;
  if (!registration) return <div className="pt-32 pb-20 container mx-auto px-6 text-center text-gray-500">Loading confirmation...</div>;
  const calendarUrl = getGoogleCalendarUrl(registration);
    return <div className="pt-32 pb-20 container mx-auto px-6"><div className="max-w-2xl mx-auto glass-card p-8 md:p-12 text-center border-none"><ActivityAnimation category={registration.category} compact /><TicketIcon className="text-primary mx-auto mb-6 mt-8" size={52} /><p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">Registration Complete</p><h1 className="text-4xl font-black uppercase italic mt-3">Booking <span className="text-primary">Confirmed</span></h1><div className="text-left border-t border-white/10 mt-8 pt-8 space-y-4"><h2 className="text-2xl font-black uppercase italic">{registration.event.title}</h2><p className="text-gray-400">Participant: <strong className="text-white">{registration.participant.name}</strong></p><p className="text-gray-400">{new Date(registration.event.date).toLocaleDateString('en-IN', { dateStyle: 'long' })} | {registration.event.venue || registration.event.location}</p><p className="text-gray-400">{registration.category} | {registration.distance || 'Distance to be confirmed'}</p><p className="text-primary font-black">Registration ID: {registration.registrationId}</p><p className="text-gray-400">Payment: {registration.paymentStatus}</p><p className="text-gray-400">Status: {registration.status}</p></div>{pdfError && <p className="text-primary text-xs uppercase tracking-widest mt-6">{pdfError}</p>}<div className="flex flex-wrap justify-center gap-3 mt-8"><Link to={`/my-races/${registration.registrationId}/ticket`} className="hero-button">View Ticket</Link><button onClick={download} disabled={generating} className="hero-button flex items-center gap-2">{generating ? 'Generating PDF...' : <><Download size={15} /> Download PDF</>}</button>{calendarUrl && <a href={calendarUrl} target="_blank" rel="noreferrer" className="hero-button flex items-center gap-2"><Calendar size={15} /> Add to Calendar</a>}<Link to="/my-races" className="px-5 py-3 border border-white/10 rounded-md uppercase text-[10px] font-black tracking-widest">My Races</Link></div></div></div>;
};

export default BookingConfirmation;
