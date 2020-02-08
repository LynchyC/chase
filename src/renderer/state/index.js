import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import crossSlice from "./cross-slice";
import file from "./file";
import view from "../views";

const reducer = (state, action) => {
    const combined = combineReducers({ file, view });
    return crossSlice(combined(state, action), action);
};


export default () => {
    return createStore(reducer, {}, applyMiddleware(thunk));
}
