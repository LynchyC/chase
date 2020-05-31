import { ipcMain, shell } from "electron";

import watcher from "./watcher";

const add = (e, name, path) => {
    watcher.add(name, path);
};

const remove = (e, path) => {
    watcher.remove(path);
};

const openInExplorer = (e, id) => {
    const { path } = watcher.getFile(id);
    shell.showItemInFolder(path);
};

export default () => {
    ipcMain.on("file:added", add);
    ipcMain.on("file:removed", remove);
    ipcMain.on("file:open-in-explorer", openInExplorer);
};
