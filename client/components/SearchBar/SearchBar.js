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

  // test refs fucn
  const printSelectCat = (event) => {
    event.preventDefault();    

   console.log('searchRef Test', searchRef.current.value)
  console.log("selectRef Test", selectRef.current.value)
  }

  // update search into onclick once testing 
  // const search = async (event) => {
  //   event.preventDefault();
  //   let search = searchRef.current.value;
  //   let category = selectRef.current.value;
  //   console.log('category', selectRef.current.value)
  //   console.log('item', searchRef.current.value)
  //   const { data } = await axios.get('/searchAuctionItems',
  //     {params: {
  //       search: searchRef,
  //       category: selectRef,
  //     }},
  //   );
  //   console.log(data)
  //   dispatch(setSearchResultItems(data))

  // }


  return (
    <>
      <SeachFormWrapper onSubmit= {printSelectCat}>
        <SearchInput type="text" placeholder="  Search..." ref={searchRef}/>
        <CategoriesSB selectRef={selectRef}/>
        <SearchButton type="submit">Submit</SearchButton>
      </SeachFormWrapper>
    </>
  )
}



const SeachFormWrapper = styled.form`
display: flex;
flex-direction: row;
`

const SearchInput = styled.input`
width: 20em;
height: 2em;
`

const SearchButton = styled.button`
width: 10em;
height: 3em;
margin-left: 2em;
margin-bottom: 2em;
`

export default SearchBar;