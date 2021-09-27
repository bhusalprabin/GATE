import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import TopNavbar from "../../components/Navbar";
import "./TutorDashboard.css";
import AddCourse from "./AddCourse";
import defaultImg from "../../assets/image/profile.jpeg";
import TutorUpdate from "./TutorUpdate";
import VerifyTutor from "./VerifyTutor";
import MainTutor from "./MainTutor";
import { GoVerified } from "react-icons/go";

const TutorDashboard = () => {
  const [userData, setUserData] = useState();
  const history = useHistory();
  console.log("hi");
  const callStudentDash = async () => {
    try {
      const resp = await fetch("/tutors/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();

      if (!resp.status === 200 || !data) {
        console.log("error on authentication");
        window.alert("Not Authenticated");
        history.push("/tutor/signin");
      } else if (resp.status === 201) {
        setUserData(data);
      }
    } catch (e) {
      console.log("error on authentication");
      window.alert("Not Authenticated");
      //   history.push("/tutor/signin");
    }
  };

  console.log(userData);

  console.log(userData);

  useEffect(() => {
    callStudentDash();
  }, [history]);

  return (
    <div className="tutor-dashboard">
      <div className="dash-nav">
        <TopNavbar />
      </div>

      <div className="tutor-dash-container">
        {userData ? (
          <Row>
            <Col md={4} className="tutor-dash-container-left">
              <div className="profile-img">
                <img
                  src={`data:image/png;base64,${userData.avatar}`}
                  alt="default-profile"
                />
              </div>
              <h1>
                {userData.name.toUpperCase()}
                <span>
                  {userData.verify === "true" ? (
                    <GoVerified
                      style={{ marginTop: "-10px", padding: "0 3px" }}
                    />
                  ) : (
                    <span></span>
                  )}
                </span>
              </h1>
              <p>{userData.tagline}</p>
              <p>
                <Link to="/tutor/dashboard/">Home</Link>
              </p>
              <p>
                <Link to="/tutor/dashboard/update">Update My Info</Link>
              </p>
              <p>
                <Link to="/tutor/dashboard/verify">Verification</Link>
              </p>
              <p>
                <Link to="/tutor/dashboard/add-subjects">
                  Request New Subjects
                </Link>
              </p>
              <p>
                <Link to="/user/logout">Logout</Link>
              </p>
            </Col>
            <Col md={8} className="tutor-dash-container-right">
              <Switch>
                <Route path="/tutor/dashboard" exact>
                  <MainTutor data={userData} />
                </Route>
                <Route path="/tutor/dashboard/update" exact>
                  <TutorUpdate />
                </Route>
                <Route path="/tutor/dashboard/verify" exact>
                  <VerifyTutor />
                </Route>
                <Route path="/tutor/dashboard/add-subjects" exact>
                  <AddCourse />
                </Route>
              </Switch>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={4} className="tutor-dash-container-left">
              <div className="profile-img">
                <img src={defaultImg} alt="default-profile" />
              </div>
              <h1>Name</h1>
              <p>Short Tagline</p>
              <p>
                <Link to="/tutor/signup/updateInfo">Update My Info</Link>
              </p>
            </Col>
            <Col md={8} className="tutor-dash-container-right">
              <p>You are not authorized</p>
              <Link to="/tutor/login">Login As A Tutor Now</Link>
            </Col>
          </Row>
        )}

        {/* <Row>
          <Col md={4} className="tutor-dash-container-left">
            <div className="profile-img">
              <img
                src={`data:image/png;base64,${userData.avatar}`}
                alt="default-profile"
              />
            </div>
            <h1>Name</h1>
            <p>Short Tagline</p>
            <p>
              <Link to="/tutor/signup/updateInfo">Update My Info</Link>
            </p>
          </Col>
          <Col md={8} className="tutor-dash-container-right">
            <p>How Many Students Enrolled You ?</p>
          </Col>
        </Row> */}
      </div>
    </div>
  );
};

export default TutorDashboard;
