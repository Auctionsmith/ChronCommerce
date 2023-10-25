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
        <TitleAndListingsWrapper>
        <ItemOfTheDay/>
        <HotDealsTag>Hot Deals!</HotDealsTag>
        <Container>
        <AllListings />
        </Container>
        </TitleAndListingsWrapper>
        </>
    )
}


const Search = styled.div`
display: flex;
justify-content: center;
background-color: var(--secondary-color);
height: 3em;
`
// not necessary div, trying to figure out bottom padding
const TitleAndListingsWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 10em;
`
const StyledInput = styled.input`
font-size: 1rem;
Border: none;
padding: 0px;
`
const HotDealsTag = styled.h2`
margin-left: 4rem;
backgoround-color: var(--background-color);
`

const Container = styled.div`
display: flex;
background-color: var(--background-color);
padding: 1rem;
`
export default Home;