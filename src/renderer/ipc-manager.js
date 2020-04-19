import { ipcRenderer } from "electron";

import { addSuccess, removeSuccess } from "./state/file/actions";
import selectFile from "./views/log/actions";

export default class IpcManager {

    static registerListeners({ dispatch, getState }) {
        ipcRenderer.on("file:watching", (event, file) => {
            if (typeof file === "string") {
                const { file: { allIds } } = getState();
                const index = allIds.indexOf(file);
                dispatch(selectFile(index));
            } else {
                dispatch(addSuccess(file));
            }
        });

        ipcRenderer.on("log:unloaded", (event, deletedId) => {
            dispatch(removeSuccess(deletedId));
        });
    }

    static openFileInExplorer(id) {
        ipcRenderer.send("file:open-in-explorer", id);
    }
}
