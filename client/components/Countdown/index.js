import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';




const Countdown = ({ date }) => {
  const [time, setTime] = useState({})

  useEffect(() => {
    const tick = () => {
      const curTime = moment().valueOf();
      const endTime = moment(date).valueOf();
      const timeDiff = (endTime - curTime) / 1000;

      const days = Math.floor(timeDiff / (3600 * 24)).toString().padStart(2, '0');
      const hours = Math.floor((timeDiff % (3600 * 24)) / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((timeDiff % 3600) / 60).toString().padStart(2, '0');
      const seconds = Math.floor(timeDiff % 60).toString().padStart(2, '0');

      setTime({ days, hours, minutes, seconds });
    };

    tick(); // Run immediately for the first render
    const intervalID = setInterval(tick, 1000);

    return () => clearInterval(intervalID);
  }, [date]);

  
  return (
    
    <Container>
      { time.seconds < 0 
      ? <div>Time is up</div> 
      : ( 
        <>
          <DigitDisplay>
            <h1>Days</h1>
            <h2>{time.days}</h2>
          </DigitDisplay>
          <DigitDisplay>
            <h1>Hours</h1>
            <h2>{time.hours}</h2>
          </DigitDisplay>
          <DigitDisplay>
            <h1>Minutes</h1>
            <h2>{time.minutes}</h2>
          </DigitDisplay>
          <DigitDisplay>
            <h1>Seconds</h1>
            <h2>{time.seconds}</h2>
          </DigitDisplay>
        </>
        )
      }
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  display: flex;
  gap: .2rem;
  background: black;
  color: white;
  transform: translateX(-50%) translateY(-50%);
  padding: .2rem .4rem;
  border-radius: 8px;
`;


const DigitDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: .8rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace !important; 
  }
`

export default Countdown;
