import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SELECT_FILE, UPDATE_FILE } from "renderer/constants";

const defaultState = {
    allIds: [],
    byId: {},
    selected: null
};

const removeFile = (state, fileId) => {
    const { allIds, byId: { [fileId]: toDelete, ...files } } = state;
    let selected = state.selected;
    if (allIds.length > 1 && selected > 0 && selected === allIds.length - 1) {
        selected = state.selected - 1;
    }
    return {
        ...state,
        allIds: allIds.filter(id => id !== fileId),
        byId: files,
        selected
    };
};

export default (state = defaultState, action) => {
    const { file, id, selected, type } = action;

    switch (type) {
        case ADD_FILE:
            return {
                ...state,
                allIds: [
                    ...state.allIds,
                    file.id
                ],
                byId: {
                    ...state.byId,
                    [file.id]: {
                        ...file,
                        follow: true,
                        scrollTop: null
                    }
                },
                selected: state.allIds.length
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
