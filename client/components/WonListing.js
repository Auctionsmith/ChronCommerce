import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { getWonItems } from '../slices/userSlice'
import { useDispatch } from 'react-redux'

const WonListing = () => {
    const dispatch = useDispatch();
    const { wonItems } = useSelector((state)=> state.user)
    const totalPrice = wonItems.reduce(((acc,curr) => acc + curr.current_price), 0)

    // comment this request back in to get wonAuctions for a User
    // axios.get('/user/wonAuctions')
    //     .then((data) => {
    //         console.log(data)
    //         dispatch(getWonItems(data))
    //     .catch(error)
    //     })

  return (
    <WonItemWrapper>
        <h2>Won Items</h2>
    {wonItems.map((item) => {
        return (
            <WonItemContainer>
            {/* <img src={item.img_url} alt="A picture of the item up for auction"/> */}
              <p>Name :{item.item_name}</p>
              <p>Price : <b>{item.current_price}</b></p>
              <p>Seller Id : <b>{item.seller_id}</b></p>
              <p>Auction Id : <b>{item.id}</b></p>
            </WonItemContainer>
        )
    })}
    <h4>Total Price: {totalPrice}</h4>
    </WonItemWrapper>
  )
}

const WonItemContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1em;
`

const WonItemWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 2em;
`

export default WonListing