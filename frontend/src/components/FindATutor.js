import React from "react";
import "./findAtutor.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import findATutor from "../assets/image/s.png";

const FindATutor = () => {
  return (
    <div className="findAtutor">
      <h1>Find a tutor</h1>

      <Row>
        <Col sm={12} md={6}>
          <div className="findAtutor-form">
            <Form>
              <Row>
                <Col sm={12} md={6}>
                  <Form.Control placeholder="Enter Subject" required />
                </Col>
                <Col sm={12} md={6}>
                  <Form.Control placeholder="Enter Location" required />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Gender: </Form.Label>
                    <Form.Check
                      inline
                      custom
                      type="radio"
                      id="male"
                      name="Gender"
                      label="Male"
                    />
                    <Form.Check
                      inline
                      custom
                      type="radio"
                      id="female"
                      name="Gender"
                      label="Female"
                    />
                    <Form.Check
                      inline
                      custom
                      type="radio"
                      id="both"
                      name="Gender"
                      label="Both"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Select Price Range</Form.Label>
                      <Form.Control as="select">
                        <option>Rs.100-900 per hour</option>
                        <option>Rs.1000-1900 per hour</option>
                        <option>Rs.2000-2900 per hour</option>
                        <option>Rs.3000-3900 per hour</option>
                        <option>Rs.4000-4900 per hour</option>
                      </Form.Control>
                    </Form.Group>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Search the Result
              </Button>
            </Form>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <img src={findATutor} alt="" className="findATutor-img" />
        </Col>
      </Row>
    </div>
  );
};

export default FindATutor;
