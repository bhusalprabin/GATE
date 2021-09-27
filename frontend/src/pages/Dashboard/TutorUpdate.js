import React, { useState } from "react";
import { Container, Button, Form, Col } from "react-bootstrap";
import districtData from "../../assets/data/district.json";
import course from "../../assets/data/level.json";
import subjectData from "../../assets/data/subject.json";
import { Multiselect } from "multiselect-react-dropdown";
import { useHistory } from "react-router-dom";
import "../Auth/style.css";
import "../Auth/TutorSignup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Select from "react-select";

const TutorUpdate = () => {
  const token = localStorage.getItem("isLogged");

  if (token !== "2") {
    history.push("/tutor/login");
  }
  const history = useHistory();
  const data = subjectData;
  const [options, setOptions] = useState(subjectData);
  const [gender, setGender] = useState();
  const [district, setDistrct] = useState();
  const [level, setLevel] = useState([]);
  const [tagline, setTagline] = useState();
  const [bio, setBio] = useState();
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [status, setStatus] = useState();

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

  // const onSelect = (selectedList, selectedItem) => {
  //   if (!subjects.includes(selectedItem.subjectName.toLowerCase())) {
  //     subjects.push(selectedItem.subjectName.toLowerCase());
  //   }
  // };

  // const onRemove = (selectedList, selectedItem) => {
  //   if (subjects.includes(selectedItem.subjectName.toLowerCase())) {
  //     var index = subjects.indexOf(selectedItem.subjectName.toLowerCase());
  //     if (index !== -1) {
  //       subjects.splice(index, 1);
  //     }
  //   }
  // };

  useEffect(async () => {
    const res = await fetch("/tutors/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setGender(data.gender);
    setDistrct(data.address);
    setLevel(data.level);
    setTagline(data.tagline);
    setBio(data.bio);
    setSubjects(data.subjects);
    setName(data.name);
    setPrice(data.price);
    setStatus(data.status);

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

  console.log(options);

  const updateTutor = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !status ||
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
      console.log(
        status,
        price,
        gender,
        district,
        level,
        subjects,
        tagline,
        bio,
        name
      );
    } else {
      const res = await fetch("/tutors/me", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address: district,
          gender,
          level,
          subjects,
          tagline,
          bio,
          price,
          status,
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
        window.location.reload(false);
      }
    }
  };
  console.log("subjects: " + subjects);
  const selectedSubjects = (e) => {
    e.preventDefault();
    let newArray = [...subjects];
    if (newArray.includes(e.target.value)) {
      var index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1);
      }
    } else {
      newArray.push(e.target.value);
    }

    setSubjects(newArray);
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

      <Container style={{ marginTop: "10px", padding: "20px" }}>
        <Form onSubmit={updateTutor}>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              style={{ textTransform: "capitalize" }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              name="gender"
              value="male"
              label="Male"
              checked={gender === "male" ? true : false}
              defaultValue={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              name="gender"
              value="female"
              label="Female"
              checked={gender === "female" ? true : false}
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="radio"
              name="status"
              value="free"
              label="Free"
              checked={status === "free" ? true : false}
              // defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <Form.Check
              type="radio"
              name="status"
              value="busy"
              label="Busy"
              checked={status === "busy" ? true : false}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Select Your District</Form.Label>
            <select
              className="form-control"
              name="address"
              value={district}
              defaultValue={district}
              onChange={(e) => setDistrct(e.target.value)}
            >
              {districtData.map((option) => (
                <option value={option.value} key={option.key}>
                  {option.district}
                </option>
              ))}
            </select>
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
                  checked={level.includes(option.value) ? true : false}
                />
              </div>
            ))}
          </Form.Group>
          {/* <Dropdown /> */}
          <br />
          <Form.Group as={Col} controlId="formGridState">
            <div>
              <Form.Label>Select Your Subjects</Form.Label>
              <br />
              {options.map((option) => (
                <div key={option._id} className="mb-3">
                  <Form.Check
                    style={{ textTransform: "capitalize" }}
                    id={option._id}
                    label={option.subjectName}
                    value={option.value}
                    name="subject"
                    type={"checkbox"}
                    onChange={selectedSubjects}
                    checked={subjects.includes(option.value) ? true : false}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <br />

          <Form.Group as={Col} controlId="formGridState">
            <div>
              <Form.Label>Hourly Price</Form.Label>
              <Form.Control
                value={price}
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
              defaultValue={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Enter Your Short Bio</Form.Label>
            <Form.Control
              as="textarea"
              max={100}
              rows={3}
              defaultValue={bio}
              placeholder="This appers on search result for students... max:100 words only"
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>

      {/*  */}
    </div>
  );
};

export default TutorUpdate;
