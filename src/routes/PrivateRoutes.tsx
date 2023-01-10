import { Routes, Route } from 'react-router-dom';

import { Admin } from 'pages/Admin';
import { Camera } from 'pages/Camera';
import { History } from 'pages/History';
import { Home } from 'pages/Home';
import { Horarios } from 'pages/Horarios';
import { MyTicket } from 'pages/MyTicket';
import { NotFound } from 'pages/NotFound';
import { Privacy } from 'pages/Privacy';
import { Profile } from 'pages/Profile';
import { ReportBug } from 'pages/ReportBug';
import { Schedule } from 'pages/Schedule';
import { Services } from 'pages/Services';
import { Terms } from 'pages/Terms';
import { Tickets } from 'pages/Tickets';
import { Validate } from 'pages/Validate';
import { ValidateId } from 'pages/ValidateId';

import { usePerfil } from 'hooks/usePerfil';

export function PrivateRoutes() {
  const { isBarbeiro, isAdmin } = usePerfil();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/p/:id" element={<Schedule />} />
      <Route path="/ticket/:id" element={<MyTicket />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/history" element={<History />} />
      <Route path="/bug" element={<ReportBug />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      {isBarbeiro && <Route path="/services" element={<Services />} />}
      {isBarbeiro && <Route path="/scanner" element={<Camera />} />}
      {isBarbeiro && <Route path="/validate" element={<Validate />} />}
      {isBarbeiro && <Route path="/validate/:id" element={<ValidateId />} />}
      {isBarbeiro && <Route path="/schedules" element={<Horarios />} />}
      {isAdmin && <Route path="/admin" element={<Admin />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
