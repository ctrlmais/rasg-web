import { Routes, Route } from 'react-router-dom';

import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';
import { Profile } from 'pages/Profile';
import { ReportBug } from 'pages/ReportBug';
import { ResetPassword } from 'pages/ResetPassword';
import { Schedule } from 'pages/Schedule';

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/p/:id" element={<Schedule />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/report-bug" element={<ReportBug />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
