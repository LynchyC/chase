import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import * as reducers from "reducers";

const state = {
    watchlist: {
        files: {},
        allFiles: [],
        selectedFile: 0
    }
};

export default function configureStore() {
    return createStore(combineReducers({
        ...reducers
    }), state, applyMiddleware(thunk));
}
