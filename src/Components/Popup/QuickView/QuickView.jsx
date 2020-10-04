import React, { useState } from "react";
import "./QuickView.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  ADD_BASKET,
  CLOSE_POPUP_QUICK_VIEW,
  OPEN__POPUP_CART,
} from "../../../Redux/Types/type";

function QuickView() {
  const product = useSelector((product) => product.coursesReducer.product);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({
      type: CLOSE_POPUP_QUICK_VIEW,
    });
  };
  const [inputvalue, setInputValue] = useState(1);
  const handleOnchange = (e) => {
    const values = e.target.value;
    setInputValue(values);
    if (values < 1) {
      //   alert("Bạn không được nhập dưới 0!");
      setInputValue(1);
    }
    if (values > 99) {
      setInputValue(99);
    }
  };
  const handleAddToCart = () => {
    dispatch({
      type: ADD_BASKET,
      data: { ...product, amount: parseInt(inputvalue) },
      oneMOreThan: parseInt(inputvalue),
    });
    setInputValue("");
    dispatch({
      type: CLOSE_POPUP_QUICK_VIEW,
    });
    dispatch({
      type: OPEN__POPUP_CART,
    });
  };
  return (
    <div className="quickView">
      <div className="quickView__content">
        <div className="quickView__content__close" onClick={handleClose}>
          X
        </div>
        {/* <h1>Quick view right here!</h1> */}
        <div className="quickView__content__items">
          <div className="quickView__content__items__left">
            <img src={product.image} alt={`image : ${product.image}`} />
          </div>
          <div className="quickView__content__items__right">
            <div>
              {" "}
              <h1 className="quickView__content__items__right__name">
                {product.name}
              </h1>
              <p className="quickView__content__items__right__price">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <div className="quickView__content__items__right__quantity">
              {" "}
              <label>Quantity</label>
              <input
                onChange={(e) => handleOnchange(e)}
                type="number"
                className="number"
                min="1"
                step="1"
                max="99"
                value={inputvalue}
              />
            </div>

            <button
              className="quickView__content__items__right__add"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(QuickView);
