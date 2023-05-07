import React, { useState, useEffect, useRef } from "react";
import "./Main.scss";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";

const Main = ({
  items,
  setSendData,
  send,
  sendData,
  removeData,
  setCheck,
  check,
  dataValid,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleWheel = (event) => {
    if (event.deltaY > 0 && activeIndex < 1) {
      setActiveIndex(activeIndex + 1);
    } else if (event.deltaY < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="slide-wrapper" onWheel={handleWheel}>
      <div className="slide1">
        <Slide1 activeIndex={activeIndex} />
      </div>
      <div className="slide2">
        <Slide2
          items={items}
          setSendData={setSendData}
          send={send}
          sendData={sendData}
          removeData={removeData}
          setCheck={setCheck}
          check={check}
          dataValid={dataValid}
        />
      </div>
    </div>
  );
};

export default Main;
