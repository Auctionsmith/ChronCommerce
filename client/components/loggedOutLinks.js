import React from 'react'
import styled from 'styled-components'
import { NavLink, Navlist } from "react-router-dom";

const LoggedOutLinks = () => {
  return (
    <LoggedOutLinksWrapper>
    <StyledLoggedOutLink to={"/login"}>Login</StyledLoggedOutLink>
    <StyledLoggedOutLink to={"/signup"}>Sign Up</StyledLoggedOutLink>
    </LoggedOutLinksWrapper>
  )
}

const StyledLoggedOutLink = styled(NavLink)`
color: black;
padding: 10px;
text-decoration: none;
font-size: 1.25em;
&:hover {
  background-color: var(--nav-button-color);
  border-radius: 1em;
}
`

const LoggedOutLinksWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
button{
  margin-left:5em;
}
`

export default LoggedOutLinks