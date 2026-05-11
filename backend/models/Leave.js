import mongoose from 'mongoose';
const leaveSchema = new mongoose.Schema({ employeeId: String, employeeName: String, leaveType: String, fromDate: String, toDate: String, reason: String, status: { type: String, default: 'Pending' }, approver: String }, { timestamps: true });
export default mongoose.model('Leave', leaveSchema);
