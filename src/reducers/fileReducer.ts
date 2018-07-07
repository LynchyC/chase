import FileTypes from "../actions/actionTypes";
import { ADD_FILE, REMOVE_FILE, UPDATE_FILE } from "../actions/types";
import IStoreState from "../store/IStoreState";

export default function fileReducer(state: IStoreState, action: FileTypes): IStoreState {
    switch (action.type) {
        case ADD_FILE:
            return {
                files: state.files.concat(action.file),
            };
        case UPDATE_FILE:
            return {
                files: state.files.map((file) => {
                    if (file.id === action.file.id) {
                        file.content = action.file.content;
                    }
                    return file;
                }),
            };
        case REMOVE_FILE:
            return {
                files: state.files.filter((f) => f.id !== action.id),
            };
        default:
            return state;
    }
}

