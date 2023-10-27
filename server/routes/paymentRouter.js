const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51O4WzPIE7yM6C4rjoxERTUJxhQs0itEKmNYA4KSJUZhDabc5ZkBTzUorUiU1J6vyIeJpy45JvjNdG8G6wzqifBAB00B5ZLulhb');





//router endpoints
router.post('/intents', async (req, res) => {
  try {

  //create payment intents
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount, //interger  ---> usd in pennies 
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true
    }
  })
  //return the secret
  res.json({paymentIntent: paymentIntent.client_secret});

  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});


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