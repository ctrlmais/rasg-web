import { Routes, Route } from 'react-router-dom';

import { Home } from 'pages/Home';
import { MyTicket } from 'pages/MyTicket';
import { NotFound } from 'pages/NotFound';
import { Profile } from 'pages/Profile';
import { ResetPassword } from 'pages/ResetPassword';
import { Schedule } from 'pages/Schedule';

import { useAuth } from 'hooks/useAuth';

export function PrivateRoutes() {
  const { isBarbeiro } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/p/:id" element={<Schedule />} />
      <Route path="/ticket/:id" element={<MyTicket />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {isBarbeiro ? <Route path="/valida/:id" element={<NotFound />} /> : null}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
