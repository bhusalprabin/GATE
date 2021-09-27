import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./auth.css";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import logo from "../../assets/image/logo.png";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "react-google-login";

const Signup = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  // const checkLogin = async () => {
  //   const res = await fetch("/checkLogin", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };
  // if (checkLogin()) {
  //   history.push("/");
  // } else {
  //   history.push("/signup");
  // }
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    address: "",
    hired_or_not: true,
    school: "",
    gender: "",
    level: "",
    photos: "",
  });

  const [passErr, setPassErr] = useState();

  let name, value;
  const handleInputs = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setStudent({ ...student, [name]: value });
  };

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
    const { name, email, phone, password, cpassword } = student;

    if (password === cpassword) {
      console.log(phone);
      if ((!name, !email, !phone, !password)) {
        notify1();
      } else {
        const res = await fetch("/students", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            address: "",
            hired_or_not: false,
            school: "",
            gender: "",
            level: "",
          }),
        });
        const data = await res.json();

        if (res.status === 400 || !data) {
          notify1();
          console.log("error");
        } else {
          dispatch({ type: "USER", payload: 1 });
          localStorage.setItem("isLogged", "1");
          console.log("success");
          history.push("/search");
        }
      }
    } else {
      notify();
    }
  };

  const ShowPassErr = () => {
    if (passErr) {
      return <p className="pass-err">{passErr}</p>;
    } else {
      return null;
    }
  };

  return (
    <div className="signinStudent">
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
      <div className="signinStudent-container">
        <Row>
          <Col md={6} sm={12} className="signinStudent-container-left">
            <div className="signup-logo">
              <img src={logo} alt="gate-logo" />
            </div>
            <div className="signup-content">
              <p>One step more to hire tutor</p>
            </div>
            <div className="get-started">
              <p>Get Started</p>
              <GoogleLogin
                clientId="702118801258-qsne30uenciqf1fk16f3ddnjelhemo9u.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={`single_host_origin`}
              />

              <Link to="/students/login">Already Registered?</Link>
              <Link to="/">Back To Homepage</Link>
            </div>
          </Col>
          <Col md={6} sm={12} className="signinStudent-container-right ">
            <p>Register New Account</p>
            <form method="POST" onSubmit={submitForm}>
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                value={student.name}
                onChange={handleInputs}
                placeholder="Your Full Name"
                required={true}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={student.email}
                onChange={handleInputs}
                placeholder="Your Email"
                required={true}
              />

              <label htmlFor="phone">Phone</label>
              <input
                maxLength={10}
                minLength={10}
                type="text"
                id="phone"
                name="phone"
                value={student.phone}
                onChange={handleInputs}
                placeholder="Your Phone Number"
                required={true}
              />

              <label htmlFor="pass1">Password</label>
              <input
                type="password"
                id="pass1"
                name="password"
                value={student.password}
                onChange={handleInputs}
                placeholder="Password"
                required={true}
              />
              <label htmlFor="pass2">Re-type Password</label>
              <input
                type="password"
                id="pass2"
                name="cpassword"
                value={student.cpassword}
                onChange={handleInputs}
                placeholder="Confirm your password"
              />
              <br />

              <button type="submit">Register Account</button>
              <div className="signup-hide">
                <div className="signup-hide-icons">
                  <AiFillGoogleCircle className="signup-hide-icon" />
                  <AiFillFacebook className="signup-hide-icon" />
                </div>
                <Link to="/students/login">Already Registered ?</Link>
                <Link to="/">Back To Homepage</Link>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Signup;
