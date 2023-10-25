import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'


const Listing = ( { name, img, price, endTime, id } ) => {

  return (
    <ItemContainer >
      <img src={img} alt="A picture of the item up for auction"/>
      <p>Name :{name}</p>
      <p>Price : {price}</p>
      <p>Ends at {endTime}</p>
      <ItemDetailsLink to={`/${id}`}>View Auction Details</ItemDetailsLink>
    </ItemContainer>
  )
}



const ItemDetailsLink = styled(Link)`
color: black;
border-radius:.5em;
padding: 10px;
text-decoration: none;
background-color: var(--bid-button-color);
`

const ItemContainer = styled.div`
display: flex;
flex-direction: column;
height : 18em;
width : 14rem;
background-color : #F7F7F7;
transition: 0.2s;
border-radius: 1rem;
p {
  margin: 2px;;
}
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