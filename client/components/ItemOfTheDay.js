import React from 'react'
import styled from 'styled-components'

const ItemOfTheDay = () => {
  return (
    <DayWrapper>
        <ImageContainer>
    <p>Image Goes Here</p>
        </ImageContainer>
        <DescriptionContainer>
            <h4>Name</h4>
            <h2>Current Bid</h2>
            <h2>Ends In</h2>
            <button>Bid</button>
        </DescriptionContainer>
        </DayWrapper>
  )
}

const DayWrapper = styled.div`
display: flex;
flex-direction: row;
height: 300px;
margin: 20px;
gap: 20px;
width: 95%
`

const ImageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: blue;
color: white;
width: 50%;
`

const DescriptionContainer = styled.div`
display: flex;
flex-direction: column;
`

export default ItemOfTheDay