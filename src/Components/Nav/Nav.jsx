import React, { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { connect, useDispatch, useSelector } from "react-redux";

import "./Nav.scss";
import { OPEN__POPUP_CART } from "../../Redux/Types/type";
import { Link } from "react-router-dom";
import { countItemBasket } from "../../controler";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
const Nav = () => {
  const [nav, setNav] = useState(true);
  const [bgNav, setBgNav] = useState(false);
  const dispatch = useDispatch();
  const basket = useSelector((item) => item.coursesReducer.basket);
  useEffect(() => {
    //Active Nav
    let openNav = document.querySelector(".openNav");
    let tagA = document.querySelectorAll("A");

    for (let i = 0; i < tagA.length; i++) {
      tagA[i].addEventListener("click", () => {
        tagA.forEach((tag) => tag.classList.remove("active"));
        tagA[i].className = "active";
      });
    }
    function handleNav() {
      setNav(!nav);
    }
    openNav.addEventListener("click", handleNav);

    return () => openNav.removeEventListener("click", handleNav);
  }, [nav]);
  useEffect(() => {
    //Custom ScrollY
    const handleScrool = () => {
      let dtv = document.getElementById("dtv");
      let devshop = document.getElementById("dtvshop");
      if (window.scrollY > 100) {
        setBgNav(true);
        // setNav(true);
        // dtv.setAttribute("style", "color:black");
        // devshop.setAttribute("style", "color:black");
      } else {
        setBgNav(false);

        // dtv.setAttribute("style", "color:#840d0d");
        // devshop.setAttribute("style", "color:#111");
      }
    };
    window.addEventListener("scroll", handleScrool);
    return () => window.removeEventListener("scroll", handleScrool);
  }, []);
  // Handle Open popup Cart
  const openPopupCart = () => {
    dispatch({
      type: OPEN__POPUP_CART,
    });
  };
  //Open Nav
  const GoNavFullNow = () => {
    setNav(true);
  };
  return (
    <div className="nav">
      <div className="openNav">
        {nav ? <CancelPresentationIcon /> : <MenuOpenIcon />}
      </div>
      <div className="FullScreenNav" onClick={GoNavFullNow}>
        {!nav && <MenuOpenIcon />}
      </div>
      {nav ? (
        <div className={`nav__content ${bgNav ? "navColor" : "navTranper"} `}>
          <div className="nav__content__logo">
            <h2 className="brand">
              <Link id="dtv" to="/">
                DTV
              </Link>
            </h2>
            <p className="text">
              {" "}
              <Link id="dtvshop" to="/">
                Developer Shop
              </Link>
            </p>
          </div>
          <div className="nav__content__menu">
            <nav>
              <li>
                <a className="active" href="#">
                  Shop
                </a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </nav>
          </div>
          <div className="nav__content__right">
            <div className="nav__content__right__login">
              <PersonIcon />
              <span className="text">Login</span>
            </div>
            <div className="nav__content__right__socials">
              <FacebookIcon />
              <InstagramIcon />
              <div onClick={openPopupCart}>
                <span>
                  <ShoppingBasketIcon />
                  {/* {basket.length > 0 && `(${basket.length})`} */}
                  {basket.length > 0 && `(${countItemBasket(basket)})`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default connect()(Nav);
