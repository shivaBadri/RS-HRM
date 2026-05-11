import express from 'express';
import supabase from '../config/supabase.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/summary', protect, async (_req, res) => {
  const [employeesRes, attendanceRes, leavesRes, payrollRes, empRows] = await Promise.all([
    supabase.from('employees').select('id', { count: 'exact', head: true }),
    supabase.from('attendance').select('id', { count: 'exact', head: true }),
    supabase.from('leaves').select('id', { count: 'exact', head: true }),
    supabase.from('payroll').select('id', { count: 'exact', head: true }),
    supabase.from('employees').select('department'),
  ]);

  const deptMap = {};
  (empRows.data || []).forEach(e => {
    const dep = e.department || 'Other';
    deptMap[dep] = (deptMap[dep] || 0) + 1;
  });
  const departments = Object.entries(deptMap).map(([name, count]) => ({ _id: name, count }));

  res.json({
    employees: employeesRes.count || 0,
    attendance: attendanceRes.count || 0,
    leaves: leavesRes.count || 0,
    payroll: payrollRes.count || 0,
    departments,
  });
});

export default router;
