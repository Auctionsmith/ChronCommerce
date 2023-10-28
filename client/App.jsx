import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Pages from "./pageLayout/Layout";
import { AllListings } from "./pages/AllListings.jsx";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import axios from 'axios'
import { setAllItems } from "./slices/auctionItemsSlice";

const App  = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get('/auction')
        .then(data => { console.log(data.data)
        
            dispatch(setAllItems(data.data))
        })
        .catch(err => console.log(err))
    })

    return (
        <div>
            <Pages/>
        </div>
    )
}

export default App;