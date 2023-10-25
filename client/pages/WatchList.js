import React from 'react'
import styled from 'styled-components'
import Listing from '../components/Listing'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

const WatchList = () => {
  const { openBids } = useSelector((state)=> state.user)

  useEffect(()=>{
    axios.get('/openBids')
      .then((res) => res.data)
      .catch((err)=> console.log(err))
  }, [])

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