import express from 'express';
import supabase from '../config/supabase.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  let query = supabase.from('employees').select('*').order('created_at', { ascending: false });
  if (req.query.q) {
    const q = `%${req.query.q}%`;
    query = query.or(`name.ilike.${q},department.ilike.${q},designation.ilike.${q}`);
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ message: error.message });
  res.json((data || []).map(e => ({ ...e, _id: e.id })));
});

router.get('/:employeeId', protect, async (req, res) => {
  const { data, error } = await supabase.from('employees').select('*').eq('employeeId', req.params.employeeId).single();
  if (error) return res.status(404).json({ message: 'Employee not found' });
  res.json({ ...data, _id: data.id });
});

router.post('/', protect, allowRoles('admin', 'hr'), async (req, res) => {
  const { data, error } = await supabase.from('employees').insert(req.body).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json({ ...data, _id: data.id });
});

router.put('/:id', protect, allowRoles('admin', 'hr'), async (req, res) => {
  const { data, error } = await supabase.from('employees').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.json({ ...data, _id: data.id });
});

router.delete('/:id', protect, allowRoles('admin'), async (req, res) => {
  const { error } = await supabase.from('employees').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ message: error.message });
  res.json({ message: 'Employee removed' });
});

export default router;
