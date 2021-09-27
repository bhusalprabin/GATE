import React, { useState } from "react";

import { useHistory } from "react-router-dom";
// import defaultImg from "../../assets/image/certificate.png";
import { Form, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const VerifyTutor = () => {
  const token = localStorage.getItem("isLogged");

  if (token != "2") {
    history.push("/tutor/login");
  }
  const history = useHistory();

  const [coursename, setCourseName] = useState();
  const [course_id, setCourseId] = useState();
  const [level, setLevel] = useState();
  const [email, setEmail] = useState();

  const notify = () =>
    toast.error("Fill all form", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notify1 = () =>
    toast.error("Unique ID please !!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify2 = () =>
    toast.success("Success !!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
      console.log(data);
      setEmail(data.email);
    }

    if (!data || res.status !== 201) {
      history.push("/tutor/login");
    }
  }, []);

  const createCourse = async (e) => {
    e.preventDefault();
    if (!coursename || !course_id || !level) {
      notify();
    } else {
      const res = await fetch("/tutors/addcourse", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        include: "credentials",
        body: JSON.stringify({
          course_name: coursename,
          course_id,
          level,
          tutor: email,
          approved: "pending",
        }),
      });
      const data = await res.text();
      console.log(data);
      if (res.status === 205) {
        console.log("duplicate");
        notify1();
      } else {
        notify2();
        history.push("/tutor/dashboard");
      }
    }
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

      <h1 style={{ color: "olive", textAlign: "center" }}>
        Request New subject
      </h1>

      <div>
        <Container style={{ marginTop: "10px", padding: "20px" }}>
          <Form onSubmit={createCourse}>
            <div class="form-group">
              <label htmlFor="exampleInputEmail1">Course Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Course Name"
                value={coursename}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label htmlFor="exampleInputEmail2">Course Unique Id</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail2"
                placeholder="Enter Course Unique ID Name"
                value={course_id}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label>Course Level</label>
              <select
                className="form-control"
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Choose any level</option>
                <option value="school">School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor</option>
              </select>
            </div>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default VerifyTutor;
