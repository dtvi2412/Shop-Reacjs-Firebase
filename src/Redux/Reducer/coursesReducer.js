import {
  PRODUCTS,
  QUICK_VIEW,
  OPEN_POPUP_QUICK_VIEW,
  CLOSE_POPUP_QUICK_VIEW,
  OPEN__POPUP_CART,
  CLOSE__POPUP_CART,
  ADD_BASKET,
  DELETE_ITEM_CART,
} from "../Types/type";

let initailState = {
  products: [],
  product: "",
  basket: [],
  setPopupQuickView: false,
  setPopupCart: false,
};
const productsReducer = (state = initailState, action) => {
  switch (action.type) {
    case PRODUCTS:
      return { ...state, products: action.data };
    case QUICK_VIEW:
      state.product = action.data;
      return { ...state };
    case OPEN_POPUP_QUICK_VIEW:
      state.setPopupQuickView = true;
      return { ...state };
    case CLOSE_POPUP_QUICK_VIEW:
      return { ...state, setPopupQuickView: false };
    case OPEN__POPUP_CART:
      return { ...state, setPopupCart: true };
    case CLOSE__POPUP_CART:
      return { ...state, setPopupCart: false };
    case ADD_BASKET:
      return { ...state, basket: [...state.basket, action.data] };
    case DELETE_ITEM_CART:
      let cloneBasket = [...state.basket];
      const index = cloneBasket.findIndex((item) => item.id === action.id);
      if (index >= 0) {
        cloneBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id : ${action.id} as its not working!)`
        );
      }
      state.basket = cloneBasket;
      return { ...state };
    default:
      return { ...state };
  }
};
export default productsReducer;
