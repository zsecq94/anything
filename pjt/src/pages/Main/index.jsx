import React, { useState } from "react";
import "./Main.scss";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Scrollbar, A11y, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Pagination, Scrollbar, A11y, Mousewheel]);

const Main = () => {
  return (
    <Swiper
      className="swiper-container"
      direction="vertical"
      spaceBetween={50}
      slidesPerView={1}
      speed={1500}
      scrollbar={{ draggable: true }}
      mousewheel={{ sensitivity: 1 }}
    >
      <SwiperSlide className="swiper-slide1">
        <Slide1 />
      </SwiperSlide>
      <SwiperSlide>
        <Slide2 />
      </SwiperSlide>
    </Swiper>
  );
};

export default Main;
