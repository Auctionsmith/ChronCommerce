import { createSlice } from "@reduxjs/toolkit";
import { stripePromise } from '../stripe';
import { createPaymentIntent } from '../paymentThunk';

// paymentSlice.js
const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    clientSecret: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setClientSecret,
  setLoading,
  setSuccess,
  setError,
} = paymentSlice.actions;

export default paymentSlice.reducer;




