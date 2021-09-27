import React, { useState } from "react";
import { useHistory } from "react-router";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleLogin = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const notify = () =>
    toast.error("Fill up all forms", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notify1 = () =>
    toast.error("Invalid Credentials", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(user);
    const { email, password } = user;
    const res = await fetch("/tutors/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      notify1();
      console.log("error");
    } else {
      console.log("success");
      localStorage.setItem("isLogged", "2");
      window.alert("login successfull");
      history.push("/tutor/dashboard");
    }
  };
  const resetPass = async () => {
    const { email } = user;
    if (!email) {
      notify();
    } else {
      var result = window.confirm("Procced...And check mail now ");
      if (result) {
        const res = await fetch("/tutor/forget/pass", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tutor: email,
          }),
        });
        const data = await res.json();
        history.push("/");
      }
    }
  };
  return (
    <div className="student-login">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="student-login-container">
        <h1>Tutor Login Page</h1>
        <form method="POST" onSubmit={submitForm}>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleLogin}
            placeholder="Email"
          />
          <br />
          <input
            minLength={6}
            type="password"
            value={user.password}
            onChange={handleLogin}
            name="password"
            placeholder="Password"
          />

          <br />
          <button type="submit">Login</button>
          <div className="student-login-icons">
            <div className="login-icons">
              {/* <button>
                <AiFillFacebook className="signin-hide-icon" /> Facebook
              </button> */}
            </div>
          </div>
        </form>
        <div className="student-login-forget">
          <Link onClick={resetPass}>Forget Password?</Link>
          <p>
            Not a Member? <Link to="/tutor/signup">Sign up now</Link>
            <br />
            <Link to="/">Back To HomePage</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
