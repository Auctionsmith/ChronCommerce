import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Switch, useNavigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import axios from 'axios'
import { getUserInfo } from '../slices/userSlice'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import styled from 'styled-components'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

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
    <LoginWrapper>
      <BackgroundContainer>
      </BackgroundContainer>
    <LoginDetailsContainer className="login-container">
      <h3>Login</h3>
      <DetailsForm className="login" onSubmit={handleSubmit}>
          <label>Email/Username:</label>
          <input
            type="text"
            ref={usernameRef}/>
      
          <label>Password:</label>
          <input
            type="password"
            ref={passwordRef}
          />
     
        <button type="submit">Login</button>
      </DetailsForm>
    <footer className="signup-link">
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </footer>
  </LoginDetailsContainer>
  </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
display: flex;
flex-direction: row;
`
const BackgroundContainer = styled.div`
display: flex;
background-color: var(--primary-color);
width: 100vh;
height: 100vh;
`
const DetailsForm = styled.form`
display: flex;
flex-direction: column;
gap: 1em;
`

const LoginDetailsContainer = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1em;
width: 100vh;
height: 100vh;
`
 
export default Login;