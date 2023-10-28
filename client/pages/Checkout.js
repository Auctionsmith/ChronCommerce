import React, { useEffect, useState } from 'react';
import WonListing from '../components/WonListing'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { BiCart } from "react-icons/bi"; 
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../paymentThunk';
import { loadStripe } from '@stripe/stripe-js';
import {
    setClientSecret,
    setLoading,
    setError,
  } from '../slices/paymentSlice';
import { STRIPE_PUBLISHABLE_KEY } from "../stripe"
  // const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
// import React, { useState, useEffect } from "react";
//IndividualAuction Item box
const PaymentForm = () => (
  <CheckoutWrapper>
    <WonListing></WonListing>
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
        <h3>TestAuctionItem</h3>
        <h5>$20.00</h5>
        </div>
      </div>
      <form action="payments/create-checkout-session" method="POST">
        <button type="submit">
          Checkout
        </button>
      </form>
    </section>
    </CheckoutWrapper>
  );
  
  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
  
  export default function App() {
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
  
      if (query.get("success")) {
        setMessage("Order placed! You will receive an email confirmation.");
      }
  
      if (query.get("canceled")) {
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, []);
  
    return message ? (
      <Message message={message} />
    ) : (
      <PaymentForm />
    );
  }

  const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4em;
  `


  //   const stripe = useStripe();
  //   const elements = useElements();
  //   const dispatch = useDispatch();
  //   const [amount, setAmount] = useState(1000); // Set your default amount
  //   const [currency, setCurrency] = useState('usd'); // Set your default currency
  //   const { clientSecret, loading, error } = useSelector((state) => state.payment);
  
  //   const handleSubmit = async (event) => {
  //       event.preventDefault();
  //       if (!stripe || !elements) {
  //         return;
  //       }
      
  //       // Dispatch the loading action
  //       dispatch(setLoading(true));
      
  //       try {
  //         // Dispatch the createPaymentIntent thunk
  //         const clientSecret = await dispatch(createPaymentIntent({ amount, currency }));
      
  //         if (typeof clientSecret !== 'string' || !clientSecret.startsWith('pi_')) {
  //           // Handle the incorrect format and return an error or throw an error
  //           dispatch(setError("Invalid client secret format"));
  //           return;
  //         }
      
  //         // Use the retrieved clientSecret in the state
  //         const result = await stripe.confirmCardPayment(clientSecret, {
  //           payment_method: {
  //             card: elements.getElement(CardElement),
  //           },
  //         });
      
  //         if (result.error) {
  //           console.error(result.error);
  //           // Handle the payment error
  //           dispatch(setError(result.error.message));
  //         } else if (result.paymentIntent.status === 'succeeded') {
  //           // Payment succeeded
  //           dispatch(setSuccess(true));
  //         }
  //       } catch (e) {
  //         // Dispatch the error action
  //         dispatch(setError(e.message));
  //       }
      
  //       // Dispatch the loading action to false
  //       dispatch(setLoading(false));
  //     };
      
  
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Amount:
  //         <input
  //           type="number"
  //           value={amount}
  //           onChange={(e) => setAmount(e.target.value)}
  //         />
  //       </label>
  //       <label>
  //         Currency:
  //         <select
  //           value={currency}
  //           onChange={(e) => setCurrency(e.target.value)}
  //         >
  //           <option value="usd">USD</option>
  //           <option value="eur">EUR </option>
  //           {/* Add other currency options as needed */}
  //         </select>
  //       </label>
  //       <label>
  //         Card details
  //         <CardElement />
  //       </label>
  //       <button type="submit" disabled={loading}>
  //         {loading ? 'Processing...' : 'Pay'}
  //       </button>
  //       {error && <div className="error">{error}</div>}
  //     </form>
  //   );
  // };
  



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