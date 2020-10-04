export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => {
    let total = item.price * item.amount;
    return total + amount;
  }, 0);
};
