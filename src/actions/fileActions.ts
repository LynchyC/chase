import { ipcRenderer } from "electron";
import { Action, Dispatch } from "redux";
import { IFile } from "../store/IStoreState";
import { ADD_FILE, REMOVE_FILE } from "./types";

export interface IAddFileAction extends Action<string> {
    file: IFile;
}

export interface IRemoveFileAction extends Action<string> {
    fileId: number;
}

export const addFile = (path: string) => (dispatch: Dispatch<IAddFileAction>) => {
    ipcRenderer.send("file:added", path);
    ipcRenderer.on("file:watching", (event: Event, fileWithContent: IFile) => {
      dispatch(addFileSuccess(fileWithContent));
    });
};

export function addFileSuccess(file: IFile): IAddFileAction {
    return { type: ADD_FILE, file };
}

export function removeFile(fileId: number): IRemoveFileAction {
    return { type: REMOVE_FILE, fileId };
}


