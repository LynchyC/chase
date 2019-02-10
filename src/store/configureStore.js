import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import fileReducer from "../reducers/fileReducer";

const state = {
    files: []
};

export default function configureStore() {
    return createStore(fileReducer, state, applyMiddleware(thunk));
}
