import { ipcRenderer } from "electron";
import { Action, Dispatch } from "redux";
import { IFile } from "../store/IStoreState";
import { ADD_FILE, REMOVE_FILE, UPDATE_FILE } from "./types";

export interface IAddFileAction extends Action<string> {
    file: IFile;
}

export interface IUpdateFileAction extends Action<string> {
    file: IFile;
}

export interface IRemoveFileAction extends Action<string> {
    id: string;
}

export const addFile = (name: string, path: string) => (dispatch: Dispatch<IAddFileAction>) => {
    ipcRenderer.send("file:added", name, path);
    ipcRenderer.on("file:watching", (event: Event, fileWithContent: IFile) => {
        dispatch(addFileSuccess(fileWithContent));
    });
};

export function addFileSuccess(file: IFile): IAddFileAction {
    return { type: ADD_FILE, file };
}

export function updateFile(file: IFile): IUpdateFileAction {
    return { type: UPDATE_FILE, file };
}

export function removeFile(id: string): IRemoveFileAction {
    return { type: REMOVE_FILE, id };
}


