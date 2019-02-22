import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "./style";
import FileSelection from "./components/FileSelection";
import LogView from "./components/LogView";
import configureStore from "./store";
import IPCManager from "./utils/ipcManager";

const store = configureStore();

const router = (
    <Provider store={store}>
        <Fragment>
            <GlobalStyle/>
            <Router>
                <Switch>
                    <Route exact path="/" component={FileSelection}/>
                    <Route path="/logs" component={LogView}/>
                </Switch>
            </Router>
        </Fragment>
    </Provider>
);

IPCManager.registerListeners(store);

ReactDOM.render(router, document.getElementById("app"));
