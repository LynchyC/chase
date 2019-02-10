import { ipcRenderer } from "electron";
import { ADD_FILE, REMOVE_FILE, UPDATE_FILE } from "./types";

export const addFile = (name, path) => () => {
    ipcRenderer.send("file:added", name, path);
};

export const removeFile = (id) => () => {
    ipcRenderer.send("file:removed", id);
};

export function addFileSuccess(file) {
    return { type: ADD_FILE, file };
}

export function removeFileSuccess(id) {
    return { type: REMOVE_FILE, id };
}

export function updateFile(file) {
    return { type: UPDATE_FILE, file };
}



