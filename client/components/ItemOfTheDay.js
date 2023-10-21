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
            <h2>Name: {randomItem.item_name}</h2>
            <h4>Ends In {randomItem.end_time}</h4>
            <h4>Current Bid {randomItem.current_price}</h4>
            <button>Bid</button>
        </DescriptionContainer>
        </DayWrapper>
  )
}

const DayWrapper = styled.div`
display: flex;
flex-direction: row;
height: 300px;
margin: 20px 20px 20px 40px;
gap: 20px;
width: 95%
`

const ImageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: blue;
color: white;
width: 24rem;
img{
    height: 24rem;
    width: 24rem;
    border: 10px solid black;
}
`


const DescriptionContainer = styled.div`
display: flex;
flex-direction: column;
`

export default ItemOfTheDay