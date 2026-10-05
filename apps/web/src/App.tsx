import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatAssistant from './components/ChatAssistant';
import MarketingPage from './pages/MarketingPage';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Companies from './pages/admin/Companies';
import Users from './pages/admin/Users';
import AuditLogs from './pages/admin/AuditLogs';
import AdminOrders from './pages/admin/Orders';
import Dispatch from './pages/admin/Dispatch';
import Fleet from './pages/admin/Fleet';
import Warehouse from './pages/admin/Warehouse';
import Finance from './pages/admin/Finance';
import AiCenter from './pages/admin/AiCenter';
import Settings from './pages/admin/Settings';
import Analytics from './pages/admin/Analytics';

import CustomerLayout from './layouts/CustomerLayout';
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerProfile from './pages/customer/Profile';
import CustomerTickets from './pages/customer/Tickets';
import CustomerOrders from './pages/customer/Orders';

import DriverCockpit from './pages/driver/DriverCockpit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="dispatch" element={<Dispatch />} />
          <Route path="fleet" element={<Fleet />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="finance" element={<Finance />} />
          <Route path="ai" element={<AiCenter />} />
          <Route path="companies" element={<Companies />} />
          <Route path="users" element={<Users />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="users" element={<Users />} />
          <Route path="tickets" element={<CustomerTickets />} />
        </Route>

        {/* Driver Routes */}
        <Route path="/driver" element={<DriverCockpit />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatAssistant />
    </BrowserRouter>
  );
}

export default App;
