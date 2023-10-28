import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchResultItems, setAllItems } from '../../slices/auctionItemsSlice'
import CategoriesSB from '../ScrollBars/CategoriesSB'

const SearchBar = () => {
  const dispatch = useDispatch()
 
  const selectRef = useRef(null);
  const searchRef = useRef(null);

  // test refs fucn
  // const printSelectCat = (event) => {
  //   event.preventDefault();    

  //  console.log('searchRef Test', searchRef.current.value)
  // console.log("selectRef Test", selectRef.current.value)
  // }

  // update search into onclick once testing 
  const search = async (event) => {
    event.preventDefault();
    let searchVal = searchRef.current.value;
    let categoryVal = selectRef.current.value;

    console.log('category', selectRef.current.value)
    console.log('item', searchRef.current.value)
    const {data} = await axios.get('/auction',
      {params: {
        search: searchVal,
        category: categoryVal,
      }},
    );
  
    
    dispatch(setAllItems(data))

  }


  return (
    <>
      <SeachFormWrapper onSubmit= {search}>
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
position: relative;
align-self: center;
background-color: var(--bid-button-color);
border-radius: 1em;
width: 10em;
height: 3em;
margin-left: 2em;
margin-bottom: 1em;
font-family: 'Montserrat';
font-weight: 400;
`


export default SearchBar;