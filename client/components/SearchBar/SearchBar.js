import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchResultItems } from '../../slices/auctionItemsSlice'
import CategoriesSB from '../ScrollBars/CategoriesSB'

const SearchBar = () => {
  const dispatch = useDispatch()
 
  const selectRef = useRef(null);
  const searchRef = useRef(null);

  const printSelectCat = (event) => {
    event.preventDefault();    

   
    console.log(searchRef.current.value)
  }

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
    <>
      <SeachFormWrapper onSubmit={printSelectCat} >
      <SearchInput type="text" placeholder="  Search..." ref={searchRef}/>
      <CategoriesSB selectRef={selectRef}/>
        {/* <select id="Search-categories" ref={selectRef}>
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
        </select> */}
      <SearchButton type="submit">Search</SearchButton>
      </SeachFormWrapper>
    </>
  )
}



const SeachFormWrapper = styled.div`
display: flex;
flex-direction: row;
`

const SearchInput = styled.input`
width: 20em;
height: 2em;
`

const SearchButton = styled.button`
width: 10em;
`

export default SearchBar;