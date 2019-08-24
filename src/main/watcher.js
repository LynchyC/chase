import { readFile } from "fs";
import watch from "node-watch";
import uniqid from "uniqid";
import { promisify } from "util";

const promisifyReadFile = promisify(readFile);

class Watcher {
    _watchers = {};
    _files = {};

    initialize(mainWindow) {
        this._mainWindow = mainWindow;
    }

    getFileByKeyValue(key, value) {
        return Object.values(this._files).find(file => {
            return file[key] === value;
        }) || {};
    }

    add(name = "", path = "") {
        const { id } = this.getFileByKeyValue("path", path);
        if (id) {
            this._mainWindow.webContents.send("file:watching", id)
        } else {
            const id = uniqid();
            this._watchers[id] = {
                id,
                watcher: watch(path, {}, this.eventHandler(id))
            };
            this.addFileToCollection(id, path, name);
        }
    }

    remove(id) {
        this._watchers[id].watcher.close();
        delete this._watchers[id];
        delete this._files[id];
        this._mainWindow.webContents.send("log:unloaded", id);
    }

    end() {
        Object.values(this._watchers).forEach(({ watcher }) => watcher.close());
        this._watchers = {};
        this._files = {};
    }

    async addFileToCollection(id, path, name) {
        const file = {
            id,
            name,
            path,
            content: await this.retrieveFileContents(path)
        };
        this._files[id] = file;
        this._mainWindow.webContents.send("file:watching", file);
    }

    async updateFileCollection(id, path) {
        try {
            this._files[id].content = await this.retrieveFileContents(path);
            this._mainWindow.webContents.send("log:changed", this._files[id]);
        } catch (error) {
            throw error;
        }
    }

    async retrieveFileContents(path) {
        return promisifyReadFile(path, "utf-8");
    }

    eventHandler = (id) => {
        return (event, filePath) => {
            switch (event) {
                case "update":
                    this.updateFileCollection(id, filePath);
                    break;
                case "remove":
                    this.remove(id);
                    break;
                default:
                    throw new Error(`Unknown event '${event}' has occurred.`);
            }
        };
    };
}

export default new Watcher();
