import { ipcRenderer } from "electron";
import { Action } from "redux";
import IStoreState from "../store/IStoreState";
import { ADD_FILES, REMOVE_FILE } from "./types";

export interface IAddFileAction extends Action<string> {
    files: string[];
}

export interface IRemoveFileAction extends Action<string> {
    fileId: number;
}

export function addFiles(files: string[]): IAddFileAction {
    return { type: ADD_FILES, files };
}

export function removeFile(fileId: number): IRemoveFileAction {
    return { type: REMOVE_FILE, fileId };
}


