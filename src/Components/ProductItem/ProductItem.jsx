import React from "react";
import "./ProductItem.scss";
const ProductItem = ({ item }) => {
  return (
    <div className="productItem">
      <div className="productItem__img">
        {" "}
        <img src={item.image} alt={`image : ${item.image}`} />
        <div className="productItem__img__quickView">
          <div>Quick View</div>
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
        <button className="productItem__add__cart">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductItem;
