import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SET_SCROLL, UPDATE_FILE } from "../../constants";

export default (state = {}, action) => {
    const { file, id, scrollTop, type } = action;
    switch (type) {
        case ADD_FILE:
            return {
                ...state,
                [file.id]: {
                    ...file,
                    follow: true,
                    scrollTop: null
                }
            };
        case FOLLOW_FILE:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    follow: !state[id].follow,
                    scrollTop
                }
            };
        case REMOVE_FILE:
            const { [id]: toDelete, ...files } = state;
            return files;
        case SET_SCROLL:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    scrollTop
                }
            };
        case UPDATE_FILE:
            return {
                ...state,
                [file.id]: {
                    ...state[file.id],
                    content: file.content
                }
            };
    }
    return state;
}
