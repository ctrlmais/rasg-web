import { Routes, Route } from 'react-router-dom';

import { ForgetPassword } from 'pages/ForgetPassword';
import { Login } from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import { Privacy } from 'pages/Privacy';
import { Register } from 'pages/Register';
import { ResetPassword } from 'pages/ResetPassword';
import { Terms } from 'pages/Terms';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
