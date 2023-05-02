import "./App.scss";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./layout/Header";
import { Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <React.Fragment>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </React.Fragment>
      </Routes>
    </div>
  );
}

export default App;
