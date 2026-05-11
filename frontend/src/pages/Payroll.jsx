import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Payroll() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/payroll')
      .then(r => setRows(r.data))
      .catch(err => {
        console.error('PAYROLL ERROR:', err);
        setError(err.message);
      });
  }, []);

  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1>Payroll & Payslips</h1>
          <p>Generated payroll records with salary breakdown.</p>
        </div>
      </div>
      {error && <div style={{color:'red',padding:'1rem'}}>Error: {error}</div>}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Employee</th><th>Month</th><th>Basic</th>
              <th>HRA</th><th>Allowances</th><th>Deductions</th><th>Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0
              ? <tr><td colSpan="7" style={{textAlign:'center',padding:'2rem'}}>No payroll records found</td></tr>
              : rows.map(r => (
                <tr key={r.id || r._id}>
                  <td>{r.employeeName}</td>
                  <td>{r.month}</td>
                  <td>₹{Math.round(r.basic).toLocaleString('en-IN')}</td>
                  <td>₹{Math.round(r.hra).toLocaleString('en-IN')}</td>
                  <td>₹{Math.round(r.allowances).toLocaleString('en-IN')}</td>
                  <td>₹{Math.round(r.deductions).toLocaleString('en-IN')}</td>
                  <td><b>₹{Math.round(r.netPay).toLocaleString('en-IN')}</b></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  );
}