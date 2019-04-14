import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SELECT_FILE, UPDATE_FILE } from "../constants";

const addFile = (state, file) => {
    let { allFiles, files, selectedFile } = state;
    file.follow = true;
    allFiles.push(file.id);
    selectedFile = (allFiles.length - 1);
    files[file.id] = file;
    return { ...state, files, selectedFile };
};

const followFile = (state, id) => {
    const { files } = state;
    files[id].follow = !files[id].follow;
    return { ...state, files };
};

const updateFile = (state, file) => {
    const { files } = state;
    const { id, content } = file;
    files[id].content = content;
    return { ...state, files };
};

const removeFile = (state, fileId) => {
    let { allFiles, files, selectedFile } = state;
    delete files[fileId];

    const selectedFileIndex = allFiles.findIndex(id => id === fileId);
    if (selectedFileIndex === allFiles.length - 1 && allFiles.length > 1) {
        selectedFile -= 1;
    }

    allFiles.splice(selectedFileIndex, 1);
    return { ...state, allFiles, files, selectedFile };
};

export default (state = {}, action) => {
    const { file, id, index, type } = action;

    switch (type) {
        case ADD_FILE:
            return addFile(state, file);
        case FOLLOW_FILE:
            return followFile(state, id);
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

