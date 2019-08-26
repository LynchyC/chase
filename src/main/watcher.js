import { readFile } from "fs";
import watch from "node-watch";
import uniqid from "uniqid";
import { promisify } from "util";

const promisifyReadFile = promisify(readFile);

class Watcher {
    _watcher = null;
    _files = {};

    _eventHandler = (event, path) => {
        const { id } = this._getByPath(path);
        switch (event) {
            case "update":
                this.update(id, path);
                break;
            case "remove":
                this.remove(id);
                break;
            default:
                throw new Error(`Unknown event '${event}' has occurred.`);
        }
    };

    _getByPath(path) {
        return Object.values(this._files)
            .find(file => file.path === path) || {};
    }

    async _getFileContent(path) {
        return promisifyReadFile(path, "utf-8");
    }

    _getPaths() {
        return Object.values(this._files).map(({ path }) => path);
    }

    _set(paths = []) {
        if (this._watcher) {
            this._watcher.close();
        }
        this._watcher = paths.length ? watch(paths, {}, this._eventHandler) : null;
    }

    initialize(mainWindow) {
        this._mainWindow = mainWindow;
    }

    getFile(id) {
        return this._files[id];
    }

    async add(name = "", path = "") {
        const { id } = this._getByPath(path);
        if (id) {
            this._mainWindow.webContents.send("file:watching", id)
        } else {
            const paths = this._getPaths();
            const file = {
                id: uniqid(),
                name,
                path,
                content: await this._getFileContent(path)
            };
            this._set([...paths, path]);
            this._files[file.id] = file;
            this._mainWindow.webContents.send("file:watching", file);
        }
    }

    async update(id, path) {
        try {
            this._files[id].content = await this._getFileContent(path);
            this._mainWindow.webContents.send("log:changed", this._files[id]);
        } catch (error) {
            throw error;
        }
    }

    remove(id) {
        const { path } = this.getFile(id);
        const paths = [...this._getPaths()].filter(p => p !== path);
        this._set(paths);
        delete this._files[id];
        this._mainWindow.webContents.send("log:unloaded", id);
    }

    end() {
        this._watcher = null;
        this._files = {};
    }
}

export default new Watcher();
