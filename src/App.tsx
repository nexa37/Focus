/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';

function getIsStandaloneLaunch() {
  if (typeof window === 'undefined') return false;
  const searchParams = new URLSearchParams(window.location.search);
  const isPwaSource = searchParams.get('source') === 'pwa' || searchParams.get('standalone') === 'true';
  const isStandaloneDisplay =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  return isPwaSource || isStandaloneDisplay;
}

export default function App() {
  const isStandalone = getIsStandaloneLaunch();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isStandalone ? <Dashboard /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="*" element={isStandalone ? <Dashboard /> : <Landing />} />
      </Routes>
    </Router>
  );
}
