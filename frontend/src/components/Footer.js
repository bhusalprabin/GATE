import React from "react";
import "../pages/HomePage/HomePage.css";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/image/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <section className="homepage-footer">
        <div className="main-footer">
          <Container>
            <Row>
              <Col xs={12} md={4} lg={4} className="homepage-footer-left">
                <img src={logo} alt="gate" />
                <p>Get a tutor easily</p>
              </Col>
              <Col xs={12} md={4} lg={4} className="homepage-footer-middle">
                <h3>Contact Us</h3>
                <p>Kathmandu,Nepal</p>
                <p>
                  <a href="tel:9800000000">9861389963</a>
                </p>
                <p>
                  <a href="mailto: gate@gmail.com">gate@gmail.com</a>
                </p>
              </Col>
              <Col xs={12} md={4} lg={4} className="homepage-footer-right">
                <h3>Quick Links</h3>
                <Row>
                  <Col>
                    <p>
                      <Link to="/">Home</Link>
                    </p>
                    <p>
                      <Link to="/about">About</Link>
                    </p>

                    <p>
                      <Link to="/search">Search Tutors</Link>
                    </p>
                  </Col>
                  <Col>
                    <p>
                      <Link to="/privacy">Privacy & Policy</Link>
                    </p>
                    <p>
                      <Link to="/students/login">Signin</Link>
                    </p>
                    <p>
                      <Link to="/tutor/signup">Become A Tutors</Link>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="copyright-footer">
          &copy;2021{"  "}
          <a
            href="https://www.helloprogrammers.com"
            target="_blank"
            rel="noreferrer"
          >
            HelloProgrammers
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer;
