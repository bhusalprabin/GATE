import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import TopNavbar from "../../components/Navbar";
import "./SearchPage.css";
import searchImg from "../../assets/image/s.png";
import Footer from "../../components/Footer";
import { useHistory } from "react-router-dom";
import districtData from "../../assets/data/district.json";
import subjectData from "../../assets/data/subject.json";
// import { Multiselect } from "multiselect-react-dropdown";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchPage = () => {
  const history = useHistory();
  const [location, setLocation] = useState("");

  const [level, setLevel] = useState("");
  const [options, setOptions] = useState(subjectData);
  const [subjects, setSubjects] = useState("");

  const inputLevel = (e) => {
    e.preventDefault();
    setLevel(e.target.value);
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

  const inputSubject = (e) => {
    setSubjects(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    // console.log(location, subject, level);

    history.push({
      pathname: "/searchpage",
      search:
        "?" +
        "subject=" +
        subjects +
        "&location=" +
        location +
        "&level=" +
        level,
      state: { detail: [location, subjects, level] },
    });
  };
  useEffect(async () => {
    const res1 = await fetch("/subjects", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data1 = await res1.json();
    setOptions(data1);
  }, []);

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
      <section className="search-page">
        <TopNavbar />
        <h1>Search Your Tutors</h1>
      </section>

      <section className="search-box">
        <Container>
          <Row>
            <Col md={6} sm={12} className="search-box-col pl-4">
              <img src={searchImg} alt="" />
            </Col>
            <Col md={6} sm={12} className="search-box-col col-md-offset-2">
              <Container className="search-box-cont">
                <Form onSubmit={searchSubmit}>
                  <Form.Group as={Col} controlId="formGridState">
                    <label htmlFor="exampleFormControlSelect1">Subjects</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect"
                      value={subjects}
                      onChange={inputSubject}
                      placeholder="Select Your Subject"
                    >
                      <option value="">Select subject</option>
                      {options.map((sub) => (
                        <option value={sub.value} key={sub.id}>
                          {sub.subjectName}
                        </option>
                      ))}
                    </select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <label htmlFor="exampleFormControlSelect1">Level</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={inputLevel}
                      placeholder="Select Your Level"
                      value={level}
                    >
                      <option value="">Select Level</option>
                      <option value="school">School</option>
                      <option value="bachelor">Bachelor</option>
                      <option value="diploma">Diploma</option>
                    </select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Select Your District</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Choose District"
                      defaultValue=""
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                    >
                      {districtData.map((option) => (
                        <option value={option.value} key={option.id}>
                          {option.district}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button variant="primary" type="submit">
                      Search
                    </Button>
                  </Form.Group>
                </Form>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default SearchPage;
