import React from 'react';
export default function StatCard({ icon:Icon, label, value, note }){ return <div className="stat-card"><div className="stat-icon"><Icon size={22}/></div><div><p>{label}</p><h3>{value}</h3><span>{note}</span></div></div> }
