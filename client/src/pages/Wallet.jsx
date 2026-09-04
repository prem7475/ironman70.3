import React, { useEffect, useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, CheckCircle2, Wallet as WalletIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import api from '../services/api';
import {
  getMockWalletBalance,
  updateMockWalletBalance,
  getMockWalletTransactions,
  addMockWalletTransaction
} from '../utils/mockStorage';

const sources = ['UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'];

const Wallet = () => {
  const [data, setData] = useState({ walletBalance: 5000, walletTransactions: [] });
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('UPI');
  const [mode, setMode] = useState('add');
  const [qr, setQr] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    api.get('/wallet')
      .then(response => setData(response.data))
      .catch(() => {
        // Fallback to local offline mock wallet storage
        setData({
          walletBalance: getMockWalletBalance(),
          walletTransactions: getMockWalletTransactions()
        });
      });
  };

  useEffect(() => { load(); }, []);

  const generateQr = async () => {
    setQr(await QRCode.toDataURL(JSON.stringify({
      merchant: 'PACEFORGE MOCK WALLET',
      amount: Number(amount || 0),
      currency: 'INR',
      source,
      reference: `PF-WALLET-${Date.now()}`
    }), { width: 230, margin: 2 }));
  };

  const submit = async event => {
    event.preventDefault();
    setError('');
    setMessage('');
    const numAmount = Number(amount || 0);
    if (!numAmount || numAmount <= 0) return;

    try {
      const response = await api.post(`/wallet/${mode}`, { amount: numAmount, source });
      setMessage(response.data.msg);
      setAmount('');
      setQr('');
      load();
    } catch {
      // Local offline mock wallet update when backend is offline
      const type = mode === 'add' ? 'CREDIT' : 'DEBIT';
      const newBal = updateMockWalletBalance(numAmount, type);
      const newTx = {
        reference: `PF-W-${Date.now().toString(36).toUpperCase()}`,
        amount: numAmount,
        type,
        source,
        createdAt: new Date().toISOString()
      };
      addMockWalletTransaction(newTx);
      setData({
        walletBalance: newBal,
        walletTransactions: getMockWalletTransactions()
      });
      setMessage(type === 'CREDIT' ? `Mock ₹${numAmount} credited to wallet` : `Mock ₹${numAmount} withdrawn from wallet`);
      setAmount('');
      setQr('');
    }
  };

  return <div className="pt-28 pb-16 min-h-screen max-w-4xl mx-auto px-4">
    <Link to="/profile" className="text-primary text-[10px] font-black uppercase tracking-widest">Back to profile</Link>
    <h1 className="text-5xl font-black uppercase italic tracking-tighter mt-5">Athlete <span className="text-primary">Wallet</span></h1>
    <div className="glass-card mt-8 p-8 bg-gradient-to-br from-primary/15 to-transparent">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Available mock balance</p>
      <p className="text-5xl font-black italic mt-2">₹{Number(data.walletBalance || 0).toLocaleString()}</p>
    </div>
    <div className="flex gap-3 mt-8">
      <button onClick={() => setMode('add')} className={`hero-button px-5 py-3 text-[10px] ${mode === 'add' ? '' : '!bg-white/5'}`}>
        <ArrowDownToLine size={15} className="inline mr-2" />Add money
      </button>
      <button onClick={() => setMode('withdraw')} className={`hero-button px-5 py-3 text-[10px] ${mode === 'withdraw' ? '' : '!bg-white/5'}`}>
        <ArrowUpFromLine size={15} className="inline mr-2" />Withdraw
      </button>
    </div>
    <form onSubmit={submit} className="glass-card mt-4 p-7 space-y-5">
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
        Amount
        <input type="number" min="1" required value={amount} onChange={event => setAmount(event.target.value)} className="input-hero mt-2 py-4" />
      </label>
      {mode === 'add' && (
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
          Funding source
          <select value={source} onChange={event => setSource(event.target.value)} className="input-hero mt-2 py-4">
            {sources.map(item => <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
          </select>
          <button type="button" onClick={generateQr} className="mt-3 text-primary text-xs uppercase tracking-widest">
            Generate QR for ₹{Number(amount || 0).toLocaleString()}
          </button>
        </label>
      )}
      <button className="hero-button w-full py-4">{mode === 'add' ? 'Credit wallet' : 'Withdraw funds'}</button>
      {qr && <img src={qr} alt="Mock wallet funding QR" className="w-48 h-48 bg-white p-2 mx-auto" />}
      {message && <p className="text-emerald-400 text-xs uppercase tracking-widest flex gap-2 items-center"><CheckCircle2 size={15} />{message}</p>}
      {error && <p className="text-primary text-xs uppercase tracking-widest">{error}</p>}
    </form>
    <div className="mt-8">
      <h2 className="text-2xl font-black uppercase italic flex items-center gap-2"><WalletIcon className="text-primary" />Transactions</h2>
      <div className="space-y-2 mt-4">
        {(data.walletTransactions || []).slice().reverse().map((item, index) => (
          <div key={`${item.reference}-${index}`} className="glass-card p-4 flex justify-between text-xs">
            <span>{item.source} · {new Date(item.createdAt).toLocaleDateString()}</span>
            <strong className={item.type === 'CREDIT' ? 'text-emerald-400' : 'text-primary'}>
              {item.type === 'CREDIT' ? '+' : '-'}₹{item.amount.toLocaleString()}
            </strong>
          </div>
        ))}
      </div>
    </div>
  </div>;
};

export default Wallet;
