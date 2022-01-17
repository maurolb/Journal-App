import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRoutes = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path="register" element={<RegisterScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="login" />} />
        </Routes>
      </div>
    </div>
  );
};
