import React from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux"
import Listing from './Listing'

const AllListings = () => {
    const { allItems } = useSelector((state)=> state.auctionItems)
  return (
    <AllListingsContainer>
    {allItems.map((listing) => {
      return <Listing 
      name={listing.item_name} 
      price={listing.current_price}
      key={listing.item_name}
      img={listing.img_url}
      endTime={listing.end_time}
       />;
    })}
  </AllListingsContainer>
  )
}

const AllListingsContainer = styled.div`
display: grid;
justify-content: center;
  grid-template-columns: repeat(4, minmax(50px, 1fr));
  grid-gap: 5rem;
  width: fit-content;
align-items: space-between;
  @media(max-width: 1020px) {
    display : grid;
    grid-template-columns: repeat(2, minmax(50px, 1fr));
}
`

export default AllListings