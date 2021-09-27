import React, { useState, useEffect } from "react";
import "./TutorProfile.css";
import TopNav from "../../components/Navbar";
import Footer from "../../components/Footer";
import profileDummy from "../../assets/image/pm.jpg";
import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import queryString from "query-string";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoVerified } from "react-icons/go";

const TutorProfile = () => {
  const location = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = location.location.search.slice(4) + "@gmail.com";

  const [show, setShow] = useState(false);
  const [address, setAddress] = useState();
  const [subjectName, setSubjectName] = useState();
  const [collegeName, setCollegeName] = useState();
  const [level, setLevel] = useState();
  const [startDate, setStart] = useState();
  const [endDate, setEnd] = useState();
  const [imgLink, setImgLink] = useState();
  const [policy, setPolicy] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notify1 = () =>
    toast.success("Email Was Send Successfully !!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const fetchData = async () => {
    const res = await fetch(
      "/tutors/filteredbyemail?" +
        new URLSearchParams({
          user,
        }),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (res.status === 200 || data) {
      console.log("success");
      setFilteredData(data[0]);
      setLoading(true);
      setSubjects(data[0].subjects);
      setLevel(data[0].level[0]);
      setSubjectName(data[0].subjects[0]);
      setImgLink(data[0].avatar);
      console.log(filteredData);
    } else {
      console.log("error");
    }
  };

  const notify = () =>
    toast.error("Please Login To Proceed", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyMsg = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    fetchData();
  }, [location]);

  const hireMe = async () => {
    var answer = window.confirm("Do you want to proceed ?");
    if (answer) {
      if (
        !address ||
        !subjectName ||
        !collegeName ||
        !level ||
        !startDate ||
        !endDate
      ) {
        notifyMsg("Fill All Form Properly !");
      } else {
        console.log("clicked");
        const res = await fetch("/new/course", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            tutor: user,
            address,
            subjectName,
            collegeName,
            level,
            startDate,
            endDate,
            avatar: imgLink,
          }),
        });

        const data = await res.json();
        if (res.status === 400 || res.status === 401 || !data) {
          notify();
        } else if (res.status === 402) {
          notifyMsg("Already added!!!");
        } else {
          notify1();
          console.log("Succes");
          setTimeout(() => {
            location.push("/student/dashboard");
          }, 2000);
        }
      }
    }
  };

  const policyChange = (e) => {
    if (policy === "accept") {
      setPolicy("");
    } else {
      setPolicy(e.target.value);
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
      <div className="tutor-profile-container">
        <TopNav />
        <h1>Hire Me</h1>
      </div>
      <div className="tutor-profile-content">
        {loading ? (
          filteredData ? (
            <Container>
              <Row>
                <Col md={6} sm={12} className="tutor-profile-img-container">
                  <div className="tutor-profile-img">
                    <img
                      src={
                        filteredData.avatar
                          ? `data:image/png;base64,${filteredData.avatar}`
                          : profileDummy
                      }
                      alt="profile"
                      className="profile-page-img"
                    />
                    <p>Rs.{filteredData.price} /hour</p>
                  </div>
                </Col>
                <Col md={6} sm={12} className="tutor-profile-desc">
                  <h1 style={{ display: "flex", flexDirection: "row" }}>
                    {filteredData.name}
                    <span>
                      {filteredData.verify === "true" ? (
                        <GoVerified
                          style={{ marginTop: "-8px", padding: "0 3px" }}
                        />
                      ) : (
                        <span></span>
                      )}
                    </span>
                    <div
                      className={
                        filteredData.status === "busy"
                          ? "tutor-status-busy"
                          : "tutor-status-free"
                      }
                    />
                  </h1>
                  <h6>{filteredData.tagline}</h6>
                  {/* <p className="profile-page-price">Rs.700 /hour</p> */}
                  <hr />
                  <div className="profile-page-about">
                    <h5>About Me</h5>
                    <p>{filteredData.bio}</p>
                    <b>Address: {filteredData.address}</b>
                  </div>
                  <hr />
                  <div className="prifile-page-course">
                    <h5>What I Teach</h5>
                    {filteredData.subjects.map((sub) => (
                      <button style={{ textTransform: "capitalize" }} key={sub}>
                        {sub}
                      </button>
                    ))}
                  </div>
                  <hr />
                  <div className="profile-page-hire">
                    <h5>Want To Be Connected?</h5>
                    {filteredData.status === "busy" ? (
                      <Button disabled className="btn btn-dark">
                        I am Busy
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={handleShow}>
                        Hire Now
                      </Button>
                    )}

                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Fill Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Your Full Living Address"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Level</Form.Label>
                            <select
                              className="form-control"
                              name="level"
                              value={level}
                              onChange={(e) => setLevel(e.target.value)}
                            >
                              {filteredData.level.map((l) => {
                                return (
                                  <option key={l} value={l}>
                                    {l}
                                  </option>
                                );
                              })}
                            </select>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>School/college name:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Your School/College Name"
                              onChange={(e) => setCollegeName(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Subject</Form.Label>
                            <select
                              className="form-control"
                              name="subject"
                              value={subjectName}
                              onChange={(e) => setSubjectName(e.target.value)}
                            >
                              {filteredData.subjects.map((l) => {
                                return (
                                  <option key={l} value={l}>
                                    {l}
                                  </option>
                                );
                              })}
                            </select>
                          </Form.Group>
                          <Form.Group>
                            <label for="datemin">Enter a start date:</label>
                            <input
                              className="form-control"
                              type="date"
                              id="datemin"
                              name="datemin"
                              min="2020-01-02"
                              onChange={(e) => setStart(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <label for="datemin1">Enter a start date:</label>
                            <input
                              className="form-control"
                              type="date"
                              id="datemin1"
                              name="datemin"
                              onChange={(e) => setEnd(e.target.value)}
                            />
                          </Form.Group>

                          <input
                            type="checkbox"
                            value="accept"
                            onChange={policyChange}
                          />
                          <span>
                            Do you accept our
                            <Link to="/policy"> policies</Link>
                          </span>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        {policy === "accept" ? (
                          <Button variant="primary" onClick={hireMe}>
                            Book
                          </Button>
                        ) : (
                          <Button variant="primary" disabled>
                            Book
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            <h1>User Not Found</h1>
          )
        ) : (
          <h1>Not Loaded</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TutorProfile;
