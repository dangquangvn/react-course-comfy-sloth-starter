// domain/.netlify/functions/create-payment-intent
// localhost:8888/.netlify/functions/create-payment-intent

exports.handler = async function (event, context) {
  // const
  // console.log(`handler: event -> ${event}, context -> ${context}`);
  // console.log(event);
  if (!event.body) {
    return {
      statursCode: 200,
      body: "payment intent",
    };
  }
  const { cart, total_amount, shipping_fee } = JSON.parse(event);
  return {
    statusCode: 200,
    body: JSON.stringifyng(cart),
  };
};
