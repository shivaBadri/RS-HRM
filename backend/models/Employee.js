import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true }, name: { type: String, required: true }, email: { type: String, required: true, unique: true }, phone: String,
  role: { type: String, default: 'employee' }, designation: String, department: String, manager: String, location: String,
  joiningDate: String, salary: Number, status: { type: String, default: 'Active' }, avatar: String,
  skills: [String], address: String, emergencyContact: String
}, { timestamps: true });
export default mongoose.model('Employee', employeeSchema);
