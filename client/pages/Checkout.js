import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { BiCart } from "react-icons/bi"; 
import { useDispatch } from 'react-redux';
import { setClientSecret, setLoading, setSuccess, setError } from "../slices/paymentSlice";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../paymentThunk';


//IndividualAuction Item box
const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // Define and initialize the loading state
    const [error, setError] = useState(null); // Define and initialize the error state
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      setLoading(true); // Set loading to true when processing
  
      // Dispatch the action to create a payment intent
      const { paymentIntent, error } = await dispatch(createPaymentIntent(1000)); // Replace 1000 with the actual amount
  
      if (error) {
        setError(error);
      } else {
        // Handle success
      }
  
      setLoading(false); // Set loading back to false when done processing
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
        {error && <div className="error">{error.message}</div>}
      </form>
    );
  };
  
export default PaymentForm;
  



// form {
//     max-width: 400px;
//     margin: 0 auto;
//     padding: 20px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }
  
//   /* Style for the label */
//   label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 10px;
//   }
  
//   /* Style for the card element (Stripe CardElement) */
//   .CardElement {
//     border: 1px solid #ccc;
//     padding: 10px;
//     border-radius: 5px;
//   }
  
//   /* Style for the submit button */
//   button[type="submit"] {
//     background-color: #007bff;
//     color: #fff;
//     border: none;
//     border-radius: 5px;
//     padding: 10px 20px;
//     cursor: pointer;
//   }
  
//   button[type="submit"]:disabled {
//     background-color: #ccc;
//     cursor: not-allowed;
//   }
  
//   /* Style for error and success messages */
//   .error {
//     color: #ff0000;
//     margin-top: 10px;
//   }
  
//   .success {
//     color: #00ff00;
//     margin-top: 10px;
//   }