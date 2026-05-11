-- RiseHR Pro Supabase setup. Run this once in Supabase SQL Editor.

create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text unique not null,
  password text not null,
  role text default 'employee',
  "employeeId" text,
  status text default 'Active',
  created_at timestamptz default now()
);

create table if not exists employees (
  id uuid default gen_random_uuid() primary key,
  "employeeId" text unique not null,
  name text,
  email text,
  phone text,
  designation text,
  department text,
  manager text,
  location text,
  salary numeric default 0,
  role text default 'employee',
  status text default 'Active',
  "joiningDate" text,
  address text,
  "emergencyContact" text,
  created_at timestamptz default now()
);

create table if not exists attendance (
  id uuid default gen_random_uuid() primary key,
  "employeeId" text,
  "employeeName" text,
  date text,
  "punchIn" text,
  "punchOut" text,
  mode text default 'Office',
  latitude numeric,
  longitude numeric,
  source text default 'Web',
  status text default 'Present',
  created_at timestamptz default now()
);

create table if not exists leaves (
  id uuid default gen_random_uuid() primary key,
  "employeeId" text,
  "employeeName" text,
  "leaveType" text,
  "fromDate" text,
  "toDate" text,
  reason text,
  status text default 'Pending',
  approver text,
  created_at timestamptz default now()
);

create table if not exists payroll (
  id uuid default gen_random_uuid() primary key,
  "employeeId" text,
  "employeeName" text,
  month text,
  basic numeric default 0,
  hra numeric default 0,
  allowances numeric default 0,
  deductions numeric default 0,
  "netPay" numeric default 0,
  status text default 'Generated',
  created_at timestamptz default now()
);

-- Demo admin. node seed.js will add full demo employees.
insert into users (name,email,password,role,"employeeId",status)
values ('Admin','admin@risenext.in','admin123','admin','ADMIN001','Active')
on conflict (email) do update set password='admin123', role='admin', status='Active';
