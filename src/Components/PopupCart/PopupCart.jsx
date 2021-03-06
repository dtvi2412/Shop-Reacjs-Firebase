import React, { useEffect, useState } from "react";
import "./PopupCart.scss";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BASKET,
  CLOSE__POPUP_CART,
  DELETE_ITEM_CART,
  DOWN_BASKET,
  UP_BASKTET,
} from "../../Redux/Types/type";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { countItemBasket, getBasketTotal } from "../../controler";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
const PopupCart = () => {
  const dispatch = useDispatch();
  const basket = useSelector((item) => item.coursesReducer.basket);
  //CLOSE POPUP
  const closePopupCart = () => {
    let popUpcart = document.querySelector(".popupCart__content");
    popUpcart.setAttribute("style", "transform:translateX(500px)");
    let closePopup;
    const go = () => {
      clearTimeout(closePopup);
      //handle Close after set Timeout
      closePopup = setTimeout(() => {
        dispatch({
          type: CLOSE__POPUP_CART,
        });
      }, 300);
    };

    go();
  };

  //Handle load data basket
  const getBasket = useSelector((product) => product.coursesReducer.basket);
  //Remove Item in Cart
  const handleRemoveItemInCart = (item) => {
    dispatch({
      type: DELETE_ITEM_CART,
      id: item.id,
    });
  };
  // UP 1 ITEM BASKET
  const handleUp = (id) => {
    dispatch({
      type: UP_BASKTET,
      id: id,
    });
  };
  //REMOVE 1 ITEM
  const handleDown = (id) => {
    dispatch({
      type: DOWN_BASKET,
      id,
    });
  };
  // Handle Change Count Basket
  // const [valueInput, setValueInput] = useState("");
  // const handleChangeCount = (e, product) => {
  //   let val = e.target.value;

  //   setValueInput(val);

  //   dispatch({
  //     type: ADD_BASKET,
  //     data: { ...product, amount: parseInt(valueInput) },
  //     oneMOreThan: parseInt(valueInput),
  //   });
  // };

  // const handle = (product) => {
  //   let basketArr = [...basket];

  //   return basketArr.map((item) => {
  //     if (item.id === product.id) {
  //       return <div>{item.amount}</div>;
  //     }
  //   });
  // };
  const renderBodyBasket = () => {
    if (getBasket?.length > 0) {
      return getBasket?.map((item) => {
        return (
          <div className="popupCart__content__body__col" key={item.id}>
            <img
              className="popupCart__content__body__col__img"
              src={item.image}
              alt={`image : ${item.image}}`}
            />
            <div className="popupCart__content__body__col__info">
              <h1 className="popupCart__content__body__col__info__name">
                {item.name}
              </h1>
              <p className="popupCart__content__body__col__info__price">
                {item?.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              {/* AMOUT */}
              <div className="popupCart__content__body__col__info__upDown">
                <div
                  className="popupCart__content__body__col__info__upDown__up"
                  onClick={() => {
                    handleUp(item.id);
                  }}
                >
                  <AddIcon />
                </div>
                <div className="popupCart__content__body__col__info__upDown__text">
                  <input
                    value={item.amount}
                    type="number"
                    // id="inputAmount"
                    // value={valueInput}
                    // onChange={(e) => {
                    //   handleChangeCount(e, item);
                    // }}
                  />
                </div>
                {/* {handle(item)} */}
                <div
                  className="popupCart__content__body__col__info__upDown__down"
                  onClick={() => {
                    handleDown(item.id);
                  }}
                >
                  <RemoveIcon />
                </div>
              </div>
            </div>

            <div
              className="popupCart__content__body__col__close"
              onClick={() => handleRemoveItemInCart(item)}
            >
              X
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="noItem">
          <h1 className="noItem__text">Your Shopping Basket is empty</h1>
          <p className="noItem__nofi">
            You have no items your basket. To buy one or more items, click"Add
            to Cart" next to buy item.
          </p>
        </div>
      );
    }
  };
  return (
    <div className="popupCart">
      <div className="popupCart__content">
        <div className="popupCart__content__header">
          <div
            className="popupCart__content__header__icon"
            onClick={closePopupCart}
          >
            <ArrowForwardIosIcon />
          </div>
          <h1 className="popupCart__content__header__text">
            Cart {basket?.length > 0 && `( ${countItemBasket(basket)}  )`}
          </h1>
        </div>
        <div className="popupCart__content__body">
          {renderBodyBasket()}
          {getBasket.length > 0 && (
            <>
              <div className="popupCart__content__body__total">
                <h1 className="popupCart__content__body__total__text">
                  Subtotal
                </h1>
                <p className="popupCart__content__body__total__price">
                  {getBasketTotal(basket).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <Link
                className="buttonCart"
                to={{
                  pathname: `/cart`,
                }}
                onClick={closePopupCart}
              >
                View Cart
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect()(PopupCart);
