import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, UPDATE_FILE } from "renderer/constants";

export default (state = {}, action) => {
    const { file, id, type } = action;
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
                    follow: !state[id].follow
                }
            };
        case REMOVE_FILE:
            const { [id]: toDelete, ...files } = state;
            return files;
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
