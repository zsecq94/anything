import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(`/${url}`);
  };
  return (
    <div className="header-wrapper">
      <div className="header-title" onClick={() => handleNavigate("")}>
        <h2>부르미</h2>
      </div>
      <div className="header-login" onClick={() => handleNavigate("login")}>
        <FaUserCircle />
      </div>
    </div>
  );
};

export default Header;
