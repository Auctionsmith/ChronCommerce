import React from 'react'
import { FaRegBell } from "react-icons/fa6"
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const AuctionBadge = () => {
  const { wonItems } = useSelector((state)=> state.user)
  const wonCount = wonItems.length;

  return (
    <BellContainer>
      <FaRegBell/>
      {wonCount>0&&<Notification>{wonCount}</Notification>}
    </BellContainer>
  )
}

const BellContainer = styled.div`
position: relative;
background-color: var(--nav-button-color);
border: 1px solid black;
border-radius: 48%;
padding: .5em;
`
const Notification = styled.span`
background-color: #fa3e3e;
border-radius: 48%;
color: white;
padding: .5em;
font-size: .6em;
transform: translateX(-15%) translateY(-70%);
position: absolute;
`
export default AuctionBadge