import { PRODUCTS } from "../Types/type";

let initailState = {
  products: [],
};
const productsReducer = (state = initailState, action) => {
  switch (action.type) {
    case PRODUCTS:
      return { ...state, products: action.data };
    default:
      return { ...state };
  }
};
export default productsReducer;
