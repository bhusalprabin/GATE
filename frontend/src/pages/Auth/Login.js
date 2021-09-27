import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "react-google-login";
const Login = () => {
  const responseSuccessGoogle = async (response) => {
    const res = await fetch("/students/googleLogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: response.tokenId,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      notify1();
      console.log("error");
    } else {
      console.log("success");
      dispatch({ type: "USER", payload: 1 });
      localStorage.setItem("isLogged", "1");
      history.push("/search");
    }
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
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
    const { email, password } = user;
    if ((!email, !password)) {
      notify();
    } else {
      const res = await fetch("/students/login", {
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
        dispatch({ type: "USER", payload: 1 });
        localStorage.setItem("isLogged", "1");
        history.push("/search");
      }
    }
  };

  const resetPass = async () => {
    const { email } = user;
    var result = window.confirm("Proced...And check mail now ");
    if (result) {
      const res = await fetch("/student/forget/pass", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: email,
        }),
      });
      const data = await res.json();
      history.push("/");
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
        <h1>Student Login</h1>

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
            <p>Or</p>
            <div className="login-icons">
              <GoogleLogin
                clientId="702118801258-qsne30uenciqf1fk16f3ddnjelhemo9u.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={`single_host_origin`}
              />
              {/* <button>
                <AiFillGoogleCircle className="signin-hide-icon" /> Google
              </button> */}
              {/* <button>
                <AiFillFacebook className="signin-hide-icon" /> Facebook
              </button> */}
            </div>
          </div>
        </form>
        <div className="student-login-forget">
          <Link onClick={resetPass}>Forget Password?</Link>
          <p>
            Not a Member? <Link to="/students/signup">Sign up now</Link>
            <br />
            <Link to="/">Back To HomePage</Link>
            <br />
            <Link to="/tutor/login">Tutor Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
