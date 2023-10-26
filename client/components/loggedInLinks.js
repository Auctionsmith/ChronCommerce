import React from 'react'
import styled from 'styled-components'
import { NavLink, Navlist } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/userSlice'
import axios from 'axios'

const LoggedInLinks = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const {LoggedIn} = useSelector(state=>state.userInfo) 
    const {LoggedIn} = useSelector(state=>state.user)
    //  If not logged in

    const handleLogout = () => {
      if (!LoggedIn) {
        navigate("/")
      }
      else {
        axios.post("/auth/logout")
        .then(()=>{
          dispatch(logout())
          navigate("/")
        }).catch((error)=>{
          navigate('/')
        })
      }        
    }

  return (
    <LoggedInLinksWrapper>
        <StyledLoggedInLink to={"/"}>Home</StyledLoggedInLink>
        <StyledLoggedInLink to={"/sell"}>Sell</StyledLoggedInLink>
        <StyledLoggedInLink to={"/watchlist"}>Watchlist</StyledLoggedInLink>
        <CheckoutBadgeLink to={"/checkout"}>
            <FaRegBell/>
        </CheckoutBadgeLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </LoggedInLinksWrapper>
  )
}

const StyledLoggedInLink = styled(NavLink)`
color: black;
padding: 10px;
text-decoration: none;
font-size: 1.25em;
&:hover {
  text-decoration: underline;
}
`

const CheckoutBadgeLink = styled(NavLink)`
color: black;
padding: 10px;
text-decoration: none;
font-size: 1.25em;
&:hover {
  text-decoration: underline;
}
`

const LogoutButton = styled.button`
color: black;
padding: 10px;
background-color: transparent;
border: none;
text-decoration: none;
font-size: 1.25em;
&:hover {
  text-decoration: underline;
}
`

const LoggedInLinksWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
button{
  margin-left:5em;
}
`

export default LoggedInLinks