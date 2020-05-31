import { watch } from "chokidar";
import { readFile } from "fs";
import uniqid from "uniqid";
import { promisify } from "util";
import log from "electron-log";

const promisifyReadFile = promisify(readFile);

class Watcher {
    _watcher = null;
    _files = {};

    _getByPath(path) {
        return Object.values(this._files)
            .find(file => file.path === path) || {};
    }

    async _getFileContent(path) {
        return promisifyReadFile(path, "utf-8");
    }

    initialize(mainWindow) {
        this._mainWindow = mainWindow;
    }

    getFile(id) {
        return this._files[id];
    }

    async add(name = "", path = "") {
        try {
            const { id } = this._getByPath(path);
            if (id) {
                this._mainWindow.webContents.send("file:watching", id)
            } else {
                const file = {
                    id: uniqid(),
                    name,
                    path,
                    content: await this._getFileContent(path)
                };
                if (!this._watcher) {
                    this._watcher = watch(path)
                        .on("change", this.update.bind(this))
                        .on("unlink", this.remove.bind(this))
                        .on("error", (error) => log.error(error));
                } else {
                    this._watcher.add(path);
                }
                this._files[file.id] = file;
                this._mainWindow.webContents.send("file:watching", file);
            }
        } catch (error) {
            log.error(error);
        }
    }

    async update(path) {
        try {
            const { id } = this._getByPath(path);
            this._files[id].content = await this._getFileContent(path);
            this._mainWindow.webContents.send("log:changed", this._files[id]);
        } catch (error) {
            log.error(error);
        }
    }

    remove(path) {
        try {
            const { id } = this._getByPath(path);
            this._watcher.unwatch(path);
            delete this._files[id];
            this._mainWindow.webContents.send("log:unloaded", id);
        } catch (error) {
            log.error(error);
        }
    }

    async end() {
        if (this._watcher) {
            await this._watcher.close();
            this._watcher = null;
        }
        this._files = {};
    }
}

export default new Watcher();
