import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import TopNavbar from "../../components/Navbar";
import "./TutorDashboard.css";

import defaultImg from "../../assets/image/profile.jpeg";
import StudentUpdate from "./StudentUpdate";
import StudentChat from "./StudentChat";
import MainStudent from "./MainStudent";

const StudentDashboard = () => {
  const [userData, setUserData] = useState();
  const history = useHistory();
  const callStudentDash = async () => {
    try {
      const resp = await fetch("/students/dashboard", {
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
        history.push("/students/signin");
      } else if (resp.status === 200) {
        setUserData(data);
      }
    } catch (e) {
      console.log("error on authentication");
      history.push("/students/login");
    }
  };

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
              {userData.avatar ? (
                <div className="profile-img">
                  <img
                    src={`data:image/png;base64,${userData.avatar}`}
                    alt="default-profile"
                  />
                </div>
              ) : (
                <div className="profile-img">
                  <img src={defaultImg} alt="default-profile" />
                </div>
              )}

              <h1>{userData.name.toUpperCase()}</h1>
              <p>
                <Link to="/student/dashboard/">Home</Link>
              </p>
              <p>
                <Link to="/student/dashboard/update">Update My Info</Link>
              </p>
              <p>
                <Link to="/student/dashboard/chatwithadmin">
                  Chat with Admin
                </Link>
              </p>
              <p>
                <Link to="/user/logout">Logout</Link>
              </p>
            </Col>
            <Col md={8} className="tutor-dash-container-right">
              <Switch>
                <Route path="/student/dashboard" exact>
                  <MainStudent data={userData} />
                </Route>
                <Route path="/student/dashboard/update" exact>
                  <StudentUpdate />
                </Route>
                <Route path="/student/dashboard/chatwithadmin" exact>
                  <StudentChat name={userData.name} />
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
            </Col>
            <Col md={8} className="tutor-dash-container-right">
              <p>You are not authorized</p>
              <Link to="/students/login">Login As A Student Now</Link>
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

export default StudentDashboard;
