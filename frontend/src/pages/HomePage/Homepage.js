import React from "react";
import TopNavbar from "../../components/Navbar";
import {
  Container,
  Row,
  Carousel,
  Accordion,
  Card,
  Form,
} from "react-bootstrap";
import CountUp from "react-countup";
import { AiFillStar } from "react-icons/ai";
import pm from "../../assets/image/pm.jpg";
import pawan from "../../assets/image/pawan.jpg";
import bigyan from "../../assets/image/bigyan.jpg";
import vid from "../../assets/videos/vid.mp4";
import Footer from "../../components/Footer";
import { Link, NavLink } from "react-router-dom";
import "./HomePage.css";
import { useState, useEffect } from "react";
import districtData from "../../assets/data/district.json";
import subjectData from "../../assets/data/subject.json";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const [options, setOptions] = useState(subjectData);
  const history = useHistory();
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const faq = [
    {
      id: 1,
      q: " Why GATE?",
      a: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.",
    },
    {
      id: 2,
      q: " Why GATE?",
      a: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.",
    },
  ];

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

  const submitSearch = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/searchpage",
      search: "?" + "subject=" + subject + "&location=" + location + "&level=",
      state: { detail: [location, subject] },
    });
  };
  return (
    <>
      <div className="homepage-header">
        <TopNavbar />
        <div className="homepage-header-content">
          <h1>Hire The Right Tutor Now!</h1>
          <form
            action=""
            className="homepage-header-form"
            onSubmit={submitSearch}
          >
            <select
              style={{ textTransform: "capitalize" }}
              name="subjects"
              id="subjects"
              value={subject}
              placeholder="Choose Subjects"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>Choose Subject</option>
              {options.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.subjectName}
                </option>
              ))}
            </select>
            <select
              name="district"
              id="district"
              value={location}
              placeholder="Choose District"
              onChange={(e) => setLocation(e.target.value)}
            >
              {districtData.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.district}
                </option>
              ))}
            </select>
            <div className="homepage-header-form-btn">
              <button type="submit">Search</button>
            </div>
          </form>

          <p>
            Want to become a Tutor?
            <span>
              <Link to="/tutor/signup">Sign Up Now</Link>
            </span>
          </p>
        </div>
      </div>

      <section className="hero">
        <Container className="hero-container">
          <Row>
            <div className="col-sm hero-vid-out">
              <div className="hero-star-box1">
                <AiFillStar className="star1" />
                <AiFillStar className="star2" />
                <AiFillStar className="star3" />
              </div>
              <div className="hero-vid">
                <div className="hero-vid-icon-box">
                  <i
                    className="fas fa-play-circle"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  ></i>
                </div>
              </div>
            </div>
            <div className="col-sm hero-cont">
              <h2>
                Find Your <span>Perfect Tutors</span> And enjoy learning
              </h2>
              <p>
                Are you looking for organised, professional and qualified tutor
                across Nepal ? Then, yes you are in right place.We provide a
                service as a middleware between tutors and students.
              </p>
            </div>
          </Row>
        </Container>
      </section>

      {/* vid model */}
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <video width="100%" controls loop>
                <source src={vid} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div>
          </div>
        </div>
      </div>
      {/* vid model ends */}

      <section className="counter">
        <div className="counter-icon-content">
          <div className="container">
            <div className="row">
              <div className="col-sm counter-box">
                <div className="icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <div className="icon-content">
                    <h5>
                      <CountUp end={1200} duration={5} />
                    </h5>
                    <p>Total Tutors</p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="icon">
                  <i className="fas fa-briefcase"></i>
                  <div className="icon-content">
                    <h5>
                      <CountUp end={53} duration={5} />
                    </h5>
                    <p>Tutors Jobs</p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="icon">
                  <i className="fas fa-user-graduate"></i>
                  <div className="icon-content">
                    <h5>
                      <CountUp end={1200} duration={5} />
                    </h5>
                    <p>Total Students</p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="icon">
                  <i className="far fa-smile"></i>
                  <div className="icon-content">
                    <h5>
                      {" "}
                      <CountUp
                        end={4.5}
                        duration={5}
                        decimals={1}
                        decimal="."
                        separator=" "
                      />
                      /5
                    </h5>
                    <p>Tutors Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how to do section */}
      <section className="how-to-do">
        <div className="how-to-do-container container">
          <h1>Getting help is easier than you think</h1>

          <div className="how-to-do-grid">
            <div className="container">
              <div className="row">
                <div className="col-sm how-to-do-col">
                  <div className="arrow1">
                    <i className="fas fa-arrow-alt-circle-right"></i>
                  </div>
                  <div className="how-to-do-icon-box">1</div>
                  <div className="how-to-do-content">
                    <h4>TELL US WHERE YOU’RE STRUGGLING</h4>
                    <p>
                      Connect with experts in more than 300 skills and subjects.
                    </p>
                  </div>
                </div>
                <div className="col-sm how-to-do-col">
                  <div className="arrow2">
                    <i className="fas fa-arrow-alt-circle-right"></i>
                  </div>
                  <div className="how-to-do-icon-box">2</div>
                  <div className="how-to-do-content">
                    <h4>CHOOSE THE TUTOR YOU WANT</h4>
                    <p>
                      Search online for a tutor with the right qualifications
                      and hourly rates.
                    </p>
                  </div>
                </div>
                <div className="col-sm how-to-do-col">
                  <div className="how-to-do-icon-box">3</div>
                  <div className="how-to-do-content">
                    <h4>BOOK YOUR LESSON</h4>
                    <p>
                      Tell your tutor when you’d like to meet, and only pay for
                      the time you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/search">
            <button>Hire a Tutor</button>
          </Link>
          <p>Learn more about our procedure of hiring tutors</p>
        </div>
      </section>

      {/* course category */}
      <section className="course-category">
        <h1>Learning something new today</h1>
        <p>Choose from over 100 subject</p>
        <div className="course-category-grid">
          <div className="container">
            <div className="row">
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h6>Computer Science</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-rocket"></i>
                </div>
                <h6>Engineering</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-atom"></i>
                </div>
                {/* <h6>
                  <Link to="/search/chemistry">Chemistry</Link>
                </h6> */}
                <h6>Chemistry</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-bacteria"></i>
                </div>
                <h6>Zoology</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-seedling"></i>
                </div>
                <h6>Botany</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="far fa-edit"></i>
                </div>
                <h6>Test Preparation</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-brain"></i>
                </div>
                <h6>Humanities</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-school"></i>
                </div>
                <h6>School Level</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-landmark"></i>
                </div>
                <h6>Loksewa Preparation</h6>
              </div>
              <div className="col-sm sub">
                <div className="sub-container">
                  <i className="fas fa-plane-departure"></i>
                </div>
                <h6>Foriegn Language</h6>
              </div>
            </div>
          </div>
        </div>
        <h6>
          <Link to="/search">Click here to access more subjects/courses.</Link>
        </h6>
      </section>

      {/* what user says testimonials */}
      <section className="what-user-say">
        <h1>What students say about our tutors</h1>
        <p>
          But don’t take our word for it, see what students and tutors who use
          our site have said...
        </p>
        <Carousel className="testimonial-container">
          <Carousel.Item className="testimonial-container-item">
            <img className="testimonial-img" src={pm} alt="First slide" />
            <h3>Prabin Bhusal</h3>
            <p>
              Patient and funny. He really knows how to make biology somewhat
              fun.
            </p>
          </Carousel.Item>
          <Carousel.Item className="testimonial-container-item">
            <img className="testimonial-img" src={pawan} alt="Second slide" />

            <h3>Pawan Kharel</h3>
            <p>
              Patient and funny. He really knows how to make biology somewhat
              fun.
            </p>
          </Carousel.Item>
          <Carousel.Item className="testimonial-container-item">
            <img className="testimonial-img" src={bigyan} alt="Third slide" />

            <h3>Bigyan Luitel</h3>
            <p>
              Patient and funny. He really knows how to make biology somewhat
              fun.
            </p>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* registration */}
      <section className="registration">
        <h1>Join Us Today</h1>
        <p>Join our community of thousands of students and tutors</p>
        <div className="registration-grid container">
          <div className="container">
            <div className="row">
              <div className="col-sm reg registration-student">
                <p>Become a</p>
                <h2>Student</h2>
                <ul>
                  <li>Learn any subject, at any level, wherever you are</li>
                  <li>Learn any subject, at any level, wherever you are</li>
                  <li>Learn any subject, at any level, wherever you are</li>
                  <li>Learn any subject, at any level, wherever you are</li>
                </ul>
                <Link to="/students/signup">
                  <button>Signup</button>
                </Link>
              </div>
              <div className="col-sm reg registration-tutor">
                <p>Become a</p>
                <h2>Tutor</h2>
                <ul>
                  <li>Learn any subject, at any level, wherever you are</li>
                  <li>Learn any subject, at any level, wherever you are</li>
                  <li>Learn any subject, at any level, wherever you are</li>
                  <li>Learn any subject, at any level, wherever you are</li>
                </ul>
                <Link to="/tutor/signup">
                  <button>Register</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* faq starts */}
      <section className="faq">
        <h1>Frequently Asked Questions</h1>
        <p>Clear your curosity reagrding GATE now!</p>
        <Container>
          <Accordion defaultActiveKey="1">
            {faq.map((f) => {
              return (
                <Card key={f.id}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={f.id}
                    className="faq-header"
                  >
                    {f.q}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={f.id}>
                    <Card.Body>{f.a}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </Container>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
};

export default HomePage;
