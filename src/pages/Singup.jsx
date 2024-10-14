import { useState } from "react";
import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { validateMail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please Enter Your Fullname");
      return;
    }

    if (!validateMail(email)) {
      setError("Please Enter a valid Email address");
      return;
    }

    if (!password) {
      setError("Please Enter a Password");
      return;
    }

    setError("");

    // Signup API
    try {
      const response = await axiosInstance.post("/create-account", {
        fullname: name,
        email: email,
        password: password,
      });

      // Handle successful registration response
      if (response.data && response.data.error) {
        alert("Account Created Successfully. Please Login");
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/login");
      }
    } catch (error) {
      // Handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="m-3 p-3 w-50 border border-3 border-primary rounded d-flex justify-content-center align-items-center">
          <form onSubmit={handleSignup} className="m-3 p-1 w-75">
            <h3 className="mb-4 d-flex justify-content-center text-primary">
              Create an Account
            </h3>

            <div className="form-group m-3 w-100">
              <input
                type="text"
                placeholder="Full Name"
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group m-3 w-100">
              <input
                type="text"
                placeholder="Email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-danger text-center pt-1">{error}</p>}

            <div className="mt-3 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary text-white fw-normal rounded"
              >
                Signup
              </button>
            </div>

            <p className="text-center my-3">
              Already Have An Account ?. Kindly <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
