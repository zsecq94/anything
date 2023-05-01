import React, { useRef, useEffect, useState } from "react";
import { Hill } from "./hill.js";
import { RuemiController } from "./ruemi_controller.js";
import { Sun } from "./sun.js";
import { BsFillMouseFill } from "react-icons/bs";

const MainSlide = ({ activeIndex }) => {
  const canvasRef = useRef();
  const sun = useRef(new Sun()).current;
  const [hills, setHills] = useState([]);
  const [ruemiController, setRuemiController] = useState(null);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
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
      sun.resize(stageWidth, stageHeight);
      hills.forEach((hill) => hill.resize(stageWidth, stageHeight));
      ruemiController.resize(stageWidth, stageHeight);
    };

    const animate = (t) => {
      requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      sun.draw(ctx, t);
      let dots;
      hills.forEach((hill) => {
        dots = hill.draw(ctx);
      });
      ruemiController.draw(ctx, t, dots);
    };

    const hills = [
      new Hill("#FFD3B5", 0.2, 12),
      new Hill("#FFAAA6", 0.5, 8),
      new Hill("#FF8C94", 0.8, 6),
    ];
    setHills(hills);

    const ruemiController = new RuemiController(activeIndex);
    setRuemiController(ruemiController);

    window.addEventListener("resize", resize, false);
    resize();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, [activeIndex]);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <canvas ref={canvasRef}></canvas>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          marginBottom: 40,
          fontSize: "3rem",
        }}
      >
        <BsFillMouseFill />
      </div>
    </div>
  );
};

export default MainSlide;
