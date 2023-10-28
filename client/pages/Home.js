import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar/SearchBar"
import ItemOfTheDay from "../components/ItemOfTheDay";
import AllListings from "../components/AllListings";
import axios from 'axios'
import { setAllItems } from '../slices/auctionItemsSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const Home = () => {
    const dispatch = useDispatch();


// initial get request to populate listings in Home
useEffect(()=>{
    axios.get('/auction')
    .then(data => { console.log(data.data)
    
        dispatch(setAllItems(data.data))
    })
    .catch(err => console.log(err))
})


    return (
        <HomeWrapper>        
        <Search>
        <SearchBar/>
        </Search>
   
        <ItemOfTheDay/>
        <Container>
        <HotDealsTag>Hot Deals!</HotDealsTag>
        <AllListings />
        </Container>
      
        </HomeWrapper>
    )
}

const HomeWrapper = styled.div`
padding: 0;
`

const Search = styled.div`
display: flex;
justify-content: center;
background-color: var(--secondary-color);
height: 3em;
`
// not necessary div, trying to figure out bottom padding

const StyledInput = styled.input`
font-size: 1rem;
Border: none;
padding: 0px;
`
const HotDealsTag = styled.h2`
margin: 5em;
background-color: var(--background-color);
padding: 5px;
`

const Container = styled.div`
display: flex;
background-color: var(--background-color);
padding: 3rem;
flex-direction: column;
align-items: center;
justify-content: center;
`
export default Home;