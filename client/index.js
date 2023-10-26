import App from "./App.jsx";
import React from "react";
import { Provider } from 'react-redux'
import { store } from "./store"
import { createRoot } from "react-dom/client";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise, STRIPE_PUBLISHABLE_KEY } from './stripe'; // Import the Stripe promise from stripe.js


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
   <Provider store={store}>
      //AppComment
      <Elements stripe={stripePromise}>
           <App />
      </Elements>
   </Provider>
  );

