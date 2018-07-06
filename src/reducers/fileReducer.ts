import FileTypes from "../actions/actionTypes";
import { ADD_FILE, REMOVE_FILE } from "../actions/types";
import IStoreState from "../store/IStoreState";

export default function fileReducer(state: IStoreState, action: FileTypes): IStoreState {
    switch (action.type) {
        case ADD_FILE:
            return {
                files: state.files.concat(action.file),
            };
        case REMOVE_FILE:
            return {
                files: state.files.filter((f) => f.id !== action.fileId),
            };
        default:
            return state;
    }
}

