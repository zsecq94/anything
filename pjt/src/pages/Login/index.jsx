import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      // const { data } = await axios.post(loginRoute, {
      //   username,
      //   password,
      // });
      // if (data.status === false) {
      //   toast.error(data.msg, toastOptions);
      // }
      // if (data.status === true) {
      //   localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      //   navigate("/");
      // }
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("아이디와 비밀번호를 입력해주세요.", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("아이디와 비밀번호를 입력해주세요.", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <h1>로그인</h1>
        </div>
        <input
          type="text"
          placeholder="아이디"
          name="username"
          onChange={(e) => handleChange(e)}
          min="3"
        />

        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={(e) => handleChange(e)}
        />

        <button type="submit">로그인</button>
        <span>
          아이디가 없으신가요 ?<Link to="/signup"> 회원가입</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
