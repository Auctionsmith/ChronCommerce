import React from "react";
import styled from "styled-components";
import Categories from "../components/categories";
import SearchBar from "../components/SearchBar/SearchBar"
import ItemOfTheDay from "../components/ItemOfTheDay";
// import {createSlice} from "@reduxjs/toolkit";
import {BiSearch} from "react-icons/bi"


const Home = () => {
    return (
        <>        
        <Search>
        <SearchBar/>
     
        </Search>
        <hr></hr>
        <ItemOfTheDay/>
        <h2>Hot Deals!</h2>
        <Container>
        <Categories />
        </Container>
        <hr></hr>
        </>
    )
}


const Search = styled.div`
display: flex;
justify-content: center;
margin: auto;
margin-top: 1rem;
border : solid 0.5px;
width : 25rem;
`

const Table = styled.table`
justify-content: center;
display: flex;
margin-top: 1.0rem;
width : 100%;
height : 100%;
vertical-align: middle;

`

const StyledInput = styled.input`
font-size: 1rem;
Border: none;
padding: 0px;
`
const Container = styled.div`
display: flex;
  justify-content: space-evenly;
`
export default Home;