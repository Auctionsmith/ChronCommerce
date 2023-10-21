import React from "react";
import cart from "../assets/cart.png";
import styled from "styled-components";
import { NavLink, Navlist } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useSelector } from "react-redux"
import { FaRegBell } from "react-icons/fa6"
import LoggedInLinks from "../components/loggedInLinks";
import LoggedOutLinks from "../components/loggedOutLinks";

const Navigation = () => {
    const { LoggedIn } = useSelector((state)=>state.user)

    return (
        <NavContainer>
            {LoggedIn ? <LoggedInLinks/> : <LoggedOutLinks/>}
        </NavContainer>
    )
}


const Header = () => {
    const { userInfo } = useSelector((state)=> state.user)
    
    const timeBasedGreeting = (currTime = new Date().getHours(), name = userInfo.first_name) => {
        if(currTime >= 0 && currTime <= 12) return `Good Morning, ${name}`
        if(currTime > 12 && currTime <= 17) return `Good Afternoon, ${name}`
        if(currTime > 17) return `Good Evening, ${name}`
    }

    return (
            <HeaderWrapper>
                <HeaderContainer>
                    <h1>{timeBasedGreeting()}</h1>
                <Navigation />
                </HeaderContainer>
         
            </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
display: flex;
flex-direction: row;
justify-content: space-evenly;
background-color: white;
`

const Image = styled.img`
height : 20px;
width : 20px;
color: white;
`

const NavContainer = styled.nav`
display: flex;
list-style: none;
align-self: center;
gap: 25px;
`
const BellNavLink = styled(NavLink)`
padding: 10px;
background-color: white;
`

const StyledNavLink = styled(NavLink)`
color : #053B50;
padding: 10px;
`

const HeaderContainer = styled.div`
display: flex;
flex-direction: row;
gap: 30px;
h1{
    margin-right: 6em;
}
`


export default Header;