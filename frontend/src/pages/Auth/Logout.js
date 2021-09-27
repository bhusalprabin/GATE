import React, { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import { Spinner } from "react-bootstrap";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    fetch("/students/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: 0 });
        localStorage.setItem("isLogged", "0");
        history.push("/", { replace: true });
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="spinner-logout">
      <Spinner animation="grow" />
    </div>
  );
};

export default Logout;
