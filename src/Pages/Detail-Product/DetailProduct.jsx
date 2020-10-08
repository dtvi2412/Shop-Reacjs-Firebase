import React, { Fragment, useEffect } from "react";
import "./DetailProduct.scss";
import dataFirebase from "../../connectFirebase";
import { connect, useDispatch, useSelector } from "react-redux";
import { ADD_PRODUCT_DETAIL, DESTROY } from "../../Redux/Types/type";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
const DetailProduct = ({ match }) => {
  const dispatch = useDispatch();
  const detailProduct = useSelector(
    (detailPro) => detailPro.coursesReducer.detailProduct
  );
  const listImage = useSelector(
    (listImage) => listImage.coursesReducer.listImage
  );
  useEffect(() => {
    const getTableDetail = dataFirebase.database().ref("detail-product");
    const getListImageDB = dataFirebase.database().ref("list-image");
    const getdb = async () => {
      await getTableDetail.on("value", (notes) => {
        let arr = [];
        notes.forEach((element) => {
          const id = element.key;
          const picture = element.val().picture;

          //   const pit = Object.entries(picture);
          //   console.log("pit", pit);

          //   pit.forEach((item) => {
          //     console.log(item);
          //   });

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
              picture: picture,
              //   picture: pit,
              description,
            });
          }
        });
        // console.log(arr, match.params.id);
        dispatch({
          type: ADD_PRODUCT_DETAIL,
          data: arr,
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
    return detailProduct?.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="detailProduct__content__text">
            <h1 className="text">
              <Link to="/">Home</Link> / <span>{item.name}</span>
            </h1>
          </div>

          {/* ITEM */}
          <div className="detail" key={index}>
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

              <p className="description">{item.description}</p>
            </div>
            <div className="detail__right">
              <div>
                {" "}
                <h1 className="name">{item.name}</h1>
                <p className="right">
                  {item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>

              <div className="currency">
                <label>Quantity</label>
                <input className="amount" type="number" value="1" />
              </div>
              <div className="button">
                <div className="addToCart">
                  <button>Add to Cart</button>
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
    });
  };
  return (
    <div className="detailProduct">
      <div className="detailProduct__content">{renderDetailProduct()}</div>
    </div>
  );
};

export default connect()(DetailProduct);
