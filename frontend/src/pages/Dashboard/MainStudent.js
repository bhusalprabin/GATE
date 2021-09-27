import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
const MainStudent = ({ data }) => {
  const [email, setEmail] = useState(data.email);
  const [course, setCourse] = useState();
  const [rate, setRate] = useState(1);
  const [ratingData, setRatingData] = useState();
  console.log("email is " + email);

  useEffect(async () => {
    // callRating();
    const res = await fetch("/find/my/course", {
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
      setCourse(data1.data);
      setRatingData(data1.ratingInfo);
    }
  }, [rate]);

  const changeRate = async (e, index) => {
    console.log(e, index);
    const tutor = course[index].tutor;
    const student = course[index].student;
    console.log(tutor);
    const rp = fetch("/change/rating", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        rate: e,
        tutor: tutor,
        student: student,
      }),
    });

    window.location.reload(false);
  };
  console.log("rate is = " + rate);

  return (
    <div>
      {course ? (
        <Container>
          <Row>
            {course.map((c, index) => (
              <Col md={6} lg={4} style={{ padding: "20px" }} key={index}>
                <Card style={{ width: "16rem" }}>
                  <Card.Img
                    style={{ height: "250px" }}
                    variant="top"
                    src={`data:image/png;base64,${c.avatar}`}
                  />

                  <Card.Body>
                    <Card.Title
                      style={{ textTransform: "capitalize", fontSize: "16px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Subject: </span>
                      {c.subjectName}
                    </Card.Title>
                    <Card.Title style={{ fontSize: "13px" }}>
                      <span style={{ fontWeight: "bold" }}>Tutor: </span>
                      {c.tutor}
                    </Card.Title>
                    {ratingData ? (
                      <StarRatings
                        rating={ratingData[index]}
                        starDimension="20px"
                        changeRating={(e) => changeRate(e, index)}
                        starSpacing="5px"
                      />
                    ) : (
                      <StarRatings
                        rating={2.5}
                        starDimension="20px"
                        changeRating={(e) => changeRate(e, index)}
                        starSpacing="5px"
                      />
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <h5>Hire Tutor Now</h5>
      )}
    </div>
  );
};

export default MainStudent;
