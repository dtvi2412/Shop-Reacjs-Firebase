import React from "react";

import { connect, useDispatch } from "react-redux";
import {
  QUICK_VIEW,
  OPEN_POPUP_QUICK_VIEW,
  ADD_BASKET,
  OPEN__POPUP_CART,
} from "../../Redux/Types/type";
import "./ProductItem.scss";
const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleQuickView = (product) => {
    dispatch({
      type: QUICK_VIEW,
      data: product,
    });
    dispatch({
      type: OPEN_POPUP_QUICK_VIEW,
    });
  };
  const handleAddBasket = () => {
    dispatch({
      type: ADD_BASKET,
      data: { ...item, amount: 1 },
      oneMOreThan: false,
    });
    dispatch({
      type: OPEN__POPUP_CART,
    });
  };
  return (
    <>
      {item && (
        <div className="productItem">
          <div className="productItem__img">
            {" "}
            <img src={item.image} alt={`image : ${item.image}`} />
            <div className="productItem__img__quickView">
              <div
                onClick={() => {
                  handleQuickView(item);
                }}
              >
                Quick View
              </div>
            </div>
          </div>

          <div className="productItem__info">
            <h1 className="productItem__info__name">{item.name}</h1>
            <p className="productItem__info__price">
              {item.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="productItem__add">
            {" "}
            <button
              className="productItem__add__cart"
              onClick={handleAddBasket}
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default connect()(ProductItem);
