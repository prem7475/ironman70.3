import React, { useEffect, useState } from 'react';
import { CheckCircle2, CreditCard, LoaderCircle, Wallet } from 'lucide-react';
import QRCode from 'qrcode';
import { useLocation, useNavigate } from 'react-router-dom';
import { registrationService } from '../services/api';
import ActivityAnimation from '../components/ActivityAnimation';
import {
  getMockWalletBalance,
  updateMockWalletBalance,
  saveMockRegistration
} from '../utils/mockStorage';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(getMockWalletBalance());
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
    const token = localStorage.getItem('paceforge_token');
    if (!token) return undefined;
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/wallet`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data && data.walletBalance !== undefined) setWallet(data.walletBalance);
      })
      .catch(() => {
        setWallet(getMockWalletBalance());
      });
    return undefined;
  }, [race]);

  useEffect(() => {
    if (source === 'WALLET') { setQr(''); return undefined; }
    QRCode.toDataURL(JSON.stringify({
      merchant: 'PACEFORGE PAYMENTS',
      amount: due,
      currency: 'INR',
      reference: `PF-PAY-${Date.now()}`
    }), { width: 250, margin: 2 }).then(setQr).catch(() => {});
    return undefined;
  }, [source, due]);

  const checkPayment = async () => {
    setStatus('checking');
    setTimeout(async () => {
      try {
        const response = await registrationService.registerForEvent({
          eventId: race._id,
          category: state.category,
          distance: state.distance,
          participant: state.participant,
          paymentSource: source
        });
        if (source === 'WALLET' && walletUsed > 0) {
          updateMockWalletBalance(walletUsed, 'DEBIT');
        }
        setStatus('success');
        setTimeout(() => navigate(`/booking-confirmation/${response.data.registrationId}`), 900);
      } catch {
        // Fallback registration when server is offline or on static hosting
        const offlineRegId = `PF-REG-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        const offlineBooking = {
          _id: `booking-${Date.now()}`,
          registrationId: offlineRegId,
          bookingId: `PF-BOOK-${Date.now().toString(36).toUpperCase()}`,
          bibNumber: `BIB-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'CONFIRMED',
          paymentStatus: 'Payment Successful',
          amount: total,
          category: state?.category || race.category || 'Marathon',
          distance: state?.distance || '21.1 KM',
          participant: {
            name: state?.participant?.name || 'Athlete Participant',
            email: state?.participant?.email || 'athlete@paceforge.com',
            phone: state?.participant?.phone || '+91 9876543210'
          },
          event: {
            title: race.title,
            category: race.category,
            date: race.date,
            location: race.location,
            venue: race.venue || `${race.location} Sports Complex`
          }
        };

        saveMockRegistration(offlineBooking);
        if (source === 'WALLET' && walletUsed > 0) {
          updateMockWalletBalance(walletUsed, 'DEBIT');
        }
        setStatus('success');
        setTimeout(() => navigate(`/booking-confirmation/${offlineRegId}`), 900);
      }
    }, 1600);
  };

  if (!race) return <div className="pt-32 text-center">Payment session unavailable. <button onClick={() => navigate('/races')} className="text-primary">Back to races</button></div>;
  return <div className="pt-28 pb-16 min-h-screen max-w-5xl mx-auto px-4 font-ironman">
    <ActivityAnimation category={race.category} compact />
    <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mt-6">Secure Checkout Desk</p>
    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-2">Payment <span className="text-primary">Desk</span></h1>
    <div className="grid lg:grid-cols-2 gap-8 mt-10">
      <div className="glass-card p-7 border-none">
        <h2 className="text-2xl font-black uppercase italic">Invoice</h2>
        <p className="text-gray-400 mt-3">{race.title}</p>
        <div className="space-y-4 border-t border-white/10 mt-7 pt-6 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Race price ({state?.distance || 'Standard'})</span><span>₹{amount.toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">GST (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Processing charge</span><span>₹{extra.toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between text-xl font-black border-t border-white/10 pt-5"><span>Total</span><span className="text-primary">₹{total.toLocaleString('en-IN')}</span></div>
        </div>
        <div className="mt-7 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm"><Wallet size={17} className="text-primary"/>Wallet balance</span>
          <strong className="text-white">₹{wallet.toLocaleString('en-IN')}</strong>
        </div>
        <p className="text-xs text-gray-500 mt-3">Wallet used: ₹{walletUsed.toLocaleString('en-IN')} · External amount: ₹{due.toLocaleString('en-IN')}</p>
      </div>
      <div className="glass-card p-7 border-none">
        <h2 className="text-2xl font-black uppercase italic">Payment Method</h2>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {['WALLET', 'UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'].map(item => (
            <button key={item} onClick={() => setSource(item)} className={`p-4 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${source === item ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-gray-500'}`}>
              {item === 'WALLET' ? 'Wallet' : item.replace('_', ' ')}
            </button>
          ))}
        </div>
        <button onClick={checkPayment} disabled={status !== 'idle'} className="hero-button w-full mt-6 py-4 flex items-center justify-center gap-2">
          {status === 'checking' ? <><LoaderCircle className="animate-spin" size={17}/> Verifying payment...</> : status === 'success' ? <><CheckCircle2 size={17}/> Payment successful</> : <><CreditCard size={17}/> Complete Registration</>}
        </button>
        {qr && <div className="mt-7 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scan payment QR · ₹{due.toLocaleString('en-IN')}</p>
          <img src={qr} alt="Payment QR code" className={`w-52 h-52 mx-auto mt-3 bg-white p-2 rounded-2xl shadow-2xl ${status === 'checking' ? 'animate-pulse' : ''}`}/>
        </div>}
        {error && <p className="text-primary text-xs mt-5">{error}</p>}
        <p className="text-gray-500 text-xs mt-7">Scan using any UPI or banking app to authorize race entry.</p>
      </div>
    </div>
  </div>;
};

export default Payment;
