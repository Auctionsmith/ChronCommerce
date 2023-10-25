import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const ItemOfTheDay = () => {
    const { allItems } = useSelector((state)=> state.auctionItems)
    const randomItem = allItems[Math.floor(Math.random() * (allItems.length - 0) + 0)]

    // name={listing.item_name} 
    // price={listing.current_price}
    // key={listing.item_name}
    // img={listing.img_url}
    // endTime={listing.end_time}

  return (
    <DayWrapper>
        <ImageContainer>
    <img src={randomItem.img_url}/>
        </ImageContainer>
        <DescriptionContainer>
            <p>Name: {randomItem.item_name}</p>
            <p>Ends In: {randomItem.end_time}</p>
            <p>Current Bid: <b>{randomItem.current_price}</b></p>
            <IODBidButton>Bid</IODBidButton>
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