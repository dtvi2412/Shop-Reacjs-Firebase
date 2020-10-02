import React, { useEffect } from "react";

import "./App.css";
import Nav from "./Components/Nav/Nav";
import Products from "./Components/Product/Products";
import TextBackground from "./Components/TextBackground/TextBackground";

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
    <div className="App">
      <div className="poiter"></div>
      <div className="bgApp"></div>
      {/* Navbar  */}
      <Nav />
      {/* Carousel text */}
      <TextBackground />

      {/* Product */}
      <Products />
    </div>
  );
}

export default App;
