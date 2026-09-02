import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HealthDetails from './pages/HealthDetails';
import Events from './pages/Events';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Ticket from './pages/Ticket';
import MyRaces from './pages/MyRaces';
import VerifyRegistration from './pages/VerifyRegistration';
import RaceDetail from './pages/RaceDetail';
import BookingConfirmation from './pages/BookingConfirmation';
import RaceRegistration from './pages/RaceRegistration';
import Payment from './pages/Payment';
import Wallet from './pages/Wallet';
import RaceList from './components/RaceList';
import ProtectedRoute from './components/ProtectedRoute';
import useTitle from './hooks/useTitle';
import Admin from './pages/Admin';
import AdminEvents from './pages/AdminEvents';
import Membership from './pages/Membership';

const AppContent = () => {
  useTitle();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
      <Navbar />
      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/register" element={<Register />} />
          <Route path="/membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/health" element={<ProtectedRoute><HealthDetails /></ProtectedRoute>} />
          <Route path="/events" element={<Events />} />
          <Route path="/races" element={<RaceList />} />
          <Route path="/races/marathon" element={<RaceList category="Marathon" />} />
          <Route path="/races/cycling" element={<RaceList category="Cycling" />} />
          <Route path="/races/swimming" element={<RaceList category="Swimming" />} />
          <Route path="/races/triathlon" element={<RaceList category="Triathlon" />} />
          <Route path="/races/duathlon" element={<RaceList category="Duathlon" />} />
          <Route path="/races/ironman" element={<RaceList category="IRONMAN" />} />
          <Route path="/races/hyrox" element={<RaceList category="HYROX" />} />
          <Route path="/races/devils-circuit" element={<RaceList category="Devils Circuit" />} />
          <Route path="/races/:category/:slug" element={<RaceDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-races" element={<ProtectedRoute><MyRaces /></ProtectedRoute>} />
          <Route path="/my-races/:registrationId" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
          <Route path="/my-races/:registrationId/ticket" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
          <Route path="/verify-registration/:registrationId" element={<VerifyRegistration />} />
          <Route path="/booking-confirmation/:registrationId" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
          <Route path="/race-registration" element={<ProtectedRoute><RaceRegistration /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
