// domain/.netlify/functions/hello
// localhost:8888/.netlify/functions/hello
const items = [
  { id: 1, name: "john" },
  { id: 2, name: "peter" },
];
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: "hello world",
    // body:items
  };
};
