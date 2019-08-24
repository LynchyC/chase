import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SELECT_FILE, SET_SCROLL, UPDATE_FILE } from "renderer/constants";

const addFile = (state, file) => {
    let { allFiles, files, selectedFile } = state;
    allFiles.push(file.id);
    selectedFile = (allFiles.length - 1);
    files[file.id] = {
        ...file,
        follow: true,
        scrollTop: null
    };
    return { ...state, files, selectedFile };
};

const followFile = (state, id) => {
    const { files } = state;
    files[id].follow = !files[id].follow;
    if(files[id].follow) files[id].scrollTop = null;
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
    if (allFiles.length > 1 && selectedFile > 0 && selectedFile === allFiles.length - 1) {
        selectedFile -= 1;
    }

    allFiles.splice(selectedFileIndex, 1);
    return { ...state, allFiles, files, selectedFile };
};

const setFileScrollTop = (state, id, scrollTop) => {
    let { files } = state;
    files[id].scrollTop = scrollTop;
    return { ...state, files };
};

export default (state = {}, action) => {
    const { file, id, index, scrollTop, type } = action;

    switch (type) {
        case ADD_FILE:
            return addFile(state, file);
        case FOLLOW_FILE:
            return followFile(state, id);
        case REMOVE_FILE:
            return removeFile(state, id);
        case SELECT_FILE:
            return {
                ...state,
                selectedFile: index
            };
        case SET_SCROLL:
            return setFileScrollTop(state, id, scrollTop);
        case UPDATE_FILE:
            return updateFile(state, file);
    }
    return state;
}

