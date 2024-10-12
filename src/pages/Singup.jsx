import { useState } from "react";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { validateMail } from "../utils/helper";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!fullName) {
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

    console.log("Form submitted with:", { fullName, email, password });
    setError("");

    // Login API
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="m-3 p-3 w-50 border border-3 border-primary rounded d-flex justify-content-center align-items-center">
          <form onSubmit={handleLogin} className="m-3 p-1 w-75">
            <h3 className="mb-4 d-flex justify-content-center text-primary">
              Create an Account
            </h3>

            <div className="form-group m-3 w-100">
              <input
                type="text"
                placeholder="Fullname"
                className="form-control mb-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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

            <div className="text-center my-3">
              Already Have An Account. Kindly <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
