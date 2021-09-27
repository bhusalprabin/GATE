import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { MdDashboard, MdVerifiedUser, MdLibraryBooks } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate, FaHireAHelper, FaRocketchat } from "react-icons/fa";

import "./Admin.css";
import Dashboard from "../../components/Admin/Dashboard";
import Tutors from "../../components/Admin/Tutors";
import Profile from "../../components/Admin/Profile";
import Students from "../../components/Admin/Students";
import Hired from "../../components/Admin/Hired";
import Verify from "../../components/Admin/Verify";
import Subjects from "../../components/Admin/Subjects";
import Chat from "../../components/Admin/Chat";
const Admin = () => {
  const location = useLocation();
  const path = location.pathname;
  const [adminData, setAdminData] = useState();
  const history = useHistory();
  const adminDash = async () => {
    try {
      const resp = await fetch("/admin/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      if (resp.status === 401 || !data) {
        console.log("error on authentication");
        history.push("/admin/login");
      } else if (resp.status === 200) {
        setAdminData(data);
      }
    } catch (e) {
      console.log("error on authentication");
      history.push("/admin/login");
    }
  };

  console.log(adminData);

  useEffect(() => {
    adminDash();
  }, [history]);
  return (
    <div className="admin">
      <div className="admin-topBar">
        <div className="admin-topBar-img">
          <Link to="/">
            <img src={logo} alt="admin" />
          </Link>
        </div>
        <div className="admin-topBar-txt">
          <Link to="/user/logout">
            <button>Logout</button>
          </Link>
        </div>
      </div>
      <div className="admin-main">
        <Container fluid>
          <Row>
            <Col className="admin-main-left">
              <ul>
                <Link to="/admin">
                  <li className={path === "/admin" ? "active-nav" : ""}>
                    <span>
                      <MdDashboard />
                    </span>
                    Dashboard
                  </li>
                </Link>

                <Link to="/admin/tutors">
                  <li className={path === "/admin/tutors" ? "active-nav" : ""}>
                    <span>
                      <GiTeacher />
                    </span>
                    Tutors
                  </li>
                </Link>

                <Link to="/admin/students">
                  <li
                    className={path === "/admin/students" ? "active-nav" : ""}
                  >
                    <span>
                      <FaUserGraduate />
                    </span>
                    Students
                  </li>
                </Link>

                <Link to="/admin/hiring-info">
                  <li
                    className={
                      path === "/admin/hiring-info" ? "active-nav" : ""
                    }
                  >
                    <span>
                      <FaHireAHelper />
                    </span>
                    Total Hired
                  </li>
                </Link>
                <Link to="/admin/verify-tutors">
                  <li
                    className={
                      path === "/admin/verify-tutors" ? "active-nav" : ""
                    }
                  >
                    <span>
                      <MdVerifiedUser />
                    </span>
                    Verify Request
                  </li>
                </Link>
                <Link to="/admin/subjects">
                  <li
                    className={path === "/admin/subjects" ? "active-nav" : ""}
                  >
                    <span>
                      <MdLibraryBooks />
                    </span>
                    Subjects
                  </li>
                </Link>
                <Link to="/admin/chat">
                  <li className={path === "/admin/chat" ? "active-nav" : ""}>
                    <span>
                      <FaRocketchat />
                    </span>
                    Chat
                  </li>
                </Link>
              </ul>
            </Col>
            <Col md={10} className="admin-right">
              <Switch>
                <Route path="/admin" exact>
                  <Dashboard />
                </Route>
                <Route path="/admin/tutors" exact>
                  <Tutors />
                </Route>
                <Route path="/admin/profile/">
                  <Profile />
                </Route>
                <Route path="/admin/students" exact>
                  <Students />
                </Route>
                <Route path="/admin/hiring-info" exact>
                  <Hired />
                </Route>
                <Route path="/admin/verify-tutors" exact>
                  <Verify />
                </Route>
                <Route path="/admin/subjects" exact>
                  <Subjects />
                </Route>
                <Route path="/admin/chat" exact>
                  <Chat />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Admin;
