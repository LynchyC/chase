import { ADD_FILE, REMOVE_FILE, SELECT_FILE, UPDATE_FILE } from "../constants";

const addFile = (state, file) => {
    let { files, selectedFile } = state;
    if (files.length > 0) {
        selectedFile += 1;
    }
    files.push(file);
    return { ...state, files, selectedFile };
};

const updateFile = (state, file) => {
    let { files } = state;
    files = files.map((f) => {
        if (f.id === file.id) {
            f.content = file.content;
        }
        return f;
    });
    return { ...state, files };
};

const removeFile = (state, id) => {
    let { files, selectedFile } = state;
    let index = null;
    files = files.filter((file, i) => {
        if (file.id === id) {
            index = i;
        } else {
            return true;
        }
    });

    if (index === selectedFile) {
        selectedFile = (selectedFile === 0) ? selectedFile : (selectedFile - 1);
    }
    return { ...state, files, selectedFile };
};

export default (state = {}, action) => {
    const { file, id, index, type } = action;

    switch (type) {
        case ADD_FILE:
            return addFile(state, file);
        case UPDATE_FILE:
            return updateFile(state, file);
        case REMOVE_FILE:
            return removeFile(state, id);
        case SELECT_FILE:
            return {
                ...state,
                selectedFile: index
            };
    }

    return state;
}

