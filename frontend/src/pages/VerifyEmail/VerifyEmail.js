import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const history = useHistory();
  const search = useLocation().search;
  const email1 = new URLSearchParams(search).get("email");

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

  const fetchedData = async () => {
    const res = await fetch("/tutor/final/verify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutor: email1,
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data) {
      history.push("/");
    } else {
      notify();
    }
  };

  useEffect(() => {
    fetchedData();
  }, [search]);
  return (
    <div>
      <h1>Verifying...</h1>
    </div>
  );
};

export default VerifyEmail;
