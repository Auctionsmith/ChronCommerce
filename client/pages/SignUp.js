import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Switch, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";


const SignUp = () => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [city, setCity] = useState('')
  // const [zip, setZip] = useState('')
  // const [state, setState] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [address, setaddress] = useState('')
  

  const handleSubmit = async(e) =>{
    e.preventDefault()
  }
  console.log('test')
  return (
    <section className="signup-container">
    <article className="signup-box">
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
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
        <button className="signup-button">Signup</button>
      </form>
    </article>
    <footer className="login-link">
      Already have an account? <Link to="/login">Login</Link>
    </footer>
  </section>
  );
}
 
export default SignUp;