import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import SellForm from '../components/Forms/sellForm'

const Sell = () => {
  // form data set up with axios, append mutliple use refs

  return (
  <SellWrapper>
    <SellForm/>
  </SellWrapper>
  )
}

const SellWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

export default Sell;

      