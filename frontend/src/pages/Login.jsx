import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/rise-next-logo.jpeg";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@risenext.in");
  const [password, setPassword] = useState("admin123");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await login(email.trim().toLowerCase(), password.trim());
    } catch (error) {
      console.log("LOGIN PAGE ERROR:", error);
      setErr("Invalid login. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-art">
        <img src={logo} alt="Rise Next" className="login-logo" />

        <span className="pill">
          <Sparkles size={16} /> MNC Level HR Experience
        </span>

        <h1>RiseHR Pro</h1>

        <p>
          Premium HRM, Attendance, Leave, Payroll and Employee Operations Suite
          for growing companies.
        </p>

        <div className="glass-stats">
          <div>
            <b>20+</b>
            <span>Employees</span>
          </div>
          <div>
            <b>7</b>
            <span>Core Modules</span>
          </div>
          <div>
            <b>100%</b>
            <span>Responsive</span>
          </div>
        </div>
      </div>

      <form className="login-card" onSubmit={submit}>
        <img src={logo} alt="Rise Next" className="card-logo" />

        <div className="lock">
          <LockKeyhole />
        </div>

        <h2>Secure Login</h2>
        <p>Access your enterprise HR workspace</p>

        {err && <div className="error">{err}</div>}

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          autoComplete="email"
          required
        />

        <label>Password</label>
        <div className="password">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />

          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button className="primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>
      </form>
    </div>
  );
}