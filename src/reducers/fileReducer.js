import { ADD_FILE, REMOVE_FILE, UPDATE_FILE } from "../actions/types";

export default function fileReducer(state, action) {
    switch (action.type) {
        case ADD_FILE:
            return {
                files: [
                    ...state.files,
                    action.file,
                ],
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

