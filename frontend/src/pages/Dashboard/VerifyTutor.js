import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import defaultImg from "../../assets/image/certificate.png";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const VerifyTutor = () => {
  const token = localStorage.getItem("isLogged");

  if (token != "2") {
    history.push("/tutor/login");
  }
  const history = useHistory();

  const [verify, setVerify] = useState();
  const [file, setFile] = useState();
  const [imgLink, setImgLink] = useState();
  const formData = new FormData();
  const [emailVerify, setEmailVerify] = useState();
  const [email, setEmail] = useState();
  const notify = () =>
    toast.error("Upload correct format", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notify1 = () =>
    toast.error("Success !!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //   image upload
  formData.append("myImage", file);

  const imageClick = () => {
    document.getElementById("imageUpload").click();
  };

  const imageChange = (e) => {
    var ext = e.target.files[0].type;
    if (ext === "image/jpeg" || ext === "image/jpg" || ext === "image/png") {
      setImgLink(URL.createObjectURL(e.target.files[0]));
      // fasterPreview(e.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      notify();
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const res = await fetch("/tutors/me/certificate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });
      const data = await res.json();

      if (res.status === 200 || data) {
        console.log(data);
        window.alert("done");
        history.push("/tutor/dashboard");
        window.location.reload(false);
      } else {
        console.log("error");
      }
    } else {
      notify();
    }
  };

  useEffect(async () => {
    const res = await fetch("/tutors/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data || res.status === 201) {
      setVerify(data.verify);
      setEmailVerify(data.verifyEmail);
      setEmail(data.email);
    }

    if (!data || res.status !== 201) {
      history.push("/tutor/login");
    }
  }, []);

  console.log(verify);

  const verifyEmailTutor = async (e) => {
    e.preventDefault();
    const res = await fetch("/tutor/verify/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
      body: JSON.stringify({
        tutor: email,
      }),
    });
    const data = await res.json();
    console.log(data);

    window.alert("Check Mail, Verify and Come Back");
    history.push("/tutor/dashboard");
  };

  return (
    <div className="tutor-verify">
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
      {emailVerify === "no" ? (
        <>
          <h2>First Verify Your Email</h2>
          <hr />
          <button className="btn btn-info" onClick={verifyEmailTutor}>
            Get Email To Verify
          </button>
        </>
      ) : (
        <>
          <h1 className="verified-tutor-heading">Verify Account</h1>

          {verify === "true" ? (
            <h3 className="verified-tutor-subtitle">You are verified tutor.</h3>
          ) : verify === "pending" ? (
            <h3 className="verified-tutor-subtitle">Pending request</h3>
          ) : (
            <>
              <h3 className="verified-tutor-subtitle">You are not verified</h3>
              <div>
                <h4 className="verified-tutor-image-upload-heading">
                  Upload Your Certificate Image
                </h4>
                <div className="student-profile-img-upload">
                  <img
                    src={imgLink ? imgLink : defaultImg}
                    alt=""
                    onClick={imageClick}
                    id="imageShow"
                  />
                  <p>Click Here To Upload</p>
                </div>
                <Form onSubmit={onFormSubmit} encType="multipart/form-data">
                  <Form.Group controlId="formFile" className="mb-3">
                    <input
                      id="imageUpload"
                      type="file"
                      onChange={imageChange}
                    />
                  </Form.Group>

                  <Button type="submit">Continue</Button>
                </Form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyTutor;
