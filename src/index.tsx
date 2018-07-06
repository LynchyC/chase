import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FileSelection from "./components/FileSelection";
import configureStore from "./store/configureStore";
import "./styles/styles.scss";

const store = configureStore();

const router = (
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={FileSelection} />
        </Router>
    </Provider>
);

ReactDOM.render(router, document.getElementById("app"));
