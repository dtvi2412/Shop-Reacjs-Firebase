import React, { useEffect } from "react";
import dataFirebase from "../../connectFirebase";
import { connect, useDispatch, useSelector } from "react-redux";
import { PRODUCTS } from "../../Redux/Types/type";
import ProductItem from "../ProductItem/ProductItem";
import "./Products.scss";
const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((product) => product.coursesReducer.products);

  useEffect(() => {
    //Get data
    let databaseInfb = dataFirebase.database().ref("databag/");
    const getDB = () => {
      databaseInfb.on("value", (notes) => {
        let arr = [];
        notes.forEach((element) => {
          const id = element.key;
          const name = element.val().name;
          const image = element.val().image;
          const price = element.val().price;
          arr.push({
            id,
            name,
            image,
            price,
          });
        });
        //Up data in reducer
        dispatch({
          type: PRODUCTS,
          data: arr,
        });
      });
    };
    getDB();
    return () => getDB();
  }, []);
  const handleLoadProduct = () => {
    return products.map((item) => {
      return <ProductItem key={item.id} item={item} />;
    });
  };
  return (
    <div className="products">
      <div className="products__content">
        <div className="products__content__items">{handleLoadProduct()}</div>
      </div>
    </div>
  );
};

export default connect()(Products);
