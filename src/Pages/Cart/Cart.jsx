import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import LockIcon from "@material-ui/icons/Lock";
import {
  COUNTRY,
  DELETE_ITEM_CART,
  DOWN_BASKET,
  UP_BASKTET,
} from "../../Redux/Types/type";
import { getBasketTotal, getTotalBasket } from "../../controler";
import Country from "../../Components/Popup/Country/Country";
import dataFirebase from "../../connectFirebase";
import { useHistory } from "react-router-dom";
const Cart = () => {
  useEffect(() => {
    const dataBaseCoutryInFirebase = dataFirebase.database().ref("country");
    const getDB = async () => {
      await dataBaseCoutryInFirebase.on("value", (notes) => {
        let arr = [];
        notes.forEach((element) => {
          const id = element.key;
          const name = element.val().name;
          const price = element.val().price;
          arr.push({
            id: id,
            name: name,
            price: price,
          });
        });
        // console.log(arr);
        //Dispatch Store
        dispatch({
          type: COUNTRY,
          data: arr,
        });
      });
    };
    getDB();
  }, []);

  const basket = useSelector((basket) => basket.coursesReducer.basket);
  const dispatch = useDispatch();
  //Handle Delte Item
  const handleRemove = (id) => {
    dispatch({
      type: DELETE_ITEM_CART,
      id,
    });
  };
  const handleUp = (id) => {
    dispatch({ type: UP_BASKTET, id });
  };
  const handleDown = (id) => {
    dispatch({ type: DOWN_BASKET, id });
  };

  const handleInput = (e, amount) => {
    console.log(e.target.value, amount);
    e.target.value = amount;
    // return value;
  };
  //Set popup Country
  const [country, setCountry] = useState(false);
  const handlePopupCountry = () => {
    // alert("welcome");
    // setTimeout(() => {
    //   setCountry(true);
    // }, 200);

    setCountry(true);
  };
  const handleCountry = () => {
    setCountry(false);
  };

  //Name Country
  const nameShipping = useSelector((name) => name.coursesReducer.nameShipping);

  const valueCountry = useSelector((country) => country.coursesReducer.country);

  const handleLoadMoneyShip = () => {
    return valueCountry.map((item) => {
      //Kiem tra neu trung thi nam thi lay dung gia tien cua no
      if (item.name === nameShipping) {
        // setMoneyShip(item.price);
        return (
          <div>
            {item.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      } else {
        return <div></div>;
      }
    });
  };
  const [moneyShip, setMoneyShip] = useState("");
  const loadTotal = () => {
    let name = valueCountry.filter((item) => item.name === nameShipping);

    let a = name.reduce((amount, item) => {
      return amount + item.price;
    }, 0);

    return a;
  };
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
              <div className="down" onClick={() => handleDown(product.id)}>
                <RemoveIcon />
              </div>
              <input
                id="amount"
                value={product.amount}
                onChange={(e) => {
                  handleInput(e, product.amount);
                }}
                className="product__item__amount__input"
              />
              <div className="up" onClick={() => handleUp(product.id)}>
                <AddIcon />
              </div>
            </div>
          </div>
          <div className="product__item__priceItem">
            <div className="product__item__priceItem__totalPrice">
              {(product.amount * product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div
              className="product__item__priceItem__close"
              onClick={() => {
                handleRemove(product.id);
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      );
    });
  };
  //handleLoadSubtotal
  const handleLoadSubtotal = () => {
    return (
      <div className="total">
        <div className="total__top">
          <div className="total__top__subtotal">
            <h1 className="total__top__subtotal__text">Subtotal</h1>
            <p className="total__top__subtotal__total">
              {getBasketTotal(basket).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="total__top__shipping">
            <div className="total__top__shipping__name">
              <h1 className="total__top__shipping__name__text">Shipping</h1>
              <u
                className="total__top__shipping__name__country"
                onClick={handlePopupCountry}
              >
                {nameShipping}
              </u>
            </div>
            <div className="total__top__shipping__free">
              <h1 className="total__top__shipping__free__text">
                {handleLoadMoneyShip()}
              </h1>
            </div>
          </div>
          <div className="total__top__total">
            <h1 className="total__top__total__name">Total</h1>
            <p className="total__top__total__price">
              {/* {getBasketTotal(basket).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })} */}
              {getTotalBasket(basket, loadTotal() / 2).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            {/* <div> {loadTotal()}</div> */}
          </div>
          <button className="total__top__button">
            <div className="total__top__button__icon">
              <LockIcon />
            </div>
            <p className="total__top__button__text">Checkout</p>
          </button>
        </div>
      </div>
    );
  };
  const history = useHistory();
  const handleReturnHome = () => {
    return history.push("/");
  };
  return (
    <>
      {/* Check Basket Have Item , If have Item return , else Return Home */}
      {basket.length > 0 ? (
        <>
          {/* If country True Load  */}
          {country && <Country closeCountry={handleCountry} />}
          <div className="cart">
            <div className="cart__content">
              <div className="cart__content__left">
                <h1 className="cart__content__left__text">My Cart</h1>
                {handleLoadBasket()}
              </div>
              <div className="cart__content__right">
                <h1 className="cart__content__right__text">Order Summary</h1>
                {handleLoadSubtotal()}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="">{handleReturnHome()}</div>
      )}
    </>
  );
};

export default connect()(Cart);
