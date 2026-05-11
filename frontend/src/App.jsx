import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, CalendarDays, Wallet, BarChart3, Settings, LogOut, Menu, ShieldCheck } from 'lucide-react';
import logo from './assets/rise-next-logo.jpeg';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';

const nav = [
  ['/', 'Dashboard', LayoutDashboard], ['/employees', 'Employees', Users], ['/attendance', 'Attendance', Clock],
  ['/leaves', 'Leaves', CalendarDays], ['/payroll', 'Payroll', Wallet], ['/reports', 'Reports', BarChart3], ['/settings', 'Settings', Settings]
];

function Shell(){
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'show' : ''}`}>
      <div className="brand"><img src={logo} className="brand-logo" alt="Rise Next"/><div><h1>RiseHR Pro</h1><p>Enterprise HRMS</p></div></div>
      <nav>{nav.map(([to,label,Icon]) => <NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'active':''}><Icon size={18}/>{label}</NavLink>)}</nav>
      <div className="sidebar-card"><ShieldCheck size={22}/><b>Secure Workspace</b><span>RBAC • JWT • Audit Ready</span></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="icon-btn mobile" onClick={()=>setOpen(!open)}><Menu/></button><div><h2>Welcome, {user?.name}</h2><p>{user?.role?.toUpperCase()} • Rise Next Pvt Ltd</p></div><button className="logout" onClick={logout}><LogOut size={17}/> Logout</button></header>
      <Routes>
        <Route path="/" element={<Dashboard/>}/><Route path="/employees" element={<Employees/>}/><Route path="/attendance" element={<Attendance/>}/><Route path="/leaves" element={<Leaves/>}/><Route path="/payroll" element={<Payroll/>}/><Route path="/reports" element={<Reports/>}/><Route path="/settings" element={<SettingsPage/>}/>
      </Routes>
    </main>
  </div>
}
export default function App(){ const { user } = useAuth(); return <Routes><Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/><Route path="/*" element={user?<Shell/>:<Navigate to="/login"/>}/></Routes> }
