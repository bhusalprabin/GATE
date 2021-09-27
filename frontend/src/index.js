import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SimpleReactLightbox from "simple-react-lightbox";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <SimpleReactLightbox>
    <App />
  </SimpleReactLightbox>,
  document.getElementById("root")
);
