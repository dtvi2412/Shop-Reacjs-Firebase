import React, { useEffect } from "react";

import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav/Nav";
import Cart from "./Pages/Cart/Cart";

function App() {
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
  }, []);
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
      </div>
    </BrowserRouter>
  );
}

export default App;
