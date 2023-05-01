import React, { useRef, useEffect } from "react";
import { Hill } from "./hill.js";
import { RuemiController } from "./ruemi_controller.js";
import { Sun } from "./sun.js";
import { BsFillMouseFill } from "react-icons/bs";

const MainSlide = () => {
  const canvasRef = useRef();
  const sun = useRef(new Sun()).current;
  const hills = useRef([
    new Hill("#FFD3B5", 0.1, 12),
    new Hill("#FFAAA6", 0.3, 8),
    new Hill("#FF8C94", 0.5, 6),
  ]).current;
  const ruemiController = useRef(new RuemiController()).current;

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;
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

    window.addEventListener("resize", resize, false);
    resize();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, []);

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
