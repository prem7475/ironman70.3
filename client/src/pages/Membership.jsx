import React, { useState } from 'react';
import { CheckCircle2, CreditCard, LoaderCircle, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../services/api';

const sources = ['UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'];
const Membership = () => {
  const setUser = useStore(state => state.setUser);
  const navigate = useNavigate();
  const [source, setSource] = useState('UPI');
  const [qr, setQr] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const generateQr = async () => setQr(await QRCode.toDataURL(JSON.stringify({ merchant: 'PACEFORGE PREMIUM', amount: 4999, currency: 'INR', reference: `PF-MEMBER-${Date.now()}` }), { width: 240, margin: 2 }));
  const activate = async () => { setStatus('checking'); setError(''); if (!qr) await generateQr(); setTimeout(async () => { try { const response = await api.post('/user/membership', { source }); setUser(response.data.user); setStatus('success'); setTimeout(() => navigate('/health'), 900); } catch (requestError) { setError(requestError.response?.data?.msg || 'Unable to activate membership'); setStatus('idle'); } }, 1200); };
  return <div className="pt-28 pb-16 min-h-screen max-w-3xl mx-auto px-4"><Link to="/profile" className="text-primary text-[10px] font-black uppercase tracking-widest">Back to profile</Link><div className="glass-card p-8 md:p-12 mt-6 text-center"><p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">PaceForge premium</p><h1 className="text-5xl font-black uppercase italic tracking-tighter mt-3">Become a <span className="text-primary">Forger</span></h1><p className="text-gray-400 mt-5">Unlock training plans, BMI analysis, VO2 Max, and full athlete intelligence.</p><p className="text-5xl font-black italic text-primary mt-8">₹4,999 <span className="text-sm text-gray-500 not-italic">/ year</span></p><div className="grid grid-cols-2 gap-3 mt-8">{sources.map(item => <button key={item} onClick={() => { setSource(item); generateQr(); }} className={`p-4 border rounded-md text-[10px] font-black uppercase tracking-widest ${source === item ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-gray-500'}`}>{item.replace('_', ' ')}</button>)}</div>{qr && <div className="mt-7"><p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex justify-center items-center gap-2"><QrCode size={15}/> Scan mock payment QR · ₹4,999</p><img src={qr} alt="Premium membership payment QR" className="w-52 h-52 mx-auto mt-3 bg-white p-2"/></div>}<button onClick={activate} disabled={status !== 'idle'} className="hero-button w-full mt-7 py-4 flex justify-center items-center gap-2">{status === 'checking' ? <><LoaderCircle className="animate-spin" size={17}/> Checking payment...</> : status === 'success' ? <><CheckCircle2 size={17}/> Premium activated</> : <><CreditCard size={17}/> Check payment status</>}</button>{error && <p className="text-primary text-xs mt-5">{error}</p>}<p className="text-gray-600 text-xs mt-7">Mock payment only. No real funds are transferred.</p></div></div>;
};
export default Membership;
