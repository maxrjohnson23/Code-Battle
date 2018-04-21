import React from "react";
import ReactDOM from "react-dom";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.css";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "font-awesome/css/font-awesome.min.css";


ReactDOM.render(<BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById("root"));
registerServiceWorker();
