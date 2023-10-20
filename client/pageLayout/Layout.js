import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "../common/Footer"
import Header from "../common/Header"
import Home from "../pages/Home"
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AllListings from "../pages/AllListings.jsx";
import Cart from "../pages/Checkout";
import WatchList from "../pages/WatchList";


const Pages = () => {

    const Page = () => {
        return (
            <PageContainer>
                <Header />
                <Outlet />
                <Footer />
            </PageContainer>
        )
    }


    return (
        <>
        <Router>
            <Routes>

                <Route path="/" element={<Page />}>
                    <Route path ="/" element={<Home />} />
                    <Route path ='/login' element={<Login/>}/>
                    <Route path ='/signup' element={<SignUp/>}/>
                    <Route path ='/sell' element={<AllListings/>}/>
                    <Route path="/checkout"  element={<Cart/>}/>
                    <Route path="/watchlist" element={<WatchList/>}/>
                    <Route />
                </Route>
            </Routes>
            <Routes>
                    
                </Routes>
        </Router>
        </>
    )
}


const PageContainer = styled.div`
background-color: #F0F0F0;
`

export default Pages;