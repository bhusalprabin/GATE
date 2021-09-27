import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./auth.css";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import logo from "../../assets/image/logo.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const history = useHistory();
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
  });

  const notify = () =>
    toast.error("Password Didn't Match", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notify1 = () =>
    toast.error("Bad Request", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [passErr, setPassErr] = useState();

  let name, value;
  const handleInputs = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setStudent({ ...student, [name]: value });
  };

  const submitForm = async (e) => {
    console.log("clicked");
    e.preventDefault();
    const { name, email, phone, password, cpassword } = student;

    if (password === cpassword) {
      const res = await fetch("/tutors", {
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
          address: "Kathmandu",
          hired_or_not: true,
          school: "Apollo",
          gender: "male",
          level: "bachelor",
        }),
      });
      const data = await res.json();
      console.log(data);
      // console.log(data);
      if (res.status === 400 || !data) {
        notify1();
        console.log("error");
      } else {
        console.log("success");
        localStorage.setItem("isLogged", "2");
        window.alert("registration successfull");
        history.push("/tutor/signup/imageUpload");
      }
    } else {
      notify();
      setPassErr("Password didn't match");
      console.log(passErr);
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
      <div className="signinStudent-container">
        <Row>
          <Col md={6} sm={12} className="signinStudent-container-left">
            <div className="signup-logo">
              <img src={logo} alt="gate-logo" />
            </div>
            <div className="signup-content">
              <p>One step more to become a tutor</p>
            </div>
            <div className="get-started">
              <Link to="/">Back To Homepage</Link>
              <Link to="/tutor/login">Already Registered?</Link>
            </div>
          </Col>
          <Col md={6} sm={12} className="signinStudent-container-right ">
            <p>Register As A Tutor</p>
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
                type="text"
                minLength={10}
                maxLength={10}
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
              <ShowPassErr />

              <button type="submit">Register Account</button>
              <div className="signup-hide">
                <div className="signup-hide-icons">
                  <AiFillGoogleCircle className="signup-hide-icon" />
                  <AiFillFacebook className="signup-hide-icon" />
                </div>
                <Link to="/tutor/login">Already Registered ?</Link>
                <Link to="/">Back To Home</Link>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Signup;
