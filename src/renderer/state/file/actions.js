import { ipcRenderer } from "electron";
import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SET_SCROLL, UPDATE_FILE } from "../../constants";

export const addFile = (name, path) => () => {
    ipcRenderer.send("file:added", name, path);
};

export const addFileSuccess = (file) => ({ type: ADD_FILE, file });

export const followFile = (id, scrollTop = null) => ({ type: FOLLOW_FILE, id, scrollTop });

export const removeFile = (id) => () => {
    ipcRenderer.send("file:removed", id);
};

export const removeFileSuccess = (id) => ({ type: REMOVE_FILE, id });

export const setScroll = (id, scrollTop) => ({ type: SET_SCROLL, id, scrollTop });

export const updateFile = (file) => ({ type: UPDATE_FILE, file });
