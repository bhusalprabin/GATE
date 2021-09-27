import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col } from "react-bootstrap";
import districtData from "../../assets/data/district.json";
import course from "../../assets/data/level.json";
import subjectData from "../../assets/data/subject.json";
import { Multiselect } from "multiselect-react-dropdown";
import { useHistory } from "react-router-dom";
import "./style.css";
import "./TutorSignup.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TutorSignupUpdate = () => {
  const token = localStorage.getItem("isLogged");

  const history = useHistory();
  if (token != "2") {
    history.push("/tutor/login");
  }

  const data = subjectData;
  const [options, setOptions] = useState(data);
  const [gender, setGender] = useState("");
  const [district, setDistrct] = useState();
  const [level, setLevel] = useState([]);
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [subjects] = useState([]);
  const [price, setPrice] = useState();

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

  const levelSet = (e) => {
    e.preventDefault();
    let newArray = [...level];
    if (newArray.includes(e.target.value)) {
      var index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1);
      }
    } else {
      newArray.push(e.target.value);
    }

    setLevel(newArray);
  };

  const onSelect = (selectedList, selectedItem) => {
    if (!subjects.includes(selectedItem.subjectName.toLowerCase())) {
      subjects.push(selectedItem.subjectName.toLowerCase());
    }
  };

  const onRemove = (selectedList, selectedItem) => {
    if (subjects.includes(selectedItem.subjectName.toLowerCase())) {
      var index = subjects.indexOf(selectedItem.subjectName.toLowerCase());
      if (index !== -1) {
        subjects.splice(index, 1);
      }
    }
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

  const updateTutor = async (e) => {
    e.preventDefault();

    if (
      !price ||
      !gender ||
      !district ||
      !level ||
      !subjects ||
      !tagline ||
      !bio ||
      district === "0"
    ) {
      notify();
    } else {
      const res = await fetch("/tutors/me", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: district,
          gender,
          level,
          subjects,
          tagline,
          bio,
          price,
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
        history.push("/tutor/dashboard");
      }
    }
  };

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
      <h1>Create Your Profile</h1>
      <Container>
        <Form onSubmit={updateTutor}>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              name="gender"
              value="male"
              label="Male"
              defaultChecked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              name="gender"
              value="female"
              label="Female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Select Your District</Form.Label>
            <Form.Control
              as="select"
              placeholder="Choose District"
              defaultValue="all"
              value={district}
              onChange={(e) => setDistrct(e.target.value)}
            >
              {districtData.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.district}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Choose Level You Are Comfortable For</Form.Label>
            {course.map((option) => (
              <div key={option.id} className="mb-3">
                <Form.Check
                  id={option.id}
                  inline
                  label={option.level}
                  value={option.value}
                  name="level"
                  type={"checkbox"}
                  onChange={levelSet}
                />
              </div>
            ))}
          </Form.Group>
          {/* <Dropdown /> */}
          <br />
          <Form.Group as={Col} controlId="formGridState">
            <div style={{ textTransform: "capitalize" }}>
              <Form.Label>Select Your Subjects</Form.Label>
              <Multiselect
                options={options}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="subjectName"
              />
            </div>
          </Form.Group>
          <br />
          <Form.Group as={Col} controlId="formGridState">
            <div>
              <Form.Label>Hourly Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your hourly salary"
                max={5000}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </Form.Group>
          <br />

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Enter Your Tagline</Form.Label>
            <Form.Control
              type="text"
              placeholder="Short tagline to describe you... max:20 words only"
              max={20}
              onChange={(e) => setTagline(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Enter Your Short Bio</Form.Label>
            <Form.Control
              as="textarea"
              max={100}
              rows={3}
              placeholder="This appers on search result for students... max:100 words only"
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>

          <p className="disabled">
            By clicking Next, You accept our{" "}
            <Link to="/privacy">Terms and Conditions</Link>
          </p>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Container>

      {/*  */}
    </div>
  );
};

export default TutorSignupUpdate;
