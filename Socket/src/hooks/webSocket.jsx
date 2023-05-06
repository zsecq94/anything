import { useEffect, useState } from "react";

const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const webSocketUrl = `wss://k8c208.p.ssafy.io:8080`;
    const newWs = new WebSocket(webSocketUrl);
    setWs(newWs);

    // 첫 연결시 orderList 요청
    newWs.onopen = () => {
      console.log("CONNECT");
      newWs.send("getOrderList");
    };

    // 받아온 orderList items에 저장
    newWs.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (Array.isArray(data)) {
        setItems(data);
      }
    };
  }, []);

  const send = (data) => {
    if (ws) {
      ws.send(JSON.stringify(data));
    }
  };

  return { items, send };
};

export default useWebSocket;
