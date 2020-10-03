import React from "react";
import "./PopupCart.scss";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE__POPUP_CART, DELETE_ITEM_CART } from "../../Redux/Types/type";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const PopupCart = () => {
  const dispatch = useDispatch();

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
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
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
          <h1 className="popupCart__content__header__text">Cart</h1>
        </div>
        <div className="popupCart__content__body">
          {renderBodyBasket()}
          {getBasket.length > 0 && (
            <div className="popupCart__content__body__viewCart">
              <Link to="/cart" onClick={closePopupCart}>
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect()(PopupCart);
