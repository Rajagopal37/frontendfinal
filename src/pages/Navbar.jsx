import React from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const isToken = localStorage.getItem("token");

  const navigate = useNavigate;

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between bg-light"
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        margin: "0",
        padding: "10px 10px",
        width: "100%",
      }}
    >
      <h2 className="text-primary ps-4 m-2"> Task Manager</h2>
      {isToken && <ProfileInfo onLogout={onLogout} />}
    </div>
  );
};
