import React from "react";
import "./MainPage.css";
import pm from "../../assets/image/pm.jpg";

import Footer from "../../components/Footer";

const tutors = [
  {
    name: "Prabin Bhusal",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
  {
    name: "Pawan Kharel",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
  {
    name: "Bigyan Luitel",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
  {
    name: "Prabin Thapa",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
  {
    name: "Prabin Thapa",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
  {
    name: "Prabin Thapa",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
  {
    name: "Prabin Thapa",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
  {
    name: "Prabin Thapa",
    id: "123323",
    about: "hello i am prabin bhusal i am studying in class 14",
    imageLink: "pm",
  },
];

const HomePage = () => {
  return (
    <>
      <section className="featured-course">
        <h1 className="sectionTitle">Recommended Tutors</h1>
        <div class="d-flex flex-row flex-nowrap overflow-auto horizontal-scrollable container-fluid">
          {tutors.map((tutor) => {
            return (
              <div class="card card-block mx-2 ">
                <img class="card-img-top" src={pm} alt="Card cap" />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="/search" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="tutors-near-you">
        <h1 className="sectionTitle">Tutors Near You</h1>
        <div class="d-flex flex-row flex-nowrap overflow-auto horizontal-scrollable container-fluid">
          {tutors.map((tutor) => {
            return (
              <div class="card card-block mx-2 ">
                <img class="card-img-top" src={pm} alt="Card  cap" />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="/search" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="tutors-near-you">
        <h1 className="sectionTitle">Highest Rated Tutors </h1>
        <div class="d-flex flex-row flex-nowrap overflow-auto horizontal-scrollable container-fluid">
          {tutors.map((tutor) => {
            return (
              <div class="card card-block mx-2 ">
                <img class="card-img-top" src={pm} alt="Card cap" />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="/search" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <Footer />
    </>
  );
};

export default HomePage;
