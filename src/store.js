import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import * as reducers from "./reducers";

const state = {
	files: [],
	tabIndex: 0
};

export default function configureStore() {
	return createStore(combineReducers({
		...reducers
	}), state, applyMiddleware(thunk));
}
