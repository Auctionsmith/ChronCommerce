import React from 'react'
import styled from 'styled-components'
import Listing from '../components/Listing'
import { useSelector } from 'react-redux'

const WatchList = () => {
  const { openBids } = useSelector((state)=> state.user)

  return (
    <WatchListContainer> {openBids.map((listing) => {
      return <Listing 
      name={listing.item_name} 
      price={listing.current_price}
      key={listing.item_name}
      id={listing.seller_id}
      img={listing.img_url}
      endTime={listing.end_time}
       />;
    })}</WatchListContainer>
  )
}

const WatchListContainer = styled.div`
display: flex;
flex-direction: column;
margin-left: 4em;
`

export default WatchList