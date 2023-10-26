import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { useRef } from 'react'

const IndividualAuctionItem = () => {
  const { id } = useParams()
  const bidRef = useRef(null);
  // import follow state?
  const follow = false;

  const { allItems } = useSelector((state)=> state.auctionItems)
    const listing = allItems.find((item)=>item.seller_id == id)

  const makeBid = (event) => {
    event.preventDefault();
    let bid = bidRef.current.value
    console.log(bid)
    // axios.post('')

  }
 
  return (
    <ListingDetailsWrapper>
      <img src={listing.img_url} alt='Image of an auction item'></img>
      <DetailsContainer>
      <FBContainer>
        {follow ? <FollowButton>Follow</FollowButton> : <FollowButton>Unfollow</FollowButton>}
      </FBContainer>
      <h3>Name: {listing.item_name}</h3>
      <p>Price: <b>{listing.current_price}</b></p>
      <p>Ends at: {listing.end_time}</p>
      <p>Description: {listing.description}</p>
      <label>Please Enter a Bid Below</label>
      <input type='text' ref={bidRef}/>
      <IABidButton onClick={makeBid}>Bid</IABidButton>
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
const FollowButton = styled.button`
background-color: red;
`

const FBContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`

const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
background-color: var(--primary-color);
padding: 4em;
margin: 3em;
gap: 2em;
`

const IABidButton = styled.button`
background-color: var(--bid-button-color);
padding: 1rem;
border-radius: 1em;
`

export default IndividualAuctionItem