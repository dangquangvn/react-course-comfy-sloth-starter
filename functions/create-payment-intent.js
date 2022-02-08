// domain/.netlify/functions/create-payment-intent
// localhost:8888/.netlify/functions/create-payment-intent
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
console.log(
  "🚀TCL: ~ file: create-payment-intent.js ~ line 5 ~ process.env.REACT_APP_STRIPE_SECRET_KEY",
  process.env.REACT_APP_STRIPE_SECRET_KEY
);

exports.handler = async function (event, context) {
  // const
  // console.log(`handler: event -> ${event}, context -> ${context}`);
  // console.log(event);
  if (!event.body) {
    return {
      statusCode: 200,
      body: "create payment intent but no event.body",
    };
  }
  const { cart, total_amount, shipping_fee } = JSON.parse(event.body);

  // in reality:
  // we will send each of item_id in cart to our server and get the actual price
  // const data = axios.get('/products')
  // in this scenerio:
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    // console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
