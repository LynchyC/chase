import { ipcRenderer } from "electron";
import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, UPDATE_FILE } from "renderer/constants";

export const addFile = (name, path) => () => {
    ipcRenderer.send("file:added", name, path);
};

export const addFileSuccess = (file) => ({ type: ADD_FILE, file });

export const followFile = (id) => (dispatch) => {
    dispatch(({ type: FOLLOW_FILE, id }));
};

export const removeFile = (id) => () => {
    ipcRenderer.send("file:removed", id);
};

export const removeFileSuccess = (id) => ({ type: REMOVE_FILE, id });

export const updateFile = (file) => ({ type: UPDATE_FILE, file });
