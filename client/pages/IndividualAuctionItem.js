import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { getFollowedItems } from '../slices/userSlice'

const IndividualAuctionItem = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const bidRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState({
    err: ''
  });
  const { allItems } = useSelector((state)=> state.auctionItems)
  const { followedItems } = useSelector((state)=> state.user)
  const listing = allItems.find((item)=>item.id == id)

  const makeBid = (event) => {
    event.preventDefault();
    let bid = bidRef.current.value
    axios.post(`user/bid/${id}`, 
    {
      "bidAmount": bid
    })
      .then((res)=> console.log(res))
      .catch((err)=> setErrorMessage({err: err.response.data}))
  }


  const followAuction = (event) => {
    event.preventDefault()

    axios.post(`/user/followedAuctions/${id}`)

      .then((data)=> {
        console.log(data)
        axios.get('/user/followedAuctions')
          .then((payload) =>{
            console.log(payload)
            dispatch(getFollowedItems(payload.data))
      })
    })
      .catch((err)=> console.log(err))
  }

  const unFollowAuction = (event) => {
    event.preventDefault()

    axios.delete(`/user/followedAuctions/${id}`)
    .then((data)=> {
      console.log(data)
      axios.get('/user/followedAuctions')
        .then((payload) =>{
          console.log(payload)
          dispatch(getFollowedItems(payload.data))
    })
  })
    .catch((err)=> console.log(err))
  }
 
  return (
    <ListingDetailsWrapper>
      <img src={listing.img_url} alt='Image of an auction item'></img>
      <DetailsContainer>
      <FBContainer>
        {!followedItems.find((e)=> e.id === listing.id) ? <FollowButton onClick={followAuction}>Follow</FollowButton> : <FollowButton onClick={unFollowAuction}>Unfollow</FollowButton>}
      </FBContainer>
      <h3>Name: {listing.item_name}</h3>
      <p>Price: <b>{listing.current_price}</b></p>
      <p>Ends at: {listing.end_time}</p>
      <p>Description: {listing.description}</p>
      <label>Please Enter a Bid Below</label>
      <input type='text' ref={bidRef}/>
      {errorMessage&&<BidError>{errorMessage.err}</BidError>}
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
background-color: var(--nav-button-color);
padding: 1em;
border-radius: 1em;
`

const BidError = styled.p`
color: darkred;
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