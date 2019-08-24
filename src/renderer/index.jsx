import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "renderer/style";
import FileSelection from "renderer/components/FileSelection";
import LogView from "renderer/components/LogView";
import configureStore from "renderer/store";
import IPCManager from "renderer/utils/ipcManager";

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

render(router, document.getElementById("app"));
