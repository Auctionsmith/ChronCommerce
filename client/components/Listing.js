import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import Countdown from './Countdown'

const Listing = ( { name, img, price, endTime, id } ) => {

  const dateFmt = (date) => {
    const newDate = moment(date)
    return newDate.format('MM/DD/YY hh:mm A')
  }
  dateFmt(endTime)
  return (
    <ItemContainer >
      <img src={img} alt="A picture of the item up for auction"/>
      <p>Name :{name}</p>
      <p>Price : <b>{price}</b></p>
      <p>Ends at {dateFmt(endTime)}</p>
      <Countdown date={endTime}/>
      <ItemDetailsLink to={`/${id}`}>View Auction Details</ItemDetailsLink>
    </ItemContainer>
  )
}



const ItemDetailsLink = styled(Link)`
display: grid;
color: black;
border-radius:1em;
padding: 10px;
text-decoration: none;
background-color: var(--bid-button-color);
justify-content: center;
`

const ItemContainer = styled.div`
display: flex;
flex-direction: column;
height : 18em;
width : 14rem;
background-color : #F7F7F7;
transition: 0.2s;
border-radius: 1rem;
position: relative;
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
  max-height: 100%;
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