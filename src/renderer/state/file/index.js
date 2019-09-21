import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SELECT_FILE, UPDATE_FILE } from "renderer/constants";

const defaultState = {
    byId: {},
    selected: null
};

const removeFile = (state, fileId) => {
    const { byId: { [fileId]: toDelete, ...files } } = state;
    const ids = Object.keys(state.byId);
    let selected = state.selected;
    if (ids.length > 1 && selected > 0 && selected === ids.length - 1) {
        selected = state.selected - 1;
    }
    return { ...state, byId: files, selected };
};

export default (state = defaultState, action) => {
    const { file, id, selected, type } = action;

    switch (type) {
        case ADD_FILE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [file.id]: {
                        ...file,
                        follow: true,
                        scrollTop: null
                    }
                },
                selected: Object.keys(state.byId).length
            };
        case FOLLOW_FILE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]: {
                        ...state.byId[id],
                        follow: !state.byId[id].follow
                    }
                }
            };
        case REMOVE_FILE:
            return removeFile(state, id);
        case SELECT_FILE:
            return { ...state, selected };
        case UPDATE_FILE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [file.id]: {
                        ...state.byId[file.id],
                        content: file.content
                    }
                }
            };
    }
    return state;
}
