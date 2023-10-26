import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51O4WzPIE7yM6C4rjkucZp8YDB3P6jPoX6wl0A3rINMtR5Zt2CkJlZAcO6ZYXBCRqfNtAe79zB0V0HTjjb3Sp3wZQ00Y2eJNPXV';
// Create the Stripe promise
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export { stripePromise, STRIPE_PUBLISHABLE_KEY };