import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Switch, useNavigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import axios from 'axios'
import { getUserInfo } from '../slices/userSlice'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    let username = usernameRef.current.value
    let password = passwordRef.current.value


  axios.post('auth/login', {username: username, password: password})
    .then((payload)=> {  
      dispatch(getUserInfo(payload.data))
      navigate('/')
      axios.get('auth/user').then((data)=>console.log(data))
    })


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
            ref={usernameRef}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            ref={passwordRef}
          />
        </div>
        <button>Login</button>
      </form>
    </article>
    <div><a href="/auth/google"></a></div>
    <footer className="signup-link">
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </footer>
  </section>
  );
}
 
export default Login;