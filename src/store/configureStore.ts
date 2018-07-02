import { createStore } from "redux";
import fileReducer from "../reducers/fileReducer";
import IStoreState from "./IStoreState";

export default function configureStore(initialState: IStoreState[] = []) {
    return createStore(fileReducer, initialState);
}
