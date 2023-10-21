import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import IndividualAuctionItem from '../pages/IndividualAuctionItem'

const Listing = ( { name, img, key, price, endTime } ) => {

  return (
    <ItemContainer key={key}>
      <img src={img} alt="pic"/>
      <p>Name :{name}</p>
      <p>Price : {price}</p>
      <p>Ends at {endTime}</p>
    </ItemContainer>
  )
}

const testContainer = styled.div`
display: flex;
flex-direction: column;
height: 15 rem;
width: 15 rem;
&:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0.5rem 0.75rem 1.5rem #bbbbbb;
}
`

const ItemContainer = styled.div`
display: flex;
flex-direction: column;
height : 16rem;
width : 14rem;
background-color : #F7F7F7;
transition: 0.2s;
border-radius: 1rem;
padding: 1rem;
p {
  margin: 2px;
}
flex: 1 0 25rem;
transition: 0.2s;

@media(max-width: 1020px) {
  
}

&:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0.5rem 0.75rem 1.5rem #bbbbbb;
}

img {
  max-height: 100%
}

`

export default Listing




// const Item = ({item}) => {
  
//   return (
//     <div className="item">
//       <img src="" alt="Image of an item for sale" />
//     <div className="sell-details">
//       <h2>{item.name}</h2>
//       <h2>{item.price}</h2>
//       <h4>{item.sellerName}</h4>
//       <h4>{item.sellerLocation}</h4>
//     </div>
//     <div className="sell-product-details">
//       <p>{item.details}</p>
//     </div>
//     </div>
//   );
// }
 
// export default Item;