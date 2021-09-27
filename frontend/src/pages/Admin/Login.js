import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "react-google-login";

const AdminLogin = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

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

  let name, value;
  const handleLogin = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    console.log(user);
    const { name, password } = user;
    if ((!name, !password)) {
      notify();
    } else {
      const res = await fetch("/admin/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        notify1();
        console.log("error");
      } else {
        console.log("success");
        dispatch({ type: "ADMIN", payload: 5 });
        localStorage.setItem("isLogged", "5");
        history.push("/admin");
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
        <h1>Admin Login</h1>

        <form method="POST" onSubmit={submitForm}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleLogin}
            placeholder="Username"
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
        </form>
        <div className="student-login-forget">
          <br />
          <Link to="/" style={{ color: "red" }}>
            Back To HomePage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
