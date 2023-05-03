import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.scss";
import axios from "axios";

const Signup = ({ setCheckAuth }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  // 유효성 체크 메세지
  const [idMessage, setIdMessage] = useState("");
  const [nicknameMessage, setNickNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // // 유효성 체크
  const [isId, setIsId] = useState(false);
  const [isNickname, setIsNickName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
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
      // const { data } = await axios.post("http://localhost:8080/api/singup", {
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

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setValues({ ...values, username: currentId });
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("");
      setIsId(true);
    }
  };

  const onChangeNickName = (e) => {
    const currentName = e.target.value;
    setValues({ ...values, nickname: currentName });

    if (currentName.length < 2 || currentName.length > 5) {
      setNickNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsNickName(false);
    } else {
      setNickNameMessage("");
      setIsNickName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setValues({ ...values, password: currentPassword });
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setValues({ ...values, confirmPassword: currentPasswordConfirm });
    if (values.password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, nickname } = values;
    if (username.length < 5 || username.length > 10) {
      toast.error("아이디를 5자 이상 10자 이하로 입력해주세요.", toastOptions);
      return false;
    } else if (nickname === "" || nickname.length < 2 || nickname.length > 10) {
      toast.error("닉네임을 2자 이상 10자 이하로 입력해주세요.", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("비밀번호와 비밀번호 확인이 다릅니다.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("비밀번호를 8자 이상 입력해주세요.", toastOptions);
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
          required
          type="text"
          placeholder="아이디"
          name="username"
          onChange={(e) => onChangeId(e)}
        />
        <p className={`message ${isId && "success"}`}>{idMessage}</p>
        <input
          type="text"
          placeholder="닉네임"
          name="nickname"
          onChange={(e) => onChangeNickName(e)}
        />
        <p className={`message ${isNickname && "success"}`}>
          {nicknameMessage}
        </p>
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={(e) => onChangePassword(e)}
        />
        <p className={`message ${isPassword && "success"}`}>
          {passwordMessage}
        </p>
        <input
          type="password"
          placeholder="비밀번호 확인"
          name="confirmPassword"
          onChange={(e) => onChangePasswordConfirm(e)}
        />
        <p className={`message ${isPasswordConfirm && "success"}`}>
          {passwordConfirmMessage}
        </p>
        {isId && isNickname && isPassword && isPasswordConfirm ? (
          <button className="button2">회원가입</button>
        ) : (
          <button className="button1" disabled>
            회원가입
          </button>
        )}

        <span>
          이미 계정이 있으신가요?
          <Link onClick={() => setCheckAuth("login")}> 로그인</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
