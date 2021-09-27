import React from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import TopNav from "../../components/Navbar";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import districtData from "../../assets/data/district.json";
import subjectData from "../../assets/data/subject.json";
import { GoVerified } from "react-icons/go";
import "./SearchPage.css";
import pm from "../../assets/image/profile.jpeg";
const MainSearch = () => {
  const location = useLocation();
  const [district, setDistrict] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState();
  const [gender, setGender] = useState("");
  const [emailName, setEmailName] = useState("");
  const data = subjectData;
  const [options, setOptions] = useState(data);
  const [subjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [verify, setVerify] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const onSelect = (selectedList, selectedItem) => {
    if (!subjects.includes(selectedItem.subjectName.toLowerCase())) {
      subjects.push(selectedItem.subjectName.toLowerCase());
    }
  };

  useEffect(async () => {
    const parsedQuery = queryString.parse(location.search);
    setDistrict(parsedQuery.location);
    setLevel(parsedQuery.level);
    setSubject(parsedQuery.subject);

    const res1 = await fetch("/subjects", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data1 = await res1.json();
    setOptions(data1);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/tutors/filtered?" +
          new URLSearchParams({
            subject: subject,
            location: district,
            level: level,
            gender: gender,
            price: price,
            status: status,
            verify: verify,
          }),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status === 200 || data) {
        setFilteredData(data);
        setLoading(true);
      } else {
        console.log("error");
      }
    };
    fetchData();
  }, [district, subject, level, price, gender, status, verify]);

  return (
    <div>
      <div className="mainsearch-header">
        <TopNav />
        <div className="mainsearch-header-container">
          <Container>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridState1">
                  <Form.Control
                    value={subject}
                    as="select"
                    placeholder="Choose Subject"
                    // defaultValue="all"
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    {options.map((option) => (
                      <option value={option.value} key={option.id}>
                        {option.subjectName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState2">
                  <Form.Control
                    value={district}
                    as="select"
                    placeholder="Choose District"
                    // defaultValue="all"
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    {districtData.map((option) => (
                      <option value={option.value} key={option.id}>
                        {option.district}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState3">
                  <Form.Control
                    as="select"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    readOnly={false}
                  >
                    <option value="school">School</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelor">Bachelor</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </Container>
        </div>
      </div>

      <div className="container mainsearch-content">
        <Row>
          <Col md={4} sm={12}>
            {/* <h3>Filter</h3> */}

            {/* <Form.Label>Range</Form.Label>
            <Form.Range /> */}
            <div
              className="card"
              style={{ padding: "10px", marginBottom: "20px" }}
            >
              <div className="form-group">
                <label>Gender</label>
                <br />
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male" ? true : false}
                  onChange={(e) => setGender(e.target.value)}
                />
                &nbsp;Male &nbsp;&nbsp;
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female" ? true : false}
                  onChange={(e) => setGender(e.target.value)}
                />
                &nbsp;Female &nbsp;&nbsp;
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={gender === "" ? true : false}
                  onChange={(e) => setGender(e.target.value)}
                />
                &nbsp;All
              </div>
              <div className="form-group">
                <label for="customRange3" class="form-label">
                  Set Price Range
                </label>
                <br />
                <input
                  type="range"
                  class="form-range"
                  min="100"
                  max="2000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="customRange3"
                ></input>
              </div>
              <div className="form-group">
                <label>Status</label>
                <br />
                <input
                  type="radio"
                  name="status"
                  value="free"
                  checked={status === "free" ? true : false}
                  onChange={(e) => setStatus(e.target.value)}
                />
                &nbsp;Free &nbsp;&nbsp;
                <input
                  type="radio"
                  name="status"
                  value="busy"
                  checked={status === "busy" ? true : false}
                  onChange={(e) => setStatus(e.target.value)}
                />
                &nbsp;Busy &nbsp;&nbsp;
                <input
                  type="radio"
                  name="status"
                  value=""
                  checked={status === "" ? true : false}
                  onChange={(e) => setStatus(e.target.value)}
                />
                &nbsp;All
              </div>

              <div className="form-group">
                <label>Verify</label>
                <br />
                <input
                  type="radio"
                  name="verify"
                  value="true"
                  checked={verify === "true" ? true : false}
                  onChange={(e) => setVerify(e.target.value)}
                />
                &nbsp;Verified &nbsp;&nbsp;
                <input
                  type="radio"
                  name="verify"
                  value=""
                  checked={verify === "" ? true : false}
                  onChange={(e) => setVerify(e.target.value)}
                />
                &nbsp;All
              </div>
            </div>
          </Col>
          <Col md={8} sm={12} className="searchpage-container-data">
            {loading ? (
              filteredData.length === 0 ? (
                <h1 className="nodatafound-searchpage">
                  Sorry!!! No data found
                </h1>
              ) : (
                filteredData.map((d) => (
                  <div key={d._id} className="searchpage-card">
                    <div className="searchpage-card-img">
                      <img
                        src={
                          d.avatar ? `data:image/png;base64,${d.avatar}` : pm
                        }
                        alt="profile"
                      />
                    </div>
                    <div className="searchpage-side-content">
                      <p
                        className="searchpage-name"
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        {d.name}
                        <span>
                          {d.verify === "true" ? (
                            <GoVerified
                              style={{ marginTop: "-8px", padding: "0 3px" }}
                            />
                          ) : (
                            <span></span>
                          )}
                        </span>
                        {/* <div
                          className={
                            d.status === "busy"
                              ? "tutor-status-busy"
                              : "tutor-status-free"
                          }
                        /> */}
                      </p>
                      <p className="searchpage-tagline">{d.tagline}</p>
                      <p className="searchpage-bio">
                        {d.bio ? d.bio.slice(0, 150) + "..." : ""}
                      </p>
                      <p className="searchpage-price">
                        Rs.{d.price} <span>/hour</span>
                      </p>
                      {/* <button className="searchpage-hrs-button">
                        <StarRatings
                          rating={2.403}
                          starRatedColor="#d10d00"
                          starDimension="10px"
                          starSpacing="2px"
                          starEmptyColor="#fe584c"
                        />
                      </button> */}
                      <Link
                        to={
                          `/tutor?id=` + d.email.slice(0, d.email.indexOf("@"))
                        }
                      >
                        <button className="searchpage-profile-button">
                          View Profile
                        </button>
                      </Link>
                      {/* <Link to="/">
                        <button className="searchpage-profile-button1">
                          Instant Book
                        </button>
                      </Link> */}
                    </div>
                  </div>
                ))
              )
            ) : (
              <Spinner animation="grow" />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainSearch;
