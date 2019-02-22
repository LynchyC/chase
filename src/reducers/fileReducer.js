import { ADD_FILE, REMOVE_FILE, UPDATE_FILE } from "../constants";

export default function fileReducer(state = [], action) {
    switch (action.type) {
        case ADD_FILE:
            return [
                ...state,
                action.file,
            ];
        case UPDATE_FILE:
            return state.map((file) => {
                if (file.id === action.file.id) {
                    file.content = action.file.content;
                }
                return file;
            });
        case REMOVE_FILE:
            return state.filter((f) => f.id !== action.id);
    }
    return state;
}

