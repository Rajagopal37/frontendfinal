import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <div className="form-group m-3 w-100 position-relative">
        <input
          className="form-control mb-2"
          type={isShowPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Password"}
        />

        <span
          type="button"
          className="position-absolute end-0 top-0 me-3 mt-2"
          onClick={toggleShowPassword}
        >
          {isShowPassword ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye text-primary"></i>
          )}
        </span>
      </div>
    </>
  );
};

export default PasswordInput;
