import React, { useEffect, useState, useRef } from "react";
import "./Slide2.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableComponent from "../../../components/TableComponent";

const Slide2 = ({ items }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleTo = (event) => {
    setTo(event.target.value);
  };

  const List = [
    "C101",
    "C102",
    "C103",
    "C104",
    "C105",
    "C106",
    "C107",
    "C108",
    "C201",
    "C202",
    "C203",
    "C204",
    "C205",
    "C206",
    "C207",
    "C208",
  ];
  const webSocketUrl = `wss://k8c208.p.ssafy.io:8080`;
  const ws = new WebSocket(webSocketUrl);
  const sendData = () => {
    const data = {
      name: user.name,
      from: from,
      to: to,
    };
    if (socketConnected) {
      ws.send(JSON.stringify(data));
    }
  };
  return (
    <div className="swiper-slide2">
      <div>
        <TableComponent items={items} />
      </div>
      {JSON.parse(localStorage.getItem("user"))?.name === undefined ? (
        <h2>부르미를 이용하시려면 로그인을 해주세요!</h2>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "3rem",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              minWidth: 200,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">보낼 곳</InputLabel>
              <Select value={from} onChange={handleFrom}>
                {List.map((V, index) => (
                  <MenuItem key={index} value={V}>
                    {V}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              minWidth: 200,
              margin: "0, 5%",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">받는 곳</InputLabel>
              <Select value={to} onChange={handleTo}>
                {List.map((V, index) => (
                  <MenuItem key={index} value={V}>
                    {V}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <button onClick={sendData} style={{ padding: "0 2rem" }}>
            부르기
          </button>
        </div>
      )}
    </div>
  );
};

export default Slide2;
