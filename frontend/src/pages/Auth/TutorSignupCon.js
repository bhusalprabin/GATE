import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./TutorSignup.css";
import { useHistory } from "react-router-dom";
import profile from "../../assets/image/profile.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TutorSignupCon = () => {
  const history = useHistory();
  const [file, setFile] = useState();
  const [imgLink, setImgLink] = useState();
  const formData = new FormData();

  const token = localStorage.getItem("isLogged");

  if (token != "2") {
    history.push("/tutor/login");
  }

  const notify = () =>
    toast.error("Wrong File format !Support only .jpg, .png and .jpeg", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify1 = () =>
    toast.error("Please Upload Image First !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
      const res = await fetch("/tutors/me/avatar", {
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
        history.push("/tutor/signup/updateInfo");
      } else {
        console.log("error");
      }
    } else {
      notify1();
    }
  };

  return (
    <div>
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
      <div className="tutorsignupcontinue">
        <div className="tutorsignupcontainer container">
          <h1>Upload Your Image</h1>
          <div className="tutor-profile-img-upload">
            <img
              src={imgLink ? imgLink : profile}
              alt=""
              onClick={imageClick}
              id="imageShow"
            />
            <p>Click Here To Upload</p>
          </div>
          <Form onSubmit={onFormSubmit} encType="multipart/form-data">
            <Form.Group controlId="formFile" className="mb-3">
              <input id="imageUpload" type="file" onChange={imageChange} />
            </Form.Group>

            <Button type="submit">Continue</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TutorSignupCon;
