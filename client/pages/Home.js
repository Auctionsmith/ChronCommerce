import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar/SearchBar"
import ItemOfTheDay from "../components/ItemOfTheDay";
import AllListings from "../components/AllListings";



const Home = () => {
    return (
        <>        
        <Search>
        <SearchBar/>
     
        </Search>
        <hr></hr>
        <ItemOfTheDay/>
        <HotDealsTag>Hot Deals!</HotDealsTag>
        <Container>
        <AllListings />
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
const StyledInput = styled.input`
font-size: 1rem;
Border: none;
padding: 0px;
`
const HotDealsTag = styled.h2`
margin-left: 4rem;
`

const Container = styled.div`
display: flex;
background-color: white;
padding: 1rem;
`
export default Home;