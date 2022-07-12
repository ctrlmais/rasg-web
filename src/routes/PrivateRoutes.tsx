import { Routes, Route } from 'react-router-dom';

import { Admin } from 'pages/Admin';
import { History } from 'pages/History';
import { Home } from 'pages/Home';
import { Horarios } from 'pages/Horarios';
import { MyTicket } from 'pages/MyTicket';
import { NotFound } from 'pages/NotFound';
import { Profile } from 'pages/Profile';
import { ResetPassword } from 'pages/ResetPassword';
import { Schedule } from 'pages/Schedule';

import { useAuth } from 'hooks/useAuth';

export function PrivateRoutes() {
  const { isBarbeiro, isAlexander } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/p/:id" element={<Schedule />} />
      <Route path="/ticket/:id" element={<MyTicket />} />
      <Route path="/history" element={<History />} />
      {isBarbeiro && <Route path="/horarios" element={<Horarios />} />}
      {isAlexander && <Route path="/admin" element={<Admin />} />}
      {isBarbeiro && <Route path="/valida/:id" element={<NotFound />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
