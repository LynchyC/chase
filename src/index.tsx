import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FileSelection from "./components/FileSelection";
import LogView from "./components/LogView";
import configureStore from "./store/configureStore";
import "./styles/styles.scss";

const store = configureStore();

const router = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={FileSelection} />
                <Route path="/logs" component={LogView} />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(router, document.getElementById("app"));
