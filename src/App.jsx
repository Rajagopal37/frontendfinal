import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Singup";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Singup />}></Route>
    </Routes>
  </Router>
);

const App = () => {
  return (
    <>
      <div className="">{routes}</div>
    </>
  );
};

export default App;
