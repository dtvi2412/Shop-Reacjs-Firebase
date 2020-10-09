import React, { Fragment, useEffect, useState } from "react";
import "./DetailProduct.scss";
import dataFirebase from "../../connectFirebase";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  ADD_BASKET,
  ADD_PRODUCT_DETAIL,
  DESTROY,
  OPEN__POPUP_CART,
} from "../../Redux/Types/type";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import WaitingLoad from "../../Components/WaitingLoad/WaitingLoad";
const DetailProduct = ({ match }) => {
  //SET UP BASKET LOCAL
  const basketLocal = useSelector((basket) => basket.coursesReducer.basket);
  useEffect(() => {
    localStorage.setItem("BASKET_LOCAL", JSON.stringify(basketLocal));
  }, [basketLocal]);
  const dispatch = useDispatch();

  const detailProduct = useSelector(
    (detailPro) => detailPro.coursesReducer.detailProduct
  );
  const listImage = useSelector(
    (listImage) => listImage.coursesReducer.listImage
  );
  const [inputvalue, setInputValue] = useState(1);

  const handleOnchange = (e) => {
    const values = e.target.value;
    setInputValue(values);
    let input = document.getElementById("inputChange");
    input.addEventListener("mouseleave", (e) => {
      let value = e.target.value;
      if (value <= 0 || value === "") {
        setInputValue(1);
      }
    });

    if (values < 0) {
      //   alert("Bạn không được nhập dưới 0!");
      setInputValue(1);
    }

    if (values > 99) {
      setInputValue(99);
    }
  };
  const handleAddToCart = () => {
    if (inputvalue === "" || parseInt(inputvalue) === 0) {
      let input = document.getElementById("inputChange");
      input.classList.add("inputRun");
      setTimeout(() => {
        input.classList.remove("inputRun");
      }, 300);
    } else {
      dispatch({
        type: ADD_BASKET,
        data: { ...detailProduct, amount: parseInt(inputvalue) },
        oneMOreThan: parseInt(inputvalue),
      });

      setInputValue("");

      dispatch({
        type: OPEN__POPUP_CART,
      });
      setInputValue(1);
    }
  };

  useEffect(() => {
    const getTableDetail = dataFirebase.database().ref("detail-product");
    const getListImageDB = dataFirebase.database().ref("list-image");
    const getdb = async () => {
      await getTableDetail.on("value", (notes) => {
        let arr = [];
        let object = {};
        notes.forEach((element) => {
          //   Check if id product === id PUSH ELSE NULL
          const idParams = match.params.id;
          const id = element.key;
          if (idParams === id) {
            object.id = element.key;
            object.name = element.val().name;
            object.image = element.val().image;
            object.price = element.val().price;
            object.description = element.val().description;
          }

          // const id = element.key;
          //GET IMAGE
          const image = element.val().image;
          console.log(image);

          const name = element.val().name;

          const price = element.val().price;
          const description = element.val().description;
          //   Check if id product === id PUSH ELSE NULL
          const idProduct = match.params.id;
          if (idProduct === id) {
            arr.push({
              id,
              name,
              price,
              image,
              //   picture: pit,
              description,
            });
          }
        });
        console.log("object", object);
        // console.log(arr, match.params.id);
        console.log(arr);
        dispatch({
          type: ADD_PRODUCT_DETAIL,
          data: object,
        });
      });
    };
    const getListImage = async () => {
      await getListImageDB.on("value", (notes) => {
        let arr = [];
        notes.forEach((element) => {
          const id = element.val().id;
          const idCheck = element.val().idCheck;
          const picture = element.val().picture;
          const check = element.val().check;
          const idProduct = match.params.id;
          if (idProduct === id) {
            arr.push({
              id,
              idCheck,
              picture,
              check,
            });
          }
        });
        // console.log("image", arr);
        dispatch({
          type: "LIST_IMAGE",
          data: arr,
        });
      });
    };

    //Handle Input

    getdb();
    getListImage();
    return () =>
      // reset detail product
      dispatch({ type: DESTROY });
  }, []);

  const handleClickImage = (item) => {
    console.log(item);
    dispatch({
      type: "CHANGE_IMAGE",
      id: item.picture,
    });
  };

  //CLICK IMAGE

  //   Render Detail PRODUCT
  const renderDetailProduct = () => {
    // return detailProduct?.map((item, index) => {

    if (detailProduct === null || detailProduct === "") {
      return <WaitingLoad />;
    } else {
      return (
        <Fragment>
          {" "}
          {/* <WaitingLoad /> */}
          <div className="detailProduct__content__text">
            <h1 className="text">
              <Link to="/">Home</Link> / <span>{detailProduct?.name}</span>
            </h1>
          </div>
          {/* ITEM */}
          <div className="detail">
            <div className="detail__left">
              {/* {item.picture.map((item) => {
                    return <img src={item.image} />;
                  })} */}
              {/* <img src={item.picture} alt="Image detail" /> */}
              <div className="detail__left__listImage">
                <div className="fullListImage">
                  {" "}
                  {listImage.map((item) => {
                    return (
                      <img
                        key={item.id}
                        src={item.picture}
                        onClick={() => {
                          handleClickImage(item);
                        }}
                      />
                    );
                  })}
                </div>
                <div className="OneImage">
                  {" "}
                  {listImage.map((item) => {
                    if (item.check) {
                      return <img key={item.id} src={item.picture} />;
                    }
                  })}
                </div>
              </div>

              <p className="description">{detailProduct?.description}</p>
            </div>
            <div className="detail__right">
              <div>
                {" "}
                <h1 className="name">{detailProduct?.name}</h1>
                <p className="right">
                  {parseInt(detailProduct?.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  {/* {detailProduct?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })} */}
                </p>
              </div>

              <div className="currency">
                <label>Quantity</label>
                <input
                  id="inputChange"
                  className="amount"
                  type="number"
                  value={inputvalue}
                  onChange={(e) => {
                    handleOnchange(e);
                  }}
                />
                {inputvalue === "" || parseInt(inputvalue) === 0 ? (
                  <div className="err">
                    You need to enter a value greater than 0
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="button">
                <div className="addToCart">
                  <button id="addToCart" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <div className="icons">
                    {" "}
                    <FavoriteBorderIcon />
                  </div>
                </div>
                <button className="buyNow">Buy Now</button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }

    // });
  };
  return (
    <div className="detailProduct">
      <div className="detailProduct__content">{renderDetailProduct()}</div>
    </div>
  );
};

export default connect()(DetailProduct);
