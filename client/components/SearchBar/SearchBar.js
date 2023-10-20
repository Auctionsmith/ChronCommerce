import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchResultItems } from '../../slices/auctionItemsSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
 
  const selectRef = useRef(null);
  const searchRef = useRef(null);

  const search = async (event) => {
    event.preventDefault();
    // console.log('category', selectRef.current.value)
    // console.log('item', searchRef.current.value)
    const { data } = await axios.get('/searchAuctionItems',
      {params: {
        search: searchRef,
        category: selectRef,
      }},
      { withCredentials: true },
    );
    console.log(data)
    dispatch(setSearchResultItems(data))

  }

  return (
    <div>
      <form onSubmit={search} >
      <input type="text" placeholder="Search..." ref={searchRef}/>
        <select id="Search-categories" ref={selectRef}>
          <option value="allcategories">All Categories</option>
          <option value="motors">Motors</option>
          <option value="clothing&accessories">Clothing & Accessories</option>
          <option value="sportinggoods">Sporting Goods</option>
          <option value="electronics">Electronics</option>
          <option value="business&industrial">Business & Industrial</option>
          <option value="jewlery&watches">Jewlery & Watches</option>
          <option value="collectibles&art">Collectibles & Art</option>
          <option value="home&garden">Home & Garden</option>
          <option value="othercategories">Other Categories</option>
        </select>
      <button type="submit">Search</button>
      </form>
    </div>
  )
}

const SeachWrapper = styled.div`
display: flex;
flex-direction: row;
`

export default SearchBar;