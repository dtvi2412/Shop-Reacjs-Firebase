import React, { useEffect } from "react";
import "./TextBackground.scss";
const TextBackground = () => {
  useEffect(() => {
    //Slide
    let slider = document.getElementById("slider");
    let active = document.getElementById("active");
    let line1 = document.getElementById("line1");
    let line2 = document.getElementById("line2");
    let line3 = document.getElementById("line3");
    let line4 = document.getElementById("line4");

    line1.onclick = () => {
      slider.style.transform = "translateX(0)";
      active.style.top = "0px";
    };
    line2.onclick = () => {
      slider.style.transform = "translateX(-25%)";
      active.style.top = "80px";
    };
    line3.onclick = () => {
      slider.style.transform = "translateX(-50%)";
      active.style.top = "160px";
    };
    line4.onclick = () => {
      slider.style.transform = "translateX(-75%)";
      active.style.top = "240px";
    };
  }, []);
  return (
    <div className="textBg">
      <div className="textBg__content">
        <div id="slider" className="textBg__content__left">
          {/* item1 */}
          <div className="textBg__content__left__item">
            <h1 className="title">The Reasoning</h1>
            <p className="descrition">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              amet quae saepe nam perspiciatis ratione quo modi ab, assumenda
              illum.
            </p>
            <button className="btnLearn">Learn More</button>
          </div>
          {/* item2 */}
          <div className="textBg__content__left__item">
            <h1 className="title">The Hotel</h1>
            <p className="descrition">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              amet quae saepe nam perspiciatis ratione quo modi ab, assumenda
              illum.
            </p>
            <button className="btnLearn">Learn More</button>
          </div>
          {/* item3 */}
          <div className="textBg__content__left__item">
            <h1 className="title">The Animal</h1>
            <p className="descrition">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              amet quae saepe nam perspiciatis ratione quo modi ab, assumenda
              illum.
            </p>
            <button className="btnLearn">Learn More</button>
          </div>
          {/* item4 */}
          <div className="textBg__content__left__item">
            <h1 className="title">The Building</h1>
            <p className="descrition">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              amet quae saepe nam perspiciatis ratione quo modi ab, assumenda
              illum.
            </p>
            <button className="btnLearn">Learn More</button>
          </div>
        </div>
        {/* <div className="textBg__content__right"></div> */}
      </div>
      <div className="controller">
        <div id="line1"></div>
        <div id="line2"></div>
        <div id="line3"></div>
        <div id="line4"></div>
        <div id="active"></div>
      </div>
    </div>
  );
};

export default TextBackground;
