import React, { useEffect } from "react";
import dataFirebase from "../../connectFirebase";
import { connect, useDispatch, useSelector } from "react-redux";
import { PRODUCTS } from "../../Redux/Types/type";
import ProductItem from "../ProductItem/ProductItem";
import "./Products.scss";
import QuickView from "../Popup/QuickView/QuickView";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((products) => products.coursesReducer.products);
  const quickViewProduct = useSelector(
    (product) => product.coursesReducer.setPopupQuickView
  );
  useEffect(() => {
    //Get data
    const databaseInfb = dataFirebase.database().ref("databag/");
    const getDB = async () => {
      await databaseInfb.on("value", (notes) => {
        let arr = [];
        notes.forEach((element) => {
          const id = element.key;
          const name = element.val().name;
          const image = element.val().image;
          const price = element.val().price;
          const description = element.val().description;
          arr.push({
            id,
            name,
            image,
            price,
            description,
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
  const loadQuickViewProduct = () => {
    if (quickViewProduct) {
      return <QuickView />;
    }
  };
  return (
    <>
      <div className="products">
        {loadQuickViewProduct()}

        <div className="products__content">
          <div className="products__content__items">{handleLoadProduct()}</div>
        </div>
      </div>
    </>
  );
};

export default connect()(Products);
