import express from 'express';
import supabase from '../config/supabase.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  let query = supabase.from('leaves').select('*').order('created_at', { ascending: false });
  if (req.user.role === 'employee') query = query.eq('employeeId', req.user.employeeId);
  const { data, error } = await query;
  if (error) return res.status(500).json({ message: error.message });
  res.json((data || []).map(r => ({ ...r, _id: r.id })));
});

router.post('/', protect, async (req, res) => {
  const payload = { ...req.body, employeeId: req.user.employeeId, employeeName: req.user.name, status: 'Pending' };
  const { data, error } = await supabase.from('leaves').insert(payload).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json({ ...data, _id: data.id });
});

router.patch('/:id/status', protect, allowRoles('admin', 'hr', 'manager'), async (req, res) => {
  const { data, error } = await supabase
    .from('leaves')
    .update({ status: req.body.status, approver: req.user.name })
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ message: error.message });
  res.json({ ...data, _id: data.id });
});

export default router;
