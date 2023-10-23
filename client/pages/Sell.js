import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const Sell = () => {
  // form data set up with axios, append mutliple use refs

  return (
  <SellWrapper>
    <SellForm>
    <label>
      Name:
      <input type="text" name="name" />
    </label>
    <label>
    Name:
    <input type="text" name="name" />
    </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Image
    <input type="file" name="auctionImage" />
  </label>
 
  </SellForm>
</SellWrapper>
  )
}

const SellWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`

const SellForm = styled.form`
display: flex;
flex-direction: column;
gap: 30px;
`

export default Sell;

      