import mongoose from 'mongoose';
const attendanceSchema = new mongoose.Schema({
  employeeId: String, employeeName: String, date: String,
  punchIn: String, punchOut: String, mode: { type: String, default: 'Office' }, status: { type: String, default: 'Present' },
  latitude: Number, longitude: Number, source: { type: String, default: 'Web' }
}, { timestamps: true });
export default mongoose.model('Attendance', attendanceSchema);
