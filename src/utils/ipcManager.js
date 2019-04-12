import { ipcRenderer } from "electron";
import { addFileSuccess, removeFileSuccess } from "../actions/watchlist";

export default class IPCManager {

    static registerListeners(store) {
        ipcRenderer.on("file:watching", (event, fileWithContent) => {
            store.dispatch(addFileSuccess(fileWithContent));
        });

        ipcRenderer.on("log:unloaded", (event, deletedId) => {
            store.dispatch(removeFileSuccess(deletedId));
        });
    }
}
