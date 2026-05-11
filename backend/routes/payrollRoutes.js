import express from 'express';
import supabase from '../config/supabase.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  let query = supabase.from('payroll').select('*').order('created_at', { ascending: false });
  if (req.user.role === 'employee') query = query.eq('employeeId', req.user.employeeId);
  const { data, error } = await query;
  if (error) return res.status(500).json({ message: error.message });
  res.json((data || []).map(r => ({ ...r, _id: r.id })));
});

router.post('/', protect, allowRoles('admin', 'hr'), async (req, res) => {
  const { data, error } = await supabase.from('payroll').insert(req.body).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json({ ...data, _id: data.id });
});

export default router;
