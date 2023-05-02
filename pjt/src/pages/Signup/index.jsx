import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.scss";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "top-right",
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
      const { password, username, nickname } = values;
      // const { data } = await axios.post(registerRoute, {
      //   username,
      //   nickname,
      //   password,
      // });
      // if (data.statue === false) {
      //   toast.error(data.msg, toastOptions);
      // }
      // if (data.status === true) {
      //   localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      //   navigate("/login");
      // }
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, nickname } = values;
    if (password !== confirmPassword) {
      toast.error("비밀번호와 비밀번호 확인이 다릅니다.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("이름을 3자 이상 입력해주세요.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("비밀번호를 8자 이상 입력해주세요.", toastOptions);
      return false;
    } else if (nickname === "") {
      toast.error("이메일을 입력해주세요.", toastOptions);
      return false;
    }
    toast.success("회원가입 성공!", toastOptions);
    return true;
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <h1>회원가입</h1>
        </div>
        <input
          type="text"
          placeholder="아이디"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="nickname"
          placeholder="닉네임"
          name="nickname"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="비밃너호 확인"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">회원가입</button>
        <span>
          이미 계정이 있으신가요 ? <Link to="/login">로그인</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
