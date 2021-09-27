import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Form, Table, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";

const Tutors = () => {
  const [number, setNumber] = useState(10);
  const [user, setUser] = useState();
  const [tutorData, setTutorData] = useState();
  const history = useHistory();

  const tutorList = async () => {
    const res = await fetch(
      "/admin/tutors?" +
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

  const deleteRecord = async (_id, name) => {
    console.log(_id);
    var answer = window.confirm(`Do you want to delete ${name} ?`);
    console.log(answer);
    if (answer === true) {
      const res = await fetch(
        "/admin/tutors?" +
          new URLSearchParams({
            _id,
          }),
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data && data.message === "success") {
        notify("Delete Successfully");
        window.location.reload(false);
      } else {
        notify("Delete Unsuccessfull");
      }
    }
  };

  const profileShow = (id) => {
    history.push({
      pathname: "/admin/profile",
      search: "?" + "user=" + "tutor" + "&id=" + id,
      state: { detail: ["tutor", id] },
    });
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
      <h1 className="admin-dash-heading">Tutors</h1>
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

          <span>Tutors</span>
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
                <th>Name</th>
                <th>Email</th>
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
                    <button
                      className="btn btn-info"
                      onClick={() => profileShow(t._id)}
                    >
                      View Profile
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteRecord(t._id, t.name)}
                    >
                      Delete Record
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

export default Tutors;
