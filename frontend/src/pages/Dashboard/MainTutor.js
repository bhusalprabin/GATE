import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button, Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
const MainTutor = ({ data }) => {
  const [email, setEmail] = useState(data.email);
  const [course, setCourse] = useState();

  useEffect(async () => {
    // callRating();
    const res = await fetch("/find/my/course/tutor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
      }),
    });
    const data1 = await res.json();
    console.log(data1);
    if (data && res.status === 200) {
      setCourse(data1);
    }
  }, []);

  let nonapprovecourse = !course
    ? []
    : course.filter((f) => f.approveByTutor === "false");

  console.log(nonapprovecourse);

  let approveCourse = !course
    ? []
    : course.filter((f) => f.approveByTutor === "true");

  const approveStudent = async (id, email) => {
    const res = await fetch("/approve/new/student", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: id,
        student: email,
      }),
    });
    const data1 = await res.json();
    if (res.status === 200) {
      window.location.reload(false);
    }
  };

  const declineStudent = async (id, email) => {
    const res = await fetch("/decline/new/student", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: id,
        student: email,
      }),
    });
    const data1 = await res.json();
    if (res.status === 200) {
      window.location.reload(false);
    }
  };

  return (
    <div>
      {nonapprovecourse && nonapprovecourse.length != 0 ? (
        <div>
          <h3>Approve New Students</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {nonapprovecourse.map((t, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{t.student}</td>
                  <td>{t.subjectName}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => approveStudent(t._id, t.student)}
                    >
                      Approve
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => declineStudent(t._id, t.student)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p></p>
      )}
      {course && approveCourse.length !== 0 ? (
        <Container>
          <Row>
            {approveCourse.map((c, index) => (
              <Col md={6} lg={4} style={{ padding: "20px" }} key={index}>
                <Card style={{ width: "16rem" }}>
                  <Card.Body>
                    <Card.Title
                      style={{ textTransform: "capitalize", fontSize: "16px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Subject: </span>
                      {c.subjectName}
                    </Card.Title>
                    <Card.Title style={{ fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>Student: </span>
                      {c.student}
                    </Card.Title>
                    <hr />
                    <Card.Title style={{ fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>Hired Date: </span>
                      {c.startDate}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <h5>No one hired you</h5>
      )}
    </div>
  );
};

export default MainTutor;
