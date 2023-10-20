import React from "react";
import cart from "../assets/cart.png";
import styled from "styled-components";
import { NavLink, Navlist } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useSelector } from "react-redux"

const linksLoggedIn = [
    {name: "SignUp", path:"/signup"},
    {name:"Login", path: "/login"},
    {name: "Sell", path: "/listing"},
    {name:"MyCommerce", path: "/cart"}
]

const linksNotLoggedIn = [
    {name: "SignUp", path:"/signup"},
    {name:"Login", path: "/login"}
]

const Navigation = () => {
    const { LoggedIn } = useSelector((state)=>state.user)
    const links = LoggedIn ? linksLoggedIn : linksNotLoggedIn


    return (
        <NavContainer>
            {
                links.map((link, index) => (
                    <li key={index}>
                        <StyledNavLink to={link.path} exact="true">
                            {link.name}
                        </StyledNavLink>
                    </li>
                ))
            }
        </NavContainer>
    )
}


const Header = () => {
    return (
            <HeaderWrapper>
                <HeaderContainer>
                    <h1>Welcome Back, User</h1>
                <Navigation />

                </HeaderContainer>
         
            </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
display: flex;
flex-direction: row;
background-color: white;
`

const Image = styled.img`
height : 20px;
width : 20px;
color: white;
`

const NavContainer = styled.nav`
display : flex;
list-style: none;
height: 50px;
align-self: center;
gap: 10px;
`
const StyledNavLink = styled(NavLink)`
color : #053B50;
`

const HeaderContainer = styled.div`
display: flex;
flex-direction: row;
gap: 50px;
`


export default Header;