export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => {
    let total = item.price * item.amount;
    return total + amount;
  }, 0);
};
export const countItemBasket = (basket) => {
  return basket?.reduce((amount, item) => {
    let itemAmount = amount + item.amount;

    return itemAmount;
  }, 0);
};
