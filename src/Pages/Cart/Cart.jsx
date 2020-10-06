import React from "react";
import "./Cart.scss";
import { connect, useSelector } from "react-redux";
const Cart = () => {
  const basket = useSelector((basket) => basket.coursesReducer.basket);
  const handleLoadBasket = () => {
    return basket?.map((product) => {
      return (
        <div className="product__item">
          <img src={product.image} alt={`image : ${product.image}`} />
          <div className="product__item__info">
            <h1 className="product__item__info__text">{product.name}</h1>
            <p className="product__item__info__price">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <div className="product__item__amount">
              <div className="up">-</div>
              <input
                value={product.amount}
                className="product__item__amount__input"
              />
              <div className="down">+</div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="cart">
      <div className="cart__content">
        <div className="cart__content__left">
          <h1 className="cart__content__left__text">My Cart</h1>
          {handleLoadBasket()}
        </div>
        <div className="cart__content__right">
          <h1 className="cart__content__right__text">Order Summary</h1>
        </div>
      </div>
    </div>
  );
};

export default connect()(Cart);
