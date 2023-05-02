import React, { useState, useRef, useEffect } from "react";

import { RuemiController } from "./components/ruemi_controller.js";
import { Sun } from "./components/sun.js";
import { BsFillMouseFill } from "react-icons/bs";

import { Hill } from "./components/Hill.js";
import "./Slide1.scss";

const Slide1 = ({ activeIndex }) => {
  const canvasRef = useRef();
  const [sun, setSun] = useState(new Sun());
  const hills = [
    new Hill("#FFD3B5", 0.2, 12),
    new Hill("#FFAAA6", 0.5, 8),
    new Hill("#FF8C94", 0.8, 6),
    // #dcedc2
    // #FFB200
  ];
  const ruemiController = new RuemiController(activeIndex);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const resize = () => {
      const stageWidth = document.body.clientWidth;
      const stageHeight =
        activeIndex === 0
          ? document.body.clientHeight + 10
          : document.body.clientHeight / 4;
      canvas.style.transition = "height 1s ease-out";
      canvas.style.height = `${stageHeight}px`;
      canvas.width = stageWidth * 2;
      canvas.height = stageHeight * 2;
      ctx.scale(2, 2);
      setSun((prevSun) => {
        prevSun.resize(stageWidth, stageHeight);
        return prevSun;
      });
      hills.forEach((hill) => hill.resize(stageWidth, stageHeight));
      ruemiController.resize(stageWidth, stageHeight);
    };

    const animate = (t) => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sun.draw(ctx, t);
      let dots;
      hills.forEach((hill) => {
        dots = hill.draw(ctx);
      });
      ruemiController.draw(ctx, t, dots);
    };

    window.addEventListener("resize", resize, false);
    resize();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, [activeIndex]);

  return (
    <div className="slide1-wrapper">
      <canvas ref={canvasRef}></canvas>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          marginBottom: activeIndex === 0 ? 40 : 10,
          fontSize: "3rem",
          animation: "icon-shake 1s ease-in-out infinite",
          color: "white",
          flexDirection: "column",
        }}
      >
        <BsFillMouseFill color="white" />
      </div>
    </div>
  );
};

export default Slide1;
