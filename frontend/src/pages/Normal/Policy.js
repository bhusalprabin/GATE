import React from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import TopNavbar from "../../components/Navbar";
const Policy = () => {
  return (
    <div>
      <div className="normal-header">
        <TopNavbar />
        <h1>About Us</h1>
      </div>
      <Container className="privacy-page-main">
        <div className="normal-page-main-content">
          <h1>Our Policies</h1>
          <h3>Terms of Services:</h3>
          <p>Namaste,</p>
          <p>Welcome to GATE!</p>
          <hr style={{ width: "100%" }} />
          <p>
            As the world is turning into narrow territory, with intent to serve
            better communication and oppurtunities, here we set up the GATE fo
            all of us. GATE helps us to stay connected with otutors and
            students, and is the best platform for tutoring. It also keeps up to
            date with new tutoring culture. It is indispensable to know your
            comfort when you make use of GATE. We appeal you to read the terms
            and conditions so that you can built ideas about information we hold
            for meaningful purposes.
          </p>
        </div>

        <ul>
          <li>
            We don't interfair on your actions/conduct/content though you access
            from our service.
          </li>
          <li>
            We never disclose any of the content of your important informations.
          </li>
          <li>
            Your personal data will remain safe. We don't provide information
            that directly identifies you.
          </li>
          <li>
            We don't claim it will function all the hours and is totally safe
            and secure. Any unlawful incidence that occur in the service , we
            are responsible to the action authorized by law.
          </li>
          <li>
            Tutor might be invited to visit our office if required withing 3
            months of registrtion.
          </li>
          <li>
            We may keep on updating terms and conditions for that you will be
            notifies.
          </li>
        </ul>
        <hr />
        <h3>Further Privilege We Retain:</h3>
        <ul>
          <li>
            Selection of similar qualifications may be changed if we find it
            scam.
          </li>
          <li>
            Can only use trademarks or similat marks as expressly permitted by
            brand guidelines or with our prior written permission.
          </li>
          <li>
            Must obtain written permission from us to modify, create derivative
            works of or othendse attempt to extract source code from us.
          </li>
        </ul>
        <hr />
        <h3>Your Commitments</h3>
        <p>
          In consideration of our services, we want you to make following
          commitements towards us
        </p>
        <ul>
          <li>Minimum legal age to use GATE should be 13.</li>
          <li>
            You musn't ignore from receiving any aspect of our service under
            applicable laws or payment related services.
          </li>
          <li>
            We must have previously disabled your account for violation of law.
          </li>
        </ul>
        <hr />
        <h3>How You Can't Use GATE :</h3>
        <p>Serving safe and sound service is the only intention behind it.</p>
        <ul>
          <li>
            Any fraudulent or illigal or unlawful activities can't be performed.
          </li>
          <li>Encouraging others for violation of rules are prohibited.</li>
          <li>Inaccurate informations are rejected.</li>
          <li>
            Can't perform information anything that interfere with or impair the
            intended operation of the service.
          </li>
        </ul>
        <h3>Updating These Terms :</h3>
        <p>
          Services and policies are dynamic and need to make changes so that
          users can clearly have ideas about the terms and conditions . We will
          notify you before we make changes to the terms and conditions. We
          provide you an oppurtunity to review them before they get into action.
        </p>
        <h3>Who's Rights Under this Agreement : </h3>
        <ul>
          <li>- No interference of 3rd parties.</li>
          <li>
            - No transferable of your rights and obligation without our consent.
          </li>
          <li>- Our rights and obligation can be assigned to others.</li>
        </ul>
      </Container>

      <Footer />
    </div>
  );
};

export default Policy;
