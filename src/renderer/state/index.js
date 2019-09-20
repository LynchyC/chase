import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import file from "renderer/state/file";

export default () => {
    return createStore(combineReducers({
        file
    }), {}, applyMiddleware(thunk));
}
