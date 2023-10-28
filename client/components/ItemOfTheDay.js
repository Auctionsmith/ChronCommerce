import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ItemOfTheDay = () => {
    const [itemOfTheDay, setitemOfTheDay] = useState({});
    // const { allItems } = useSelector((state)=> state.auctionItems)
    // const randomItem = allItems[Math.floor(Math.random() * (allItems.length - 0) + 0)]
    // name={listing.item_name} 
    // price={listing.current_price}
    // key={listing.item_name}
    // img={listing.img_url}
    // endTime={listing.end_time}

    // please note: seller_id needs to be updated to id from DB
    useEffect(()=>{
        axios.get('/auction/random')
            .then((res)=> setitemOfTheDay(()=>res.data))
            .catch((err)=> console.log(err))
    },[])


  return (
    <DayWrapper>
        <ImageContainer>
    <img src={itemOfTheDay.img_url}/>
        </ImageContainer>
        <DescriptionContainer>
            <p>Name: {itemOfTheDay.item_name}</p>
            <p>Ends In: {itemOfTheDay.end_time}</p>
            <p>Current Bid: $<b>{itemOfTheDay.current_price}</b></p>
            <IADetailsLink to={`/${itemOfTheDay.id}`}>Get More Details</IADetailsLink>
        </DescriptionContainer>
        </DayWrapper>
  )
}

const DayWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: var(--primary-color);
height: 300px;
gap: 20px;
`

const IADetailsLink = styled(Link)`
color: black;
border-radius:.5em;
padding: 10px;
text-decoration: none;
background-color: var(--bid-button-color);
`

const ImageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;
width: 24rem;
img{
    height: 18rem;
    width: 18rem;
}
`
const IODBidButton = styled.button`
background-color: var(--bid-button-color);
padding: 1rem;
border-radius: 1em;
`


const DescriptionContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1em;
`

export default ItemOfTheDay