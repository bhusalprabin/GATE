import React, { useState } from "react";
import { Container, Button, Form, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../Auth/style.css";
import "../Auth/TutorSignup.css";
import districtData from "../../assets/data/district.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import defaultImg from "../../assets/image/profile.jpeg";

const StudentUpdate = () => {
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
    toast.error("Success !!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const token = localStorage.getItem("isLogged");
  const history = useHistory();

  if (token != "1") {
    history.push("/student/login");
  }
  const [file, setFile] = useState();
  const [imgLink, setImgLink] = useState();
  const formData = new FormData();
  const [studentData, setStudentData] = useState();
  const [gender, setGender] = useState();
  const [district, setDistrct] = useState();
  const [level, setLevel] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

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
      const res = await fetch("/students/me/avatar", {
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
        history.push("/student/dashboard");
        window.location.reload(false);
      } else {
        console.log("error");
      }
    } else {
      notify1();
    }
  };

  useEffect(async () => {
    try {
      const res = await fetch("/students/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.status === 200 || !data) {
        console.log("error on authentication");
        history.push("/students/signin");
      } else if (res.status === 200) {
        setStudentData(data);
        setName(data.name === undefined ? "" : data.name);
        setGender(data.gender === undefined ? "" : data.gender);
        setDistrct(data.address === undefined ? "" : data.address);
        setPhone(data.phone === undefined ? "" : data.phone);
      }
    } catch (e) {
      console.log("error on authentication");
      history.push("/students/login");
    }
  }, []);

  const updateStudent = async (e) => {
    e.preventDefault();
    if ((!name, !gender, !district, district === "all", !phone)) {
      notify();
    } else {
      const res = await fetch("/students/me", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          gender,
          address: district,
          phone,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        notify();
        console.log("error");
      } else {
        console.log("success");
        notify1();
        history.push("/student/dashboard");
        window.location.reload(false);
      }
    }
  };

  console.log(district);
  return (
    <div className="tutor-profile-create">
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

      <Container style={{ marginTop: "10px", padding: "20px" }}>
        {studentData ? (
          studentData.avatar === undefined ? (
            <div>
              <div>
                <div>
                  <h1>Upload Your Image</h1>
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
              </div>
            </div>
          ) : (
            <Form onSubmit={updateStudent}>
              <div class="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your FullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label htmlFor="gender">Gender</label>
                <div class="form-check">
                  <input
                    type="radio"
                    name="gender"
                    id="exampleRadios1"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "male" ? true : false}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Male
                  </label>
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    id="exampleRadios2"
                    value="female"
                    checked={gender === "female" ? true : false}
                    onChange={(e) => setGender(e.target.value)}
                  />

                  <label class="form-check-label" for="exampleRadios2">
                    Female
                  </label>
                </div>
                <br />
                <div class="form-group">
                  <label htmlFor="address">Select Address</label>
                  <br />
                  <select
                    className="form-control"
                    name="address"
                    value={district}
                    onChange={(e) => setDistrct(e.target.value)}
                  >
                    {districtData.map((option) => (
                      <option value={option.value} key={option.key}>
                        {option.district}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="form-group">
                  <label htmlFor="phone">Enter your phone number:</label>
                  <br />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    pattern="[9]{1}[0-9]{9}"
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </div>

                {/* <Form.Group controlId="formGridState">
                  <Form.Label>Select Your District</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Choose District"
                    defaultValue={district}
                    value={district}
                    onChange={(e) => setDistrct(e.target.value)}
                  >
                    {districtData.map((option) => (
                      <option value={option.value} key={option.id}>
                        {option.district}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group> */}
              </div>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          )
        ) : (
          <h1>Data not fetched</h1>
        )}
      </Container>

      {/*  */}
    </div>
  );
};

export default StudentUpdate;
