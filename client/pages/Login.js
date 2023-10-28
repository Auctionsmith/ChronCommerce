import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Switch, useNavigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import axios from 'axios'
import { getUserInfo, getWonItems } from '../slices/userSlice'
import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState({
    err: ''
  });
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
      axios.get('auth/user').then((data)=>console.log(data)).catch((err)=>console.log(err))
      axios.get('user/wonAuctions').then((data)=>dispatch(getWonItems(data.data))).catch((err)=>console.log(err))
    })
    .catch((err)=> {
      console.log(err)
      setErrorMessage({
        err: err.response.data
      })
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
        <div><a href="/auth/google">Login With google</a></div>
        {errorMessage&&<InvalidLogin>{errorMessage.err}</InvalidLogin>}
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

const InvalidLogin = styled.p`
color: darkred;
text-align: center;
`
 
export default Login;