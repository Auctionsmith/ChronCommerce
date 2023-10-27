import React from 'react'
import styled from 'styled-components'
import Listing from '../components/Listing'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getAllOpenBids, getFollowedItems } from '../slices/userSlice'

const WatchList = () => {
  const dispatch = useDispatch()
  const { openBids, followedItems } = useSelector((state)=> state.user)

  // openBids scrollbar Data
  // dispatch(getAllOpenBids(res.data))

  useEffect(()=>{
    axios.get('/user/openBids')
      .then((payload) => {
        console.log(payload.data)
        dispatch(getAllOpenBids(payload.data))
      })
      .catch((err)=> console.log(err))
  }, [])

  // followAuctions scrollbar Data
  // dispatch(getFollowedItems(res.data))
  useEffect(()=>{
    axios.get('/user/followedAuctions')
      .then((payload) =>{
        console.log(payload)
        dispatch(getFollowedItems(payload.data))
      })
      .catch((err)=> console.log(err))
  }, [])

  return (
    <WatchListContainer>
      <h2>Open Bids</h2>
    <OpenBidsContainer>
    {openBids.map((listing) => {
      return <Listing 
      name={listing.item_name} 
      price={listing.current_price}
      key={listing.item_name}
      id={listing.seller_id}
      img={listing.img_url}
      endTime={listing.end_time}
       />;
    })}</OpenBidsContainer>
    <h2>Followed Auctions</h2>
    <FollowAuctionsContainer>
    {followedItems.map((listing) => {
      return <Listing 
      name={listing.item_name} 
      price={listing.current_price}
      key={listing.item_name}
      id={listing.seller_id}
      img={listing.img_url}
      endTime={listing.end_time}
       />;
    })}

    </FollowAuctionsContainer>
    </WatchListContainer>
  )
}

const WatchListContainer = styled.div`
display: flex;
flex-direction: column;
gap: 2em;
padding: 2em;
`

const OpenBidsContainer = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 4em;
flex-wrap:nowrap;
overflow-x: auto;
`

const FollowAuctionsContainer = styled.div`
display: flex;
flex-direction: row;
margin-left: 4em;
flex-wrap:nowrap;
overflow-x: auto;
`

export default WatchList