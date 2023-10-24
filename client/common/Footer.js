import React from "react";

import styled from "styled-components";
const Footer = () => {
    return (
        <Foot>
            <p>Copyright, POD execs 2023</p>
        </Foot>
    )
}

const Foot = styled.div`
display: flex;
justify-content: center;
background-color: var(--secondary-color);
height: 3em;
padding: 2em;
`
export default Footer;