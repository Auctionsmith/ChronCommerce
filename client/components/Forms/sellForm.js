import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react'
import axios from 'axios'

const SellForm = () => {
    const listingNameRef = useRef(null);
    const listingDescriptionRef = useRef(null)
    const startingPriceRef = useRef(null)
    const fileInputRef = useRef(null)
    
    // currently built without dispatch since
    const postListing = (event) => {
        // we don't want the page to refresh on submisssion
        event.preventDefault();

        const formData = new FormData()
        const file = fileInputRef.current.files[0];
        const listingName = listingNameRef.current.value;
        const listingDescription = listingDescriptionRef.current.value;
        const startingPrice = startingPriceRef.current.value;

        if(file){ 
            formData.append('auctionImage', file);
        }
        formData.append('listingName', listingName)
        formData.append('listingDescription', listingDescription)
        formData.append('startingPrice', startingPrice)

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
            <input type="text" name="name" ref={listingNameRef}/>
    
        <label>Description</label>
            <textarea name="description" rows="4" cols="50" ref={listingDescriptionRef}/>
  
        <label>Starting Price </label>
            <input type="text" name="name" ref={startingPriceRef} />

        <label>Image</label>
            <input type="file" name="auctionImage" ref={fileInputRef} />
  
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