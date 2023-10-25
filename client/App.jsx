import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Pages from "./pageLayout/Layout";
import { AllListings } from "./pages/AllListings.jsx";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App  = () => {

    return (
        <div>
            <Pages/>
        </div>
    )
}

export default App;