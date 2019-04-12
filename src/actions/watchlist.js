import { ipcRenderer } from "electron";
import { ADD_FILE, REMOVE_FILE, SELECT_FILE, UPDATE_FILE } from "../constants";

export const addFile = (name, path) => () => {
    ipcRenderer.send("file:added", name, path);
};

export const removeFile = (id) => () => {
    ipcRenderer.send("file:removed", id);
};

export const addFileSuccess = (file) => ({ type: ADD_FILE, file });

export const removeFileSuccess = (id) => ({ type: REMOVE_FILE, id });

export const selectFile = (index) => ({ type: SELECT_FILE, index });

export const updateFile = (file) => ({ type: UPDATE_FILE, file });
