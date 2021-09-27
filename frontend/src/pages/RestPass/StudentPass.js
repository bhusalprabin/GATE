import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentPass = () => {
  const history = useHistory();
  const search = useLocation().search;
  const [email, setEmail] = useState();

  const [password, setPass] = useState();
  const [confirm, setConfirm] = useState();

  useEffect(() => {
    const email1 = new URLSearchParams(search).get("email");
    setEmail(email1);
  }, [search]);
  const notify = () =>
    toast.error("Failed", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notify1 = () =>
    toast.error("Input Correct Data", {
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
    console.log("password = " + password);
    console.log("confirm " + confirm);
    if (!password || password !== confirm) {
      notify1();
    } else {
      const res = await fetch("/student/forget/confirm", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: email,
          password: password,
        }),
      });
      const data = await res.json();
      if (res.status === 200 && data) {
        history.push("/");
      } else {
        notify();
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
        <h1>Reset Password</h1>

        <form method="POST" onSubmit={submitForm}>
          <input
            type="password"
            name="password1"
            min={6}
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Your New Password"
          />
          <br />
          <input
            minLength={6}
            type="password"
            value={confirm}
            min={6}
            onChange={(e) => setConfirm(e.target.value)}
            name="password"
            placeholder="Confirm Password"
          />

          <br />
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default StudentPass;
