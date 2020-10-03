import React from "react";

import PopupCart from "../../Components/PopupCart/PopupCart";
import Products from "../../Components/Product/Products";
import TextBackground from "../../Components/TextBackground/TextBackground";
import { connect, useSelector } from "react-redux";

const Home = () => {
  const popupCart = useSelector((open) => open.coursesReducer.setPopupCart);
  return (
    <div>
      <div className="bgApp"></div>

      {/* Carousel text */}
      <TextBackground />
      {/* Product */}
      <Products />
      {/* Popup Cart if true visible*/}
      {popupCart && <PopupCart />}
    </div>
  );
};

export default connect()(Home);
