import React, { useEffect, useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import api from '../api';
export default function Employees(){
 const [employees,setEmployees]=useState([]),[q,setQ]=useState('');
 useEffect(()=>{api.get('/api/employees').then(r=>setEmployees(r.data))},[]);
 const filtered=employees.filter(e=>[e.name,e.department,e.designation,e.employeeId].join(' ').toLowerCase().includes(q.toLowerCase()));
 return <section className="page"><div className="page-head"><div><h1>Employee Directory</h1><p>Complete employee details, roles, departments, salary bands and reporting hierarchy.</p></div><button className="primary small"><PlusCircle size={16}/> Add Employee</button></div><div className="toolbar"><Search size={18}/><input placeholder="Search employee, department, designation..." value={q} onChange={e=>setQ(e.target.value)}/></div><div className="employee-grid">{filtered.map(e=><div className="employee-card" key={e._id}><div className="avatar">{e.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div><h3>{e.name}</h3><p>{e.designation}</p><span>{e.employeeId} • {e.department}</span></div><div className="meta"><b>₹{Number(e.salary||0).toLocaleString('en-IN')}</b><small>{e.location}</small></div><div className="chips"><span>{e.status}</span><span>{e.role}</span></div></div>)}</div></section>
}
