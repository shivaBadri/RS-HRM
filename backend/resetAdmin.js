import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
await connectDB();

const password = await bcrypt.hash("admin123", 10);

await User.findOneAndUpdate(
  { email: "admin@risenext.in" },
  {
    name: "Admin",
    email: "admin@risenext.in",
    password,
    role: "admin",
    employeeId: "ADMIN001",
    status: "Active",
  },
  { upsert: true, new: true }
);

console.log("Admin reset done");
process.exit();