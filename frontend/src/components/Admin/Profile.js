import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import defaultProfile from "../../assets/image/profile.jpeg";
const Profile = () => {
  const location = useLocation();
  const [profileData, setProfileData] = useState();
  const parsedQuery = queryString.parse(location.search);
  const user = parsedQuery.user;
  const id = parsedQuery.id;

  const fetchedData = async () => {
    if (user === "tutor") {
      const res = await fetch(
        "/admin/tutors-profile?" +
          new URLSearchParams({
            _id: id,
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
      console.log(data);
      if (data && res.status === 200) {
        setProfileData(data);
      }
    } else if (user === "student") {
      const res = await fetch(
        "/admin/student-profile?" +
          new URLSearchParams({
            _id: id,
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
      console.log(data);
      if (data && res.status === 200) {
        setProfileData(data);
      }
    }
  };

  useEffect(() => {
    fetchedData();
  }, [location]);

  return (
    <div>
      {!profileData ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>No data found</p>
      ) : (
        <>
          <h1 className="admin-dash-heading1">
            {profileData.name} ({user})
          </h1>
          <div className="admin-profile-main">
            <Container>
              <Row>
                <Col md={8} className="admin-profile-content">
                  <h4>
                    <span>Name: </span>
                    {profileData.name}
                  </h4>
                  <br />
                  <h4>
                    <span>Email: </span>
                    {profileData.email}
                  </h4>
                  <br />
                  <h4>
                    <span>Mobile No: </span>
                    {profileData.phone}
                  </h4>
                  <br />
                  <h4>
                    <span>Gender: </span>
                    {profileData.gender}
                  </h4>
                  <br />
                  <h4>
                    <span>Address: </span>
                    {profileData.address}
                  </h4>

                  {user === "tutor" ? (
                    <>
                      <br />
                      <h4>
                        <span>Level To Teach: </span>
                        {profileData.level.join()}
                      </h4>
                      <br />
                      <h4>
                        <span>Subjects: </span>
                        {profileData.subjects.join()}
                      </h4>
                      <br />
                    </>
                  ) : (
                    <>
                      <br />
                    </>
                  )}

                  <h4>
                    <span>Joined: </span>
                    {profileData.createdAt}
                  </h4>
                  <br />
                </Col>
                <Col className="admin-profile-img">
                  {!profileData.avatar ? (
                    <img src={defaultProfile} alt="profile" />
                  ) : (
                    <img
                      src={`data:image/png;base64,${profileData.avatar}`}
                      alt="profile"
                    />
                  )}
                </Col>
              </Row>
              <Link to={`/admin/${user}s/`}>
                <p className="admin-profile-goback">Go back</p>
              </Link>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
