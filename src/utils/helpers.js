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

const checkMax = (value, max = null) => {
  if (max) {
    if (value > max) {
      return max;
    }
    return value;
  }
};

const checkMin = (value, min = null) => {
  if (min) {
    if (value < min) {
      return min;
    }
    return value;
  }
};

// export const checkNumber = (value, max = null, min = null) => {
export const checkNumber = ({ ...props }) => {
  const { value, max, min } = props;
  if (!value) {
    return;
  }
  let tempValue = value;
  if (min && max) {
    tempValue = checkMin(value, min);
    tempValue = checkMax(value, max);
  } else if (max) {
    tempValue = checkMax(value, max);
  } else if (min) {
    tempValue = checkMin(value, min);
  }
  return tempValue;
};
