import React, { useEffect, useState } from 'react';
import { ArrowRight, DollarSign, Lock, LogOut, Mail, ShieldCheck, Trash2, Users, UserCheck, UserX, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { adminService, authService } from '../services/api';

const formatDate = (value) => value ? new Date(value).toLocaleDateString() : 'Not available';

const Admin = () => {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const logout = useStore(state => state.logout);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [dashboard, setDashboard] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [price, setPrice] = useState('4999');
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [dashboardResponse, registrationResponse] = await Promise.all([
        adminService.getDashboard(),
        adminService.getRegistrations()
      ]);
      setDashboard(dashboardResponse.data);
      setRegistrations(registrationResponse.data);
      const activeMember = dashboardResponse.data.users.find(item => item.membershipStatus === 'ACTIVE');
      if (activeMember) setPrice(String(activeMember.membershipPrice ?? 4999));
    } catch (requestError) {
      setError(requestError.response?.data?.msg || 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN' && localStorage.getItem('paceforge_token')) loadDashboard();
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(credentials);
      if (response.data.user.role !== 'ADMIN') {
        throw new Error('This account does not have admin access.');
      }
      localStorage.setItem('paceforge_token', response.data.token);
      setUser(response.data.user);
    } catch (requestError) {
      setError(requestError.response?.data?.msg || requestError.message || 'Admin authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const updateMembership = async (id, membershipStatus) => {
    try {
      await adminService.updateUser(id, { membershipStatus });
      setNotice('Membership status updated.');
      await loadDashboard();
    } catch (requestError) {
      setError(requestError.response?.data?.msg || 'Unable to update membership.');
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm('Remove this user and their race registrations?')) return;
    try {
      await adminService.deleteUser(id);
      setNotice('User removed.');
      await loadDashboard();
    } catch (requestError) {
      setError(requestError.response?.data?.msg || 'Unable to remove user.');
    }
  };

  const savePrice = async (event) => {
    event.preventDefault();
    try {
      await adminService.updateSettings({ membershipPrice: price });
      setNotice('Membership price updated.');
      await loadDashboard();
    } catch (requestError) {
      setError(requestError.response?.data?.msg || 'Unable to update price.');
    }
  };

  if (user?.role !== 'ADMIN' || !localStorage.getItem('paceforge_token')) {
    return (
      <div className="pt-28 pb-16 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,6,0,0.18),transparent_45%),#050505]" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg relative z-10">
          <div className="glass-card p-8 md:p-14">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"><ShieldCheck size={28} /></div>
              <div><p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">PaceForge Control</p><h1 className="text-3xl font-black uppercase italic tracking-tighter">Admin Login</h1></div>
            </div>
            {error && <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-md text-primary text-[11px] font-black uppercase tracking-widest text-center">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-6">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Admin email<div className="relative mt-2"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} /><input type="email" required className="input-hero pl-12 py-4" value={credentials.email} onChange={event => setCredentials({ ...credentials, email: event.target.value })} /></div></label>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Password<div className="relative mt-2"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} /><input type="password" required className="input-hero pl-12 py-4" value={credentials.password} onChange={event => setCredentials({ ...credentials, password: event.target.value })} /></div></label>
              <button disabled={loading} className="hero-button w-full py-4 disabled:opacity-50">{loading ? 'Authenticating...' : <span className="flex items-center justify-center">Enter Control Room <ArrowRight className="ml-2" size={18} /></span>}</button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const stats = dashboard?.stats || { totalUsers: 0, paidMembers: 0, freeUsers: 0, registrations: 0 };
  return (
    <div className="pt-28 pb-16 min-h-screen px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
        <div><p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">PaceForge Control Room</p><h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Member <span className="text-primary">Intel</span></h1></div>
        <button onClick={logout} className="self-start md:self-auto flex items-center gap-2 px-4 py-3 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"><LogOut size={15} /> Sign out</button>
      </div>
      {error && <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-md text-primary text-[11px] font-black uppercase tracking-widest">{error}</div>}
      {notice && <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-[11px] font-black uppercase tracking-widest">{notice}</div>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[[Users, 'Total users', stats.totalUsers], [UserCheck, 'Paid members', stats.paidMembers], [UserX, 'Free users', stats.freeUsers], [CalendarDays, 'Race registrations', stats.registrations]].map(([Icon, label, value]) => <div key={label} className="glass-card p-5"><Icon className="text-primary mb-5" size={22} /><p className="text-3xl font-black">{value}</p><p className="mt-1 text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</p></div>)}
      </div>
      <div className="glass-card p-5 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Membership control</p><h2 className="text-2xl font-black uppercase italic tracking-tighter">Annual price</h2></div><form onSubmit={savePrice} className="flex gap-2"><div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} /><input type="number" min="0" required value={price} onChange={event => setPrice(event.target.value)} className="input-hero pl-9 py-3 w-40" /></div><button className="hero-button px-5 py-3 text-[10px]">Save</button></form></div>
      </div>
      <div className="flex gap-6 border-b border-white/10 mb-6"><button onClick={() => setTab('users')} className={`pb-3 text-[10px] font-black uppercase tracking-widest ${tab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Users</button><button onClick={() => setTab('registrations')} className={`pb-3 text-[10px] font-black uppercase tracking-widest ${tab === 'registrations' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Registrations</button></div>
      {tab === 'users' ? <div className="space-y-3">{(dashboard?.users || []).map(member => <div key={member._id} className="glass-card p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4"><div className="flex-1 min-w-0"><p className="font-black uppercase italic truncate">{member.name}</p><p className="text-xs text-gray-500 truncate">{member.email}</p><p className="text-[10px] text-gray-600 uppercase tracking-widest mt-2">Joined {formatDate(member.createdAt)}</p></div><span className={`self-start md:self-auto px-3 py-2 rounded-md text-[9px] font-black tracking-widest ${member.membershipStatus === 'ACTIVE' ? 'bg-primary/15 text-primary' : 'bg-white/10 text-gray-400'}`}>{member.membershipStatus}</span><div className="flex gap-2"><button onClick={() => updateMembership(member._id, member.membershipStatus === 'ACTIVE' ? 'FREE' : 'ACTIVE')} className="px-3 py-2 border border-white/10 rounded-md text-[9px] font-black uppercase tracking-widest hover:border-primary hover:text-primary">{member.membershipStatus === 'ACTIVE' ? 'Make free' : 'Activate'}</button><button title="Remove user" onClick={() => removeUser(member._id)} className="p-2 border border-white/10 rounded-md text-gray-500 hover:border-primary hover:text-primary"><Trash2 size={15} /></button></div></div>)}{!dashboard?.users?.length && <p className="text-gray-500 text-sm">No users registered yet.</p>}</div> : <div className="space-y-3">{registrations.map(registration => <div key={registration._id} className="glass-card p-4 md:p-5"><div className="flex flex-col md:flex-row md:items-center justify-between gap-3"><div><p className="font-black uppercase italic">{registration.user?.name || 'Unknown user'}</p><p className="text-xs text-gray-500">{registration.user?.email}</p></div><span className="text-[9px] font-black uppercase tracking-widest text-primary">{registration.status}</span></div><div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] uppercase tracking-widest text-gray-500"><span>{registration.event?.title || 'Race'}</span><span>{registration.category}</span><span>{formatDate(registration.registrationDate)}</span><span>{registration.amount ? `₹${registration.amount}` : 'Free'}</span></div></div>)}{!registrations.length && <p className="text-gray-500 text-sm">No race registrations yet.</p>}</div>}
    </div>
  );
};

export default Admin;
