import React, { useState } from "react";
import Slide1 from "../Slide1";
import Slide2 from "../Slide2";
import "./Test.scss";

const Test = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleWheel = (event) => {
    if (event.deltaY > 0 && activeIndex < 1) {
      setActiveIndex(activeIndex + 1);
    } else if (event.deltaY < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="swiper-slide-wrapper" onWheel={handleWheel}>
      <div className="swiper-slide1-test">
        <Slide1
          activeIndex={activeIndex}
          style={{ height: activeIndex === 1 ? "30%" : "100%" }}
        />
      </div>
      <div className="swiper-slide2-test">
        <Slide2 />
      </div>
    </div>
  );
};

export default Test;
