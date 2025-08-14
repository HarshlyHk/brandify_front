export const formatIndianPrice = (price) => {
  if (typeof price !== "number") price = Number(price);
  return price.toLocaleString("en-IN");
};

