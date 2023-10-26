import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, Switch, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../common/Footer"
import Header from "../common/Header"
import Home from "../pages/Home"
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AllListings from "../pages/AllListings.jsx";
import WatchList from "../pages/WatchList";
import Sell from '../pages/Sell'
import IndividualAuctionItem from "../pages/IndividualAuctionItem";
import PaymentForm from "../pages/Checkout";


const Pages = () => {
    // let { id } = useParams()

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
                    <Route path ="/:id"element={<IndividualAuctionItem/>}/>
                    <Route path ='/login' element={<Login/>}/>
                    <Route path ='/signup' element={<SignUp/>}/>
                    <Route path ='/sell' element={<Sell/>}/>
                    <Route path="/checkout"  element={<PaymentForm/>}/>
                    <Route path="/watchlist" element={<WatchList/>}/>
                    <Route />
                </Route>
            </Routes>
        </Router>
        </>
    )
}


const PageContainer = styled.div`
background-color: var(--background-color);
`

export default Pages;