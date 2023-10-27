const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51O4WzPIE7yM6C4rjoxERTUJxhQs0itEKmNYA4KSJUZhDabc5ZkBTzUorUiU1J6vyIeJpy45JvjNdG8G6wzqifBAB00B5ZLulhb');

const priceID = 1; 



router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1O5fhzIE7yM6C4rjG0Fiuo77',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `http://localhost:8080`,
  });
  console.log(session);
  const checkoutSesh = 'https://checkout.stripe.com/c/pay/cs_test_a1EtPNtVtUTYCrcTmKDSSPO25NrUWhiEiQLoWUsnLUsShuGjHSnT9OfzQU#fidkdWxOYHwnPyd1blpxYHZxWjA0TjR8c0RONzA9U3B9aDFBYGNJRmhwT018VGppYD10XUFKRF1qYEpDaUJEc3NCYENyXGluYEhwcWBVRDYycmsxdGZKMmxqNDBfd3Y1Tm9BNGgwdF9sU3FLNTVzNjBhaG1dRCcpJ2hsYXYnP34nYnBsYSc%2FJzE3MTc9PGc0KDxmZzUoMTVhNyhnNDMzKDJjMDRmY2E1ZGE1M2dhYGQzNCcpJ2hwbGEnPydnZDJmZGExNig9MjwzKDExNWQoPTcxYChhMjw3ZjwxZjZkNjQ0PDMzM2cnKSd2bGEnPycxNWZnZDVgMCgzYzU1KDEyYWMoZD09PShnPTI8MjI8ZmMzY2dhYGYzMWYneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2PyoqdnF3bHVgK2ZqaCd4JSUl'
  res.redirect(303, session.url);


});

router.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});
// //router endpoints
// router.post('/create-payment-intent', async (req, res) => {
//   try {
//   const { amount, currency } = req.body;
//   //create payment intents
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount, //interger  ---> usd in pennies 
//     currency: currency,
//     automatic_payment_methods: {
//       enabled: true
//     }
//   });
//   //return the secret
//   console.log(paymentIntent);
//   res.json({ clientSecret: paymentIntent.client_secret });

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send({error: 'An error occurred while processing your payment'});
//   }
// });

// res.json({ clientSecret: paymentIntent.client_secret }


// This is your test secret API key.
// const stripe = require('stripe')('sk_test_51O3iXpCrGml1hr2w8ox9LlOiF0j1L68if4GMq4dmUTSkudP9k7AQQUXnHIdpCxOYn92m1F96lnONocCzkWIcG25j00L2UBWkg7');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';

// router.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));

module.exports = router;