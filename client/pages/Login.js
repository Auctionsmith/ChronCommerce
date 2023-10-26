import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Switch, useNavigate } from "react-router-dom";
import SignUp from "../pages/SignUp";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
  }

  return ( 
    <section className="login-container">
    <article className="login-box">
      <h3>Login</h3>
      <form className="login" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email/Username:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button>Login</button>
      </form>
    </article>
    <footer className="signup-link">
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </footer>
  </section>
  );
}
 
export default Login;