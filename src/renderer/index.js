import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "renderer/style";
import FileSelection from "renderer/views/file-selection";
import LogView from "renderer/views/log-view";
import configureStore from "renderer/state";
import IpcManager from "renderer/ipc-manager";

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

IpcManager.registerListeners(store);

render(router, document.getElementById("app"));
