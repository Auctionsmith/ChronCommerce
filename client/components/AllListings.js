import React from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux"
import Listing from './Listing'

const AllListings = () => {
    const { allItems } = useSelector((state)=> state.auctionItems)
    // currently using the sellerId as the Id for child routes
  return (
    <AllListingsContainer>
    {allItems.map((listing, index) => {
      return <Listing 
      key={index}
      name={listing.item_name} 
      price={listing.current_price}
      id={listing.id}
      img={listing.img_url}
      endTime={listing.end_time}
       />;
    })}
  </AllListingsContainer>
  )
}

const AllListingsContainer = styled.div`
display: grid;
background-color: var(--background-color);
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