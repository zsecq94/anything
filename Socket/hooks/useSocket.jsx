import io from "socket.io-client";
import { useCallback } from "react";

const backUrl = "https://k8c208.p.ssafy.io:8080";

const useSocket = () => {
  const socket = io.connect(`${backUrl}`);
  socket.emit("hello", "world");
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.disconnect();
};

export default useSocket;
