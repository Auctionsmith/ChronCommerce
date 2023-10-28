import React from 'react'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CategoriesSB from '../ScrollBars/CategoriesSB'
// import CategoriesSB from '../ScrollBars/CategoriesSB'

const SellForm = () => {
    const navigate = useNavigate()

    const listingNameRef = useRef(null);
    const listingDescriptionRef = useRef(null)
    const startingPriceRef = useRef(null)
    const fileInputRef = useRef(null)
    const selectRef = useRef(null)
    const startTimeRef = useRef(null)
    const endTimeRef = useRef(null)
    
    const [errorMessage, setErrorMessage] = useState({err: ''});
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
        const startTime = startTimeRef.current.value
        const endTime = endTimeRef.current.value
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
        // const {start_time,
        //     end_time,
        //     status,
        //     current_price,
        //     seller_id,
        //     item_name,
        //     img_url,
        //     category,
        //     description

        if(file){ 
            formData.append('auctionImage', file);
        }
        formData.append('item_name', listingName)
        formData.append('description', listingDescription)
        formData.append('current_price', startingPrice)
        formData.append('category', category)
        formData.append('seller_id', 1)
        formData.append('start_time', startTime)
        formData.append('end_time', endTime)
        formData.append('time_zone', timeZone)
        formData.append('status', 'open')

       

        console.log(formData)

        // test form data pre axios

        axios({
            method: 'post',
            url: '/auction',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(response => {
            console.log(response)
            navigate('/')
        })
        .catch(err => {
            setErrorMessage({
                err: err.response.data
              })
            console.log('Error uploading formData', err)
        })
    }


  return (
    <SellFormContainer>
        <SellFormWrapper onSubmit={postListing}>
        <label>Name</label>
            <input type="text" name="name" placeholder="Name of Item" ref={listingNameRef}/>
    
        <label>Description</label>
            <textarea name="description" rows="4" cols="50" placeholder="Please Enter a Brief Description" ref={listingDescriptionRef}/>
  
        <label>Starting Price </label>
            <input type="text" name="StartingPrice" placeholder="Minimum Starting Bid"ref={startingPriceRef} />

        <label>Start Date</label>
            <input type="datetime-local" name="startDate" ref={startTimeRef} />
        
        <label>End Date</label>
            <input type="datetime-local" name="endDate" ref={endTimeRef} />

        <label>Image</label>
            <input type="file" name="auctionImage" ref={fileInputRef} />
        
        <CategoriesSB selectRef={selectRef} form={true}/>
  
        <button type="submit">Submit</button>
        {errorMessage&&<p>{errorMessage.err}</p>}
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