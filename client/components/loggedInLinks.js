import React from 'react'
import styled from 'styled-components'
import { NavLink, Navlist } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6"
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice'

const LoggedInLinks = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

  return (
    <LoggedInLinksWrapper>
        <StyledLoggedInLink to={"/"}>Home</StyledLoggedInLink>
        <StyledLoggedInLink to={"/sell"}>Sell</StyledLoggedInLink>
        <StyledLoggedInLink to={"/watchlist"}>Watchlist</StyledLoggedInLink>
        <StyledLoggedInLink to={"/checkout"}>
            <FaRegBell/>
        </StyledLoggedInLink>
        <button onClick={handleLogout}>Logout</button>
    </LoggedInLinksWrapper>
  )
}

const StyledLoggedInLink = styled(NavLink)`
background-color: var(--nav-button-color);
color: black;
border-radius:.5em;
padding: 10px;
text-decoration: none;
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