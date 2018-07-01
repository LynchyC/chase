import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./components/App";
import "./styles/styles.scss";

const router = (
    <Router>
        <Route exact path="/" component={App} />
    </Router>
);

ReactDOM.render(router, document.getElementById("app"));
