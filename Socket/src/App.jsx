import "./App.scss";
import Main from "./pages/Main";
import Header from "./layout/Header";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // let ws = useRef(null);
  const [items, setItems] = useState();
  const [sendData, setSendData] = useState({
    name: "",
    from: "",
    to: "",
  });

  const webSocketUrl = `wss://k8c208.p.ssafy.io:8080`;
  const ws = new WebSocket(webSocketUrl);
  useEffect(() => {
    if (user?.name) {
      setSendData({
        ...sendData,
        name: user.name,
      });
    }

    // 첫 연결시 orderList 요청
    ws.onopen = () => {
      console.log("CONNECT");
      ws.send("getOrderList");
    };

    // 받아온 orderList items에 저장
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (Array.isArray(data)) {
        setItems(data);
      }
    };
  }, []);

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setItems((prev) => data);
  };

  const send = () => {
    ws.send(JSON.stringify(sendData));
  };

  const removeData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    ws.send(JSON.stringify({ action: "removeData", name: user.name }));
  };

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
          <Route
            path="/"
            element={
              <Main
                items={items}
                setSendData={setSendData}
                send={send}
                sendData={sendData}
                removeData={removeData}
              />
            }
          ></Route>
          {/* <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route> */}
        </React.Fragment>
      </Routes>
    </div>
  );
};

export default App;
