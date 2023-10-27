// paymentThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';  
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "./stripe"
import { Elements } from "@stripe/react-stripe-js";

export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async ({ amount, currency }) => {
    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();

      // Assuming your server returns the clientSecret in the format "id_secret_secretvalue"
      const [id, secret] = data.clientSecret.split('_secret_');
      
      // Return the secret as a string
      return secret;
    } catch (error) {
      throw error;
    }
  }
);

