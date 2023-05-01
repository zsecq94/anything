import React from "react";
import "./Slide1.scss";
import MainSlide from "./MainSlide";

const Slide1 = ({ activeIndex }) => {
  return (
    <div>
      <MainSlide activeIndex={activeIndex} />
    </div>
  );
};

export default Slide1;
