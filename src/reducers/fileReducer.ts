import FileTypes from "../actions/actionTypes";
import { ADD_FILES, REMOVE_FILE } from "../actions/types";
import IStoreState from "../store/IStoreState";

export default function fileReducer(state: IStoreState[] = [], action: FileTypes) {
    switch (action.type) {
        case ADD_FILES:
            return [...state];
        case REMOVE_FILE:
            return state.filter((f) => f.id !== action.fileId);
        default:
            return state;
    }
}

