import React, { useEffect, useState } from "react";

import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav/Nav";
import Cart from "./Pages/Cart/Cart";
import EjectIcon from "@material-ui/icons/Eject";
import { connect, useSelector } from "react-redux";
import PopupCart from "./Components/PopupCart/PopupCart";
function App() {
  const [backtoTop, setBackToTop] = useState(false);
  useEffect(() => {
    // Custom Poiter
    let cursor = document.querySelector(".poiter");
    window.addEventListener("mousemove", (e) => {
      cursor.setAttribute(
        "style",
        "top:" + (e.pageY - 10) + "px;left:" + (e.pageX - 10) + "px"
      );
    });
    document.addEventListener("click", () => {
      cursor.classList.add("expand");
      setTimeout(() => {
        cursor.classList.remove("expand");
      }, 500);
    });
    //BACK TO TOP
    function handleScrool() {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    }
    window.addEventListener("scroll", handleScrool);
    return () => window.removeEventListener("scroll", handleScrool);
  }, []);
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //Popup cart
  const popupCart = useSelector((open) => open.coursesReducer.setPopupCart);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="poiter"></div>
        {/* Navbar  */}
        <Nav />
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route exact={true} path="" component={Home} />{" "}
        </Switch>
        {backtoTop && (
          <div className="backToTop" onClick={handleBackToTop}>
            <EjectIcon />
          </div>
        )}
        {/* Popup Cart if true visible*/}
        {popupCart && <PopupCart />}
      </div>
    </BrowserRouter>
  );
}

export default connect()(App);
