import { ipcRenderer } from "electron";
import { addFileSuccess, removeFileSuccess, selectFile } from "renderer/actions/watchlist";

export default class IPCManager {

    static registerListeners(store) {
        ipcRenderer.on("file:watching", (event, file) => {
            if (typeof file === "string") {
                const { watchlist } = store.getState();
                const { allFiles } = watchlist;
                const index = allFiles.indexOf(file);
                store.dispatch(selectFile(index));
            } else {
                store.dispatch(addFileSuccess(file));
            }
        });

        ipcRenderer.on("log:unloaded", (event, deletedId) => {
            store.dispatch(removeFileSuccess(deletedId));
        });
    }

    static openFileInExplorer(id) {
        ipcRenderer.send("file:open-in-explorer", id);
    }
}
