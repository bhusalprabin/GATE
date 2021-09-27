import React from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import TopNavbar from "../../components/Navbar";
const About = () => {
  return (
    <div>
      <div className="normal-header">
        <TopNavbar />
        <h1>About Us</h1>
      </div>
      <div className="normal-page-main-content">
        <Container>
          <h1>Who we are ?</h1>
          <hr />
          <Row>
            <Col md={6} lg={3} style={{ padding: "10px" }}>
              <Card style={{ width: "17rem" }}>
                <Card.Img
                  variant="top"
                  src="https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/66105903_2342697562652866_1893298283602771968_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=ZdOnuADOoNwAX9DY1wy&_nc_ht=scontent.fktm8-1.fna&oh=8a9463c7490c1225447b00fd44da0c01&oe=61753501"
                />
                <Card.Body>
                  <Card.Title>Prabin Bhusal</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Link to="https://www.facebook.com/profile.php?id=100007379354862">
                    <Button variant="primary">See Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} style={{ padding: "10px" }}>
              <Card style={{ width: "17rem" }}>
                <Card.Img
                  variant="top"
                  src="https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/240431859_3065212427028293_6443746619658326069_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=J6icwys91yEAX9w6M6C&_nc_ht=scontent.fktm8-1.fna&oh=694b3d35ed0bf421bf5c0a514309f1a6&oe=6174A1C5"
                />
                <Card.Body>
                  <Card.Title>Pawan Kharel</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Link to="https://www.facebook.com/PbKharel97">
                    <Button variant="primary">See Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} style={{ padding: "10px" }}>
              <Card style={{ width: "17rem" }}>
                <Card.Img
                  variant="top"
                  src="https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/60310278_2834691043423520_9193101300626096128_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=KXKtAeBXwzkAX_vRWQh&tn=mrT6Bh25oKm2JuRL&_nc_ht=scontent.fktm8-1.fna&oh=e1351617de2efd937bc80be9777ab489&oe=6176DED9"
                />
                <Card.Body>
                  <Card.Title>Bigyan Luitel</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Link to="https://www.facebook.com/luitelbigyan">
                    <Button variant="primary">See Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} style={{ padding: "10px" }}>
              <Card style={{ width: "17rem" }}>
                <Card.Img
                  variant="top"
                  src="https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/158466342_253307416273827_227250315007962252_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_ohc=9A5pqUp8G2EAX_kX9Lb&_nc_ht=scontent.fktm8-1.fna&oh=f88d1c5f7424c9b6c6599a1c8bc6c3d3&oe=61755D4A"
                />
                <Card.Body>
                  <Card.Title>Avaya Poudel</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Link to="https://www.facebook.com/avaya.poudel.94">
                    <Button variant="primary">See Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default About;
