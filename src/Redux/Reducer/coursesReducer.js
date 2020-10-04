import {
  PRODUCTS,
  QUICK_VIEW,
  OPEN_POPUP_QUICK_VIEW,
  CLOSE_POPUP_QUICK_VIEW,
  OPEN__POPUP_CART,
  CLOSE__POPUP_CART,
  ADD_BASKET,
  DELETE_ITEM_CART,
  UP_BASKTET,
  DOWN_BASKET,
} from "../Types/type";

let initailState = {
  products: [],
  product: "",
  basket: [],
  setPopupQuickView: false,
  setPopupCart: false,
};
// export const getBasketTotal = (basket) => {
//   basket?.reduce((amount, item) => {
//     return amount + item.price;
//   }, 0);
// };

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
      let arr = [...state.basket];
      const idex = arr.findIndex((item) => item.id === action.data.id);

      if (idex >= 0) {
        //If id === action.data.id => Amout ++
        let newArr = arr.map((item) => {
          if (item.id === action.data.id && !action.oneMOreThan) {
            return { ...item, amount: item.amount + 1 };
          } else if (item.id === action.data.id && action.oneMOreThan) {
            return { ...item, amount: item.amount + action.oneMOreThan };
          } else {
            return { ...item };
          }
        });
        //Set Basket Store = clone basket
        state.basket = newArr;
        return {
          ...state,
        };
      }

      return {
        ...state,
        basket: [...state.basket, action.data],
      };
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

    case UP_BASKTET:
      let arrBasket = [...state.basket];
      const upOne = arrBasket.map((item) => {
        if (item.id === action.id) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return { ...item };
        }
      });
      state.basket = upOne;
      return { ...state };

    case DOWN_BASKET:
      let dowBasket = [...state.basket];
      const downOne = dowBasket.map((item) => {
        if (item.id === action.id && item.amount > 1) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return { ...item };
        }
      });
      // state.basket = downOne;
      return { ...state, basket: [...downOne] };
    default:
      return { ...state };
  }
};
export default productsReducer;
