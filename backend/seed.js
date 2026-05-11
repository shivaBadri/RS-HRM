import dotenv from 'dotenv';
dotenv.config();
import supabase from './config/supabase.js';

const employees = [
  ['RN001','Upendra','upendra@risenext.in','Director','Management','Admin','Hyderabad',125000,'admin'],
  ['RN002','Shiva Badri','shiva@risenext.in','Web Developer','Technology','Upendra','Hyderabad',55000,'employee'],
  ['RN003','Vinay','vinay@risenext.in','Director','Management','Admin','Hyderabad',115000,'admin'],
  ['RN004','Deekshitha','hr@risenext.in','HR Executive','Human Resources','Upendra','Hyderabad',45000,'hr'],
  ['RN005','Kiran Kumar','kiran@risenext.in','Full Stack Developer','Technology','Shiva Badri','Hyderabad',52000,'employee'],
  ['RN006','Sai Teja','saiteja@risenext.in','Frontend Developer','Technology','Shiva Badri','Hyderabad',42000,'employee'],
  ['RN007','Priyanka','priyanka@risenext.in','QA Analyst','Quality','Vinay','Hyderabad',39000,'employee'],
  ['RN008','Rahul','rahul@risenext.in','Backend Developer','Technology','Shiva Badri','Hyderabad',50000,'employee'],
  ['RN009','Sravani','sravani@risenext.in','Recruiter','Human Resources','Deekshitha','Hyderabad',36000,'employee'],
  ['RN010','Naveen','naveen@risenext.in','Digital Marketing Executive','Marketing','Vinay','Hyderabad',40000,'employee'],
  ['RN011','Anusha','anusha@risenext.in','UI Designer','Design','Shiva Badri','Hyderabad',41000,'employee'],
  ['RN012','Mahesh','mahesh@risenext.in','SEO Analyst','Marketing','Naveen','Hyderabad',35000,'employee'],
  ['RN013','Pavan','pavan@risenext.in','Accounts Executive','Finance','Upendra','Hyderabad',38000,'employee'],
  ['RN014','Deepthi','deepthi@risenext.in','Operations Executive','Operations','Vinay','Hyderabad',36000,'employee'],
  ['RN015','Arjun','arjun@risenext.in','Support Engineer','Support','Shiva Badri','Hyderabad',34000,'employee'],
  ['RN016','Meghana','meghana@risenext.in','Content Associate','Marketing','Naveen','Hyderabad',32000,'employee'],
  ['RN017','Rakesh','rakesh@risenext.in','Sales Executive','Sales','Vinay','Hyderabad',37000,'employee'],
  ['RN018','Bhavani','bhavani@risenext.in','Admin Executive','Administration','Upendra','Hyderabad',33000,'employee'],
  ['RN019','Santosh','santosh@risenext.in','Mobile App Developer','Technology','Shiva Badri','Hyderabad',53000,'employee'],
  ['RN020','Lavanya','lavanya@risenext.in','Payroll Executive','Finance','Pavan','Hyderabad',39000,'employee']
];

async function clear(table) {
  const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) console.log(`Clear ${table}:`, error.message);
}

await clear('payroll');
await clear('leaves');
await clear('attendance');
await clear('employees');
await clear('users');

await supabase.from('users').upsert({ name:'Admin', email:'admin@risenext.in', password:'admin123', role:'admin', employeeId:'ADMIN001', status:'Active' }, { onConflict:'email' });

for (const [employeeId,name,email,designation,department,manager,location,salary,role] of employees) {
  await supabase.from('employees').upsert({ employeeId, name, email, phone:'+91 90000 00000', designation, department, manager, location, salary, role, status:'Active', joiningDate:'2025-04-01', address:'Hyderabad, Telangana', emergencyContact:'+91 98854 00000' }, { onConflict:'employeeId' });
  await supabase.from('users').upsert({ name, email, password: role==='admin'?'admin123': role==='hr'?'hr123':'employee123', role, employeeId, status:'Active' }, { onConflict:'email' });
  await supabase.from('payroll').insert({ employeeId, employeeName:name, month:'May 2026', basic: salary * 0.55, hra: salary * 0.2, allowances: salary * 0.25, deductions: 1200, netPay: salary - 1200, status:'Generated' });
}
const today = new Date().toISOString().slice(0,10);
for (const emp of employees.slice(0,14)) {
  await supabase.from('attendance').insert({ employeeId:emp[0], employeeName:emp[1], date:today, punchIn:'09:45 AM', punchOut: emp[0]==='RN002' ? '' : '06:20 PM', mode:'Office', status:'Present', source:'Web' });
}
await supabase.from('leaves').insert({ employeeId:'RN006', employeeName:'Sai Teja', leaveType:'Casual Leave', fromDate:'2026-05-13', toDate:'2026-05-14', reason:'Personal work', status:'Pending' });
await supabase.from('leaves').insert({ employeeId:'RN012', employeeName:'Mahesh', leaveType:'Sick Leave', fromDate:'2026-05-08', toDate:'2026-05-08', reason:'Fever', status:'Approved', approver:'Deekshitha' });

console.log('Supabase seed completed');
process.exit();
