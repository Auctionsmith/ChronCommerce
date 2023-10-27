import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { getWonItems } from '../slices/userSlice'

const WonListing = () => {
    const { wonItems } = useSelector((state)=> state.user)

  return (
    wonItems.map((item) => {
        return (
            <div>
            <img src={item.img_url} alt="A picture of the item up for auction"/>
              <p>Name :{item.item_name}</p>
              <p>Price : <b>{item.current_price}</b></p>
            </div>
        )
    })
  )
}

export default WonListing