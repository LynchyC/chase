import { ADD_FILE, REMOVE_FILE } from "../../constants";

export default (state, { type }) => {
    switch (type) {
        case ADD_FILE:
            return {
                ...state,
                view: {
                    ...state.view,
                    log: Object.keys(state.file).length - 1
                }
            };
        case REMOVE_FILE:
            const { file, view: { log } } = state;
            const count = Object.keys(file).length;
            return {
                ...state,
                view: {
                    ...state.view,
                    log: (count && log && log === count) ? log - 1 : log
                }
            };
    }
    return state;
};
