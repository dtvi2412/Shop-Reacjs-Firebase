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
  COUNTRY,
  CHANGE_NAME_COUNTRY,
  ADD_PRODUCT_DETAIL,
  DESTROY,
} from "../Types/type";
//GET BASKET LOCAL

let basketLocal = JSON.parse(localStorage.getItem("BASKET_LOCAL"));

let initailState = {
  products: [],
  product: "",
  detailProduct: [],
  country: [],
  listImage: [],
  //Check basket if have get Basket local , if Null basket : []
  basket: basketLocal === null ? [] : basketLocal,
  setPopupQuickView: false,
  setPopupCart: false,

  nameShipping: "Hà Nội",
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

    case COUNTRY:
      return { ...state, country: [...action.data] };

    //Change name
    case CHANGE_NAME_COUNTRY:
      return { ...state, nameShipping: action.name };

    //ADD DETAIL PRODUCT
    case ADD_PRODUCT_DETAIL:
      return { ...state, detailProduct: action.data };

    case "LIST_IMAGE":
      return { ...state, listImage: action.data };

    //Chage Image
    case "CHANGE_IMAGE":
      let arrImage = [...state.listImage];
      arrImage = arrImage.map((item) => {
        if (item.picture === action.id) {
          return { ...item, check: true };
        }
        return { ...item, check: false };
      });
      state.listImage = arrImage;

      return { ...state };
    case DESTROY:
      return { ...state, detailProduct: null };
    default:
      return { ...state };
  }
};
export default productsReducer;
