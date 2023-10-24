import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const IndividualAuctionItem = () => {
  const { id } = useParams()
  const { allItems } = useSelector((state)=> state.auctionItems)
    const listing = allItems.find((item)=>item.seller_id == id)
 
  return (
    <ListingDetailsWrapper>
      <img src={listing.img_url}></img>
      <DetailsContainer>
      <h2>Name: {listing.item_name}</h2>
      <h4>Price: {listing.current_price}</h4>
      <h4>Ends at: {listing.end_time}</h4>
      <p>Description: {listing.description}</p>
      <button>Bid</button>
      </DetailsContainer>
    </ListingDetailsWrapper>
  )
}

const ListingDetailsWrapper = styled.div`
display: flex;
flex-direction: row;
img {
  height: 500px;
  width: 500px;
}
`

const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
margin: 3em;
`

export default IndividualAuctionItem