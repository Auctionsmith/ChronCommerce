// paymentThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { stripePromise } from './stripe';
import {
  setClientSecret,
  setLoading,
  setSuccess,
  setError,
} from './slices/paymentSlice';

export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async (amountInPennies, { dispatch }) => {
    try {
      const stripe = await stripePromise;

      // Make an API call to your server to create a PaymentIntent
      const response = await fetch('/intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountInPennies }),
      });

      if (!response.ok) {
        const data = await response.json();
        return Promise.reject(data);
      }

      const { paymentIntent } = await response.json();

      // Use the Stripe instance to confirm the PaymentIntent
      const { error } = await stripe.confirmCardPayment(paymentIntent.client_secret);

      if (error) {
        console.error("Payment request failed:", error);
        return Promise.reject(error.message);
      }

      // Dispatch the success action to update your Redux state
      dispatch(setSuccess(true));
      return paymentIntent;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);