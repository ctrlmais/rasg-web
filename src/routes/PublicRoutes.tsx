import { Routes, Route } from 'react-router-dom';

import { ForgetPassword } from 'pages/ForgetPassword';
import { Login } from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import { Register } from 'pages/Register';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
