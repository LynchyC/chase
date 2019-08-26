import { ipcMain, shell } from "electron";

import watcher from "main/watcher";

const add = (e, name, path) => {
    watcher.add(name, path);
};

const remove = (e, id) => {
    watcher.remove(id);
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
