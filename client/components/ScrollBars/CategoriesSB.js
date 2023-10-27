import React from 'react'
import styled from 'styled-components'

const CategoriesSB = ({ selectRef, form }) => {
  return (
    <CategoriesContainer id="categories">
        <select id="Search-categories" ref={selectRef}>
          {!form&&<option value="all categories">All Categories</option>}
          <option value="motors">Motors</option>
          <option value="clothing & accessories">Clothing & Accessories</option>
          <option value="sporting goods">Sporting Goods</option>
          <option value="electronics">Electronics</option>
          <option value="business & industrial">Business & Industrial</option>
          <option value="jewlery & watches">Jewlery & Watches</option>
          <option value="collections & art">Collectibles & Art</option>
          <option value="home & garden">Home & Garden</option>
          <option value="other">Other Categories</option>
        </select>  
    </CategoriesContainer>
  )
}

const CategoriesContainer = styled.div`
display: flex;
flex-direction: row;
height: 2em;
`

export default CategoriesSB