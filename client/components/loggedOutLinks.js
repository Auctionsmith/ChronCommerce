import React from 'react'
import styled from 'styled-components'
import { NavLink, Navlist } from "react-router-dom";

const LoggedOutLinks = () => {
  return (
    <LoggedOutLinksWrapper>
    <StyledLoggedOutLink to={"/login"}>Login</StyledLoggedOutLink>
    <StyledLoggedOutLink to={"/signup"}>Signout</StyledLoggedOutLink>
    </LoggedOutLinksWrapper>
  )
}

const StyledLoggedOutLink = styled(NavLink)`
display: flex;
flex-direction: row;
`

const LoggedOutLinksWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
`

export default LoggedOutLinks