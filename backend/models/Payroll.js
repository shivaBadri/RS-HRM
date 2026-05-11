import mongoose from 'mongoose';
const payrollSchema = new mongoose.Schema({ employeeId: String, employeeName: String, month: String, basic: Number, hra: Number, allowances: Number, deductions: Number, netPay: Number, status: { type: String, default: 'Generated' } }, { timestamps: true });
export default mongoose.model('Payroll', payrollSchema);
