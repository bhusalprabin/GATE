import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Form, Table, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import { SRLWrapper } from "simple-react-lightbox";
const Verify = () => {
  const [number, setNumber] = useState(10);
  const [user, setUser] = useState();
  const [tutorData, setTutorData] = useState();
  const history = useHistory();

  const tutorList = async () => {
    const res = await fetch(
      "/admin/verify?" +
        new URLSearchParams({
          number: number,
          user: user,
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
    setTutorData(data);
  };

  const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify1 = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    tutorList();
  }, [number, user]);

  const rejectTutor = async (_id) => {
    console.log(_id);
    var answer = window.confirm(`Do you want to reject ?`);
    console.log(answer);
    if (answer === true) {
      const res = await fetch(
        "/admin/reject?" +
          new URLSearchParams({
            _id,
          }),
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data && data.message === "success") {
        notify("Rejected Successfully");
        window.location.reload(false);
      } else {
        notify1("Rejected Unsuccessfull");
      }
    }
  };

  const verifyTutor = async (_id) => {
    console.log(_id);
    var answer = window.confirm(`Do you want to verify ?`);
    console.log(answer);
    if (answer === true) {
      const res = await fetch(
        "/admin/verified?" +
          new URLSearchParams({
            _id,
          }),
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data && data.message === "success") {
        notify("Verified Successfully");
        window.location.reload(false);
      } else {
        notify1("Verified Unsuccessfull");
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="admin-dash-heading">Verify Tutor Request</h1>
      <div className="admin-form-top">
        <div className="admin-dash-form-number">
          <span>List Number Of</span>
          <Form>
            <Form.Group className="mb-0" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="10"
                min={1}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
          </Form>

          <span>Course Take</span>
        </div>
        <div className="admin-dash-form-search">
          <span>Search</span>
          <Form>
            <Form.Group className="mb-0" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="admin-dash-records">
        {tutorData && tutorData.length !== 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Tutor Name</th>
                <th>Tutor Email</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorData.map((t, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>{t.name}</td>
                  <td>{t.email}</td>
                  <td>
                    <SRLWrapper>
                      <img
                        src={`data:image/png;base64,${t.certificate}`}
                        alt="certificate"
                        className="admin-certificate"
                      />
                    </SRLWrapper>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => rejectTutor(t._id)}
                    >
                      Reject
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-success"
                      onClick={() => verifyTutor(t._id)}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No Data Available</p>
        )}
      </div>
    </div>
  );
};

export default Verify;
