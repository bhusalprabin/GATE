import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Form, Table, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";

const Subjects = () => {
  const [number, setNumber] = useState(10);
  const [user, setUser] = useState();
  const [tutorData, setTutorData] = useState();
  const history = useHistory();
  const [courseName, setCourseName] = useState();
  const [courseId, setCourseId] = useState();

  const tutorList = async () => {
    const res = await fetch(
      "/admin/subject?" +
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
    console.log("hello");
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

  const rejectSubject = async (_id) => {
    console.log(_id);
    var answer = window.confirm(`Do you want to reject ?`);
    console.log(answer);
    if (answer === true) {
      const res = await fetch(
        "/admin/reject-subject?" +
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

  const approveSubject = async ({ _id, course_name, course_id, tutor }) => {
    var answer = window.confirm(`Do you want to approve ?`);
    if (answer === true) {
      const res = await fetch("/admin/approve-subject", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          course_name,
          course_id,
          tutor: tutor,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data && data.message === "success") {
        notify("Approved Successfully");
        window.location.reload(false);
      } else {
        notify1("Approved Unsuccessfull");
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
      <h1 className="admin-dash-heading">Subject Request</h1>
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

          <span>Students</span>
        </div>
        <div className="admin-dash-form-search">
          <span>Search</span>
          <Form>
            <Form.Group className="mb-0" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Name"
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
                <th>Subject Name</th>
                <th>Code Name</th>
                <th>Issued By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorData.map((t, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {t.course_name}
                  </td>
                  <td>{t.course_id}</td>
                  <td>{t.tutor}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        approveSubject({
                          _id: t._id,
                          course_name: t.course_name,
                          course_id: t.course_id,
                          tutor: t.tutor,
                        })
                      }
                    >
                      Approved
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => rejectSubject(t._id)}
                    >
                      Reject
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

export default Subjects;
