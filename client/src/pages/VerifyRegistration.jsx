import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const VerifyRegistration = () => {
  const { registrationId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/registrations/verify/${encodeURIComponent(registrationId)}`)
      .then(async response => ({ ok: response.ok, body: await response.json() }))
      .then(({ ok, body }) => setResult(ok ? body : { verified: false, msg: 'Registration not found' }))
      .catch(() => setResult({ verified: false, msg: 'Registration not found' }));
  }, [registrationId]);

  if (!result) return <div className="pt-32 pb-20 container mx-auto px-6 text-center text-gray-500">Verifying registration...</div>;
  const registration = result.registration;
  const cancelled = registration?.status === 'CANCELLED';

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="max-w-2xl mx-auto glass-card p-8 md:p-12 border-none text-center">
        {result.verified ? <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" /> : <XCircle size={64} className="text-primary mx-auto mb-6" />}
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">PACEFORGE VERIFIED</p>
        <h1 className="text-4xl md:text-5xl font-black uppercase italic mt-3">{result.verified ? 'Registration Verified' : cancelled ? 'Registration Cancelled' : 'Registration Not Found'}</h1>
        {registration && <div className="text-left mt-10 space-y-5 border-t border-white/10 pt-8"><p><span className="text-gray-500 uppercase text-[10px] tracking-widest">Race</span><br /><strong>{registration.raceName}</strong></p><p><span className="text-gray-500 uppercase text-[10px] tracking-widest">Registration ID</span><br /><strong className="text-primary">{registration.registrationId}</strong></p><p><span className="text-gray-500 uppercase text-[10px] tracking-widest">Participant</span><br /><strong>{registration.participantName}</strong></p><p><span className="text-gray-500 uppercase text-[10px] tracking-widest">Category</span><br /><strong>{registration.category}</strong></p><p><span className="text-gray-500 uppercase text-[10px] tracking-widest">Date / Venue</span><br /><strong>{new Date(registration.date).toLocaleDateString('en-IN', { dateStyle: 'long' })} | {registration.venue}</strong></p><p><span className="text-gray-500 uppercase text-[10px] tracking-widest">Status</span><br /><strong>{registration.status}</strong></p></div>}
      </div>
    </div>
  );
};

export default VerifyRegistration;
