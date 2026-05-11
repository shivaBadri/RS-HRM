import express from 'express';
import supabase from '../config/supabase.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  let query = supabase.from('attendance').select('*').order('created_at', { ascending: false }).limit(200);
  if (req.user.role === 'employee') query = query.eq('employeeId', req.user.employeeId);
  const { data, error } = await query;
  if (error) return res.status(500).json({ message: error.message });
  res.json((data || []).map(r => ({ ...r, _id: r.id })));
});

router.post('/punch', protect, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const { data: existing } = await supabase
    .from('attendance')
    .select('*')
    .eq('employeeId', req.user.employeeId)
    .eq('date', today)
    .maybeSingle();

  if (existing && !existing.punchOut) {
    const { data, error } = await supabase
      .from('attendance')
      .update({ punchOut: now, status: 'Present' })
      .eq('id', existing.id)
      .select()
      .single();
    if (error) return res.status(500).json({ message: error.message });
    return res.json({ ...data, _id: data.id });
  }

  const payload = {
    employeeId: req.user.employeeId,
    employeeName: req.user.name,
    date: today,
    punchIn: now,
    punchOut: '',
    mode: req.body.mode || 'Office',
    latitude: req.body.latitude || null,
    longitude: req.body.longitude || null,
    source: req.body.source || 'Web',
    status: 'Present',
  };

  const { data, error } = await supabase.from('attendance').insert(payload).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json({ ...data, _id: data.id });
});

export default router;
