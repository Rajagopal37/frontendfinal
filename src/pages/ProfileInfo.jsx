import React from "react";
import { getInitials } from "../utils/helper";

const ProfileInfo = (userInfo, onLogout) => {
  return (
    userInfo && (
      <div className="d-flex align-items-center">
        <div
          className="d-flex align-items-center justify-content-center border border-2 border-primary rounded-start-pill p-2 fs-4 m-2 fw-medium"
          style={{ fontSize: "1.2rem" }}
        >
          <span className="mx-2">
            {getInitials(userInfo ? userInfo.fullName : "")}
          </span>
          <button
            className="btn btn-link text-danger fw-medium"
            onClick={onLogout}
            style={{ textDecoration: "none", fontSize: "1.1rem" }}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
