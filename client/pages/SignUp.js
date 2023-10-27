import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Switch, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import axios from 'axios'
import styled from 'styled-components'
import { useRef } from 'react'


const SignUp = () => {

  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentials = {
      first_name : firstName,
      last_name : lastName,
      email : email,
      password : password
    }
    axios.post('auth/register', credentials).then((data)=>{
      navigate('/login')
    }).catch((err)=>console.log(err))
  }
  
  return (
    <SignUpWrapper>
    <SignUpDetailsContainer className="signup-container">
      <h3>Signup</h3>
      <SignUpDetailsForm onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" ref={firstNameRef}/>

          <label>Last Name:</label>
          <input type="text" ref={lastNameRef}/>
        
          <label>Email:</label>
          <input type="email" ref={emailRef}/>
  
          <label>Password:</label>
          <input type="password"ref={passwordRef}/>

        <button className="signup-button">Signup</button>
      </SignUpDetailsForm>
      <div>
        <a href="/auth/google">Register with google</a>
      </div>
    <footer className="login-link">
      Already have an account? <Link to="/login">Login</Link>
    </footer>
  </SignUpDetailsContainer>
  <SUBackgroundContainer></SUBackgroundContainer>
  </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
display: flex;
flex-direction: row;
`
const SUBackgroundContainer = styled.div`
display: flex;
background-color: var(--primary-color);
width: 100vh;
height: 100vh;
`
const SignUpDetailsForm = styled.form`
display: flex;
flex-direction: column;
gap: 1em;
`

const SignUpDetailsContainer = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1em;
width: 100vh;
height: 100vh;
`
 
export default SignUp;