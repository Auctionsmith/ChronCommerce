import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react'
import axios from 'axios'
import CategoriesSB from '../ScrollBars/CategoriesSB'
// import CategoriesSB from '../ScrollBars/CategoriesSB'

const SellForm = () => {
    const listingNameRef = useRef(null);
    const listingDescriptionRef = useRef(null)
    const startingPriceRef = useRef(null)
    const fileInputRef = useRef(null)
    const selectRef = useRef(null)
    
    // currently built without dispatch since
    const postListing = (event) => {
        // we don't want the page to refresh on submisssion
        event.preventDefault();

        const formData = new FormData()
        const file = fileInputRef.current.files[0];
        const listingName = listingNameRef.current.value;
        const listingDescription = listingDescriptionRef.current.value;
        const startingPrice = startingPriceRef.current.value;
        const category = selectRef.current.value;

        if(file){ 
            formData.append('auctionImage', file);
        }
        formData.append('listingName', listingName)
        formData.append('listingDescription', listingDescription)
        formData.append('startingPrice', startingPrice)
        formData.append('category', category)

        console.log(formData)

        // test form data pre axios

        // axios({
        //     method: 'post',
        //     url: 'upload',
        //     data: formData,
        //     headers: {'Content-Type': 'multipart/form-data'}
        // })
        // .then(response => {
        //     console.log(response.data)
        // })
        // .catch(error => {
        //     console.log('Error uploading formData', error)
        // })
    }


  return (
    <SellFormContainer>
        <SellFormWrapper onSubmit={postListing}>
        <label>Name</label>
            <input type="text" name="name" placeholder="Name of Item" ref={listingNameRef}/>
    
        <label>Description</label>
            <textarea name="description" rows="4" cols="50" placeholder="Please Enter a Brief Description" ref={listingDescriptionRef}/>
  
        <label>Starting Price </label>
            <input type="text" name="name" placeholder="Minimum Starting Bid"ref={startingPriceRef} />

        <label>Image</label>
            <input type="file" name="auctionImage" ref={fileInputRef} />
        
        <CategoriesSB selectRef={selectRef}/>
  
        <button type="submit">Submit</button>
    </SellFormWrapper>
  </SellFormContainer>
  )
}

const SellFormContainer = styled.div`
display: flex;
flex-direction: column;
`

const SellFormWrapper = styled.form`
display: flex;
flex-direction: column;
gap: 1em;
`

export default SellForm