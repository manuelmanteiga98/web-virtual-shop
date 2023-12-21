import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "../../backend/userFirebase";
import { logged } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

function LoginForm() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password, () => {
      dispatch(logged(true));
      navigate("/articles");
    });
  };

  return (
    <div class="container h-100 d-flex justify-content-center align-items-center">
      <form class="row g-3 custom-form" onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            class="form-control"
            type="email"
            placeholder="Email Address"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            class="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>
        <button class="btn btn-success" type="submit">
          Login
        </button>
        <div className="mb-3 d-flex justify-content-center">
        <div>Don't you have an account?</div>
        <Link to="/register"><a className="login-register-label">Register</a></Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
