import { ipcRenderer } from "electron";

import { addFileSuccess, removeFileSuccess } from "renderer/state/file/actions";
import selectFile from "renderer/views/log-view/actions";

export default class IpcManager {

    static registerListeners({ dispatch, getState }) {
        ipcRenderer.on("file:watching", (event, file) => {
            if (typeof file === "string") {
                const { file: { allIds } } = getState();
                const index = allIds.indexOf(file);
                dispatch(selectFile(index));
            } else {
                dispatch(addFileSuccess(file));
            }
        });

        ipcRenderer.on("log:unloaded", (event, deletedId) => {
            dispatch(removeFileSuccess(deletedId));
        });
    }

    static openFileInExplorer(id) {
        ipcRenderer.send("file:open-in-explorer", id);
    }
}
