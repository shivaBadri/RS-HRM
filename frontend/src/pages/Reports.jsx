import React,{useEffect,useState} from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import api from '../api';
export default function Reports(){ const [data,setData]=useState({departments:[]}); useEffect(()=>{api.get('/api/reports/summary').then(r=>setData(r.data))},[]); const chart=(data.departments||[]).map(x=>({department:x._id,count:x.count})); return <section className="page"><div className="page-head"><div><h1>HR Reports</h1><p>Department strength, attendance performance and operational analytics.</p></div><button className="primary small"><BarChart3 size={16}/> Export Report</button></div><div className="panel"><h3>Department-wise Employees</h3><ResponsiveContainer width="100%" height={360}><BarChart data={chart}><XAxis dataKey="department"/><YAxis/><Tooltip/><Bar dataKey="count" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div></section> }
