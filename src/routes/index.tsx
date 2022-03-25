import { Routes, Route } from 'react-router-dom';

import { ForgetPassword } from 'pages/ForgetPassword';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
import { ResetPassword } from 'pages/ResetPassword';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
