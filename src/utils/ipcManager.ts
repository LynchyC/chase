import { ipcRenderer } from "electron";
import { Store } from "redux";
import { addFileSuccess, removeFileSuccess } from "../actions/fileActions";
import IStoreState, { IFile } from "../store/IStoreState";

export default class IPCManager {

    static registerListeners(store: Store<IStoreState, any>): void {
        ipcRenderer.on("file:watching", (event: Event, fileWithContent: IFile) => {
            store.dispatch(addFileSuccess(fileWithContent));
        });

        ipcRenderer.on("log:unloaded", (event: Event, deletedId: string) => {
            store.dispatch(removeFileSuccess(deletedId));
        });
    }
}