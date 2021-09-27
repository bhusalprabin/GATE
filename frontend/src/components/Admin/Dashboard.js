import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Bar, Doughnut } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  const [numberOfUser, setNumber] = useState();
  const [user, setUser] = useState();
  const [gender, setGender] = useState();

  const getData = async () => {
    const res = await fetch("/getalldata", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data && res.status === 200) {
      setNumber(data.number);
      setGender(data.gender);
      setUser(data.user);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const data1 = {
    labels: ["Last 90 Days", "Last 30 Days", "Today"],
    datasets: [
      {
        label: "Number of Users",
        data: numberOfUser,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const data2 = {
    labels: ["Student", "Tutors"],
    datasets: [
      {
        label: "Students vs Tutors",
        data: user,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          ,
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: ["Male", "Female", "undefined"],
    datasets: [
      {
        label: "Male vs Female",
        data: gender,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          ,
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dash">
      <h1 className="admin-dash-heading">GATE's DASHBOARD</h1>
      <h2>Total Engagement</h2>
      <div className="bar-conatiner">
        <Bar
          data={data1}
          height="80"
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </div>
      <br />
      <hr />
      <div>
        <h2>Student vs Tutors</h2>
        <Container>
          <Row>
            <Col className="doughnt-container-left">
              {user ? (
                <>
                  <p>Total Tutors: {user[1]}</p>
                  <p>Total Students: {user[0]}</p>
                </>
              ) : (
                <span></span>
              )}
            </Col>
            <Col className="doughnt-container">
              <Doughnut data={data2} className="doughnt-admin" />
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
      <div>
        <h2>Male vs Female Users</h2>
        <Container>
          <Row>
            <Col className="doughnt-container-left">
              {gender ? (
                <>
                  <p>Total Male: {gender[0]}</p>
                  <p>Total Female: {gender[1]}</p>
                  <p>Undefined: {gender[2]}</p>
                </>
              ) : (
                <span></span>
              )}
            </Col>
            <Col className="doughnt-container">
              <Doughnut data={data3} className="doughnt-admin" />
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;
