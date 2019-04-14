import { ipcRenderer } from "electron";
import { ADD_FILE, FOLLOW_FILE, REMOVE_FILE, SELECT_FILE, SET_SCROLL, UPDATE_FILE } from "../constants";

export const addFile = (name, path) => () => {
    ipcRenderer.send("file:added", name, path);
};

export const addFileSuccess = (file) => ({ type: ADD_FILE, file });

export const followFile = (id, scrollTop) => (dispatch) => {
    dispatch(setScroll(id, scrollTop));
    dispatch(({ type: FOLLOW_FILE, id }));
};

export const removeFile = (id) => () => {
    ipcRenderer.send("file:removed", id);
};

export const removeFileSuccess = (id) => ({ type: REMOVE_FILE, id });

export const selectFile = (index, scrollTop) => (dispatch, getState) => {
    const { watchlist } = getState();
    const { allFiles, selectedFile } = watchlist;
    dispatch(setScroll(allFiles[selectedFile], scrollTop));
    dispatch(({ type: SELECT_FILE, index }));
};

export const setScroll = (id, scrollTop) => ({ type: SET_SCROLL, id, scrollTop });

export const updateFile = (file) => ({ type: UPDATE_FILE, file });
