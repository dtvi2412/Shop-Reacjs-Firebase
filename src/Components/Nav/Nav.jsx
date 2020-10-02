import React, { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import "./Nav.scss";

const Nav = () => {
  const [nav, setNav] = useState(true);
  const [bgNav, setBgNav] = useState(false);
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
      if (window.scrollY > 100) {
        setBgNav(true);
        setNav(true);
      } else {
        setBgNav(false);
      }
    };
    window.addEventListener("scroll", handleScrool);
    return () => window.removeEventListener("scroll", handleScrool);
  }, []);
  return (
    <div className="nav">
      <div className="openNav">{nav ? "X" : "OPEN"}</div>
      {nav && (
        <div className={`nav__content ${bgNav ? "navColor" : "navTranper"} `}>
          <div className="nav__content__logo">
            <h2 className="brand">DTV</h2>
            <p className="text">Develop shop</p>
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
              <ShoppingBasketIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
