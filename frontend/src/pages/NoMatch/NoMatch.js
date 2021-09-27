import React from "react";
import { Link } from "react-router-dom";
import errorPage from "../../assets/image/error-page.png";
import "./NoMatch.css";

const NoMatch = () => {
  return (
    <div className="errorPage-container">
      <div className="errorpage-img">
        <img src={errorPage} alt="error" />
      </div>
      <div className="errorPage-content">
        <h1>Oops!</h1>
        <h5>We can't seem to find the page you are looking for...</h5>
        <p>Here are some helpful links instead:</p>
        <p>
          <Link to="/">Homepage</Link>
          <Link to="/search">Search Tutor</Link>
          <Link to="/students/login">Login/Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default NoMatch;
