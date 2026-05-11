import React, { useEffect, useState } from 'react';
import { Users, Clock, CalendarDays, Wallet, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../api';
import StatCard from '../components/StatCard';
const trend=[{m:'Jan',v:72},{m:'Feb',v:76},{m:'Mar',v:81},{m:'Apr',v:88},{m:'May',v:93}];
export default function Dashboard(){
 const [summary,setSummary]=useState({}); const [leaves,setLeaves]=useState([]); const [attendance,setAttendance]=useState([]);
 useEffect(()=>{api.get('/api/reports/summary').then(r=>setSummary(r.data));api.get('/api/leaves').then(r=>setLeaves(r.data));api.get('/api/attendance').then(r=>setAttendance(r.data));},[]);
 const dept=(summary.departments||[]).map(d=>({name:d._id||'Other',value:d.count}));
 return <section className="page"><div className="hero"><div><span className="pill">Enterprise Control Center</span><h1>HR Operations Dashboard</h1><p>Monitor workforce, attendance, leaves, payroll and compliance from one premium command center.</p></div><div className="hero-kpi"><TrendingUp/><b>93%</b><span>Operational Health</span></div></div>
 <div className="stats-grid"><StatCard icon={Users} label="Employees" value={summary.employees||0} note="Active workforce"/><StatCard icon={Clock} label="Attendance Logs" value={summary.attendance||0} note="Live captured"/><StatCard icon={CalendarDays} label="Leave Requests" value={summary.leaves||0} note="Approval workflow"/><StatCard icon={Wallet} label="Payroll Records" value={summary.payroll||0} note="Generated slips"/></div>
 <div className="grid-2"><div className="panel"><h3>Monthly Attendance Performance</h3><ResponsiveContainer width="100%" height={260}><AreaChart data={trend}><XAxis dataKey="m"/><YAxis/><Tooltip/><Area type="monotone" dataKey="v" strokeWidth={3} fillOpacity={0.15}/></AreaChart></ResponsiveContainer></div><div className="panel"><h3>Department Distribution</h3><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={dept} dataKey="value" nameKey="name" outerRadius={90} label>{dept.map((_,i)=><Cell key={i}/>)}</Pie></PieChart></ResponsiveContainer></div></div>
 <div className="grid-2"><div className="panel"><h3>Recent Attendance</h3><div className="list">{attendance.slice(0,6).map(a=><div className="list-row" key={a._id}><b>{a.employeeName}</b><span>{a.date} • {a.punchIn} - {a.punchOut||'Working'}</span></div>)}</div></div><div className="panel"><h3>Leave Queue</h3><div className="list">{leaves.slice(0,6).map(l=><div className="list-row" key={l._id}><b>{l.employeeName}</b><span>{l.leaveType} • {l.status}</span></div>)}</div></div></div></section>
}
