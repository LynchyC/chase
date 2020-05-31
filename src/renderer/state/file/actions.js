import { ipcRenderer } from "electron";
import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SET_SCROLL, UPDATE_FILE } from "../../constants";

export const add = (name, path) => () => {
    ipcRenderer.send("file:added", name, path);
};

export const addSuccess = (file) => ({ type: ADD_FILE, file });

export const follow = (id, scrollTop = null) => ({ type: FOLLOW_FILE, id, scrollTop });

export const remove = (path) => () => {
    ipcRenderer.send("file:removed", path);
};

export const removeSuccess = (id) => ({ type: REMOVE_FILE, id });

export const setPosition = (id, scrollTop) => ({ type: SET_SCROLL, id, scrollTop });

export const update = (file) => ({ type: UPDATE_FILE, file });
