import React, { useEffect, useState } from 'react';
import { CheckCircle2, CreditCard, LoaderCircle, Wallet } from 'lucide-react';
import QRCode from 'qrcode';
import { useLocation, useNavigate } from 'react-router-dom';
import { registrationService } from '../services/api';
import ActivityAnimation from '../components/ActivityAnimation';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);
  const [source, setSource] = useState('WALLET');
  const [qr, setQr] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const race = state?.race;
  const amount = Number(race?.price || 0);
  const tax = Number((amount * 0.18).toFixed(2));
  const extra = amount > 0 ? 25 : 0;
  const total = amount + tax + extra;
  const walletUsed = Math.min(wallet, total);
  const due = total - walletUsed;

  useEffect(() => {
    if (!race) return undefined;
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/wallet`, { headers: { Authorization: `Bearer ${localStorage.getItem('paceforge_token')}` } }).then(response => response.json()).then(data => setWallet(data.walletBalance || 0));
    return undefined;
  }, [race]);

  useEffect(() => {
    if (source === 'WALLET') { setQr(''); return undefined; }
    QRCode.toDataURL(JSON.stringify({ merchant: 'PACEFORGE MOCK PAYMENTS', amount: due, currency: 'INR', reference: `PF-PAY-${Date.now()}` }), { width: 250, margin: 2 }).then(setQr);
    return undefined;
  }, [source, due]);

  const checkPayment = async () => {
    setStatus('checking');
    setTimeout(async () => {
      try {
        const response = await registrationService.registerForEvent({ eventId: race._id, category: state.category, distance: state.distance, participant: state.participant, paymentSource: source });
        setStatus('success');
        setTimeout(() => navigate(`/booking-confirmation/${response.data.registrationId}`), 900);
      } catch (requestError) { setError(requestError.response?.data?.msg || 'Unable to complete mock payment.'); setStatus('idle'); }
    }, 1600);
  };

  if (!race) return <div className="pt-32 text-center">Payment session unavailable. <button onClick={() => navigate('/races')} className="text-primary">Back to races</button></div>;
  return <div className="pt-28 pb-16 min-h-screen max-w-5xl mx-auto px-4"><ActivityAnimation category={race.category} compact /><p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mt-6">Secure mock checkout</p><h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-2">Payment <span className="text-primary">desk</span></h1><div className="grid lg:grid-cols-2 gap-8 mt-10"><div className="glass-card p-7"><h2 className="text-2xl font-black uppercase italic">Invoice</h2><p className="text-gray-400 mt-3">{race.title}</p><div className="space-y-4 border-t border-white/10 mt-7 pt-6 text-sm"><div className="flex justify-between"><span className="text-gray-500">Race price</span><span>₹{amount.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-500">GST (18%)</span><span>₹{tax.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-500">Processing charge</span><span>₹{extra.toLocaleString()}</span></div><div className="flex justify-between text-xl font-black border-t border-white/10 pt-5"><span>Total</span><span className="text-primary">₹{total.toLocaleString()}</span></div></div><div className="mt-7 p-4 bg-white/5 rounded-md flex items-center justify-between"><span className="flex items-center gap-2 text-sm"><Wallet size={17} className="text-primary"/>Wallet balance</span><strong>₹{wallet.toLocaleString()}</strong></div><p className="text-xs text-gray-500 mt-3">Wallet used: ₹{walletUsed.toLocaleString()} · External amount: ₹{due.toLocaleString()}</p></div><div className="glass-card p-7"><h2 className="text-2xl font-black uppercase italic">Payment source</h2><div className="grid grid-cols-2 gap-3 mt-6">{['WALLET', 'UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'].map(item => <button key={item} onClick={() => setSource(item)} className={`p-4 border rounded-md text-[10px] font-black uppercase tracking-widest ${source === item ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-gray-500'}`}>{item === 'WALLET' ? 'Wallet' : item.replace('_', ' ')}</button>)}</div><button onClick={checkPayment} disabled={status !== 'idle'} className="hero-button w-full mt-6 py-4 flex items-center justify-center gap-2">{status === 'checking' ? <><LoaderCircle className="animate-spin" size={17}/> Checking payment...</> : status === 'success' ? <><CheckCircle2 size={17}/> Payment successful</> : <><CreditCard size={17}/> Check payment status</>}</button>{qr && <div className="mt-7 text-center"><p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Scan mock payment QR · ₹{due.toLocaleString()}</p><img src={qr} alt="Mock payment QR code" className={`w-52 h-52 mx-auto mt-3 bg-white p-2 ${status === 'checking' ? 'animate-pulse' : ''}`}/></div>}{error && <p className="text-primary text-xs mt-5">{error}</p>}<p className="text-gray-600 text-xs mt-7">Mock only. This QR encodes the amount and reference; it does not transfer money.</p></div></div></div>;
};
export default Payment;
