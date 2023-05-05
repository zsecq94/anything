import "./App.scss";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./layout/Header";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

function App() {
  const webSocketUrl = `wss://k8c208.p.ssafy.io:8080`;
  // let ws = useRef(null);
  const [items, setItems] = useState();
  const [msg, setMsb] = useState("");
  const [sendData, setSendData] = useState([])
  const ws = new WebSocket(webSocketUrl);
  useEffect(() => {
    ws.onopen = () => {
      console.log("CONNECT");
      console.log(ws);
    };
  });

  const orderData = {
    name: "jkjkbjk",
    from: "C201",
    to: "C108",
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setItems((prev) => [data]);
  };
  const send = () => {
    const data = {
    };
      ws.send(JSON.stringify(data));
    }
  };

  console.log(items);

  // 소켓 객체 생성
  // useEffect(() => {
  //   if (!ws.current) {
  //     ws.current = new WebSocket(webSocketUrl);
  //     ws.current.onopen = () => {
  //       console.log("connected to " + webSocketUrl);
  //       setSocketConnected(true);
  //     };
  //     ws.current.onclose = (error) => {
  //       console.log("disconnect from " + webSocketUrl);
  //       console.log(error);
  //     };
  //     ws.current.onerror = (error) => {
  //       console.log("connection error " + webSocketUrl);
  //       console.log(error);
  //     };
  //     ws.current.onmessage = (evt) => {
  //       console.log(evt.data);
  //       const data = JSON.parse(evt.data);
  //       console.log("onmessage의 data : ", data);
  //       //setItems((prevItems) => [...prevItems, evt.data]);
  //       setItems(data);
  //     };
  //   }

  //   return () => {
  //     console.log("clean up");
  //     //ws.current.close();
  //   };
  // }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <React.Fragment>
          <Route path="/" element={<Main items={items} />}></Route>
          {/* <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route> */}
        </React.Fragment>
      </Routes>
    </div>
  );
}

export default App;
