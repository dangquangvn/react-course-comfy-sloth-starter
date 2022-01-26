export const formatPrice = (number) => {
  //Intl = international
  // return new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // }).format(number/100); number(cent) -> number/100 (usd)
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  // unique =
  return ["all", ...new Set(unique)];
};
