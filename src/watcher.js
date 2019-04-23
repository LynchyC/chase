import { readFile } from "fs";
import watch from "node-watch";
import uniqid from "uniqid";
import { promisify } from "util";

const promisifyReadFile = promisify(readFile);

export default class Watcher {

    constructor(mainWindow) {
        this._mainWindow = mainWindow;
        this._watchers = [];
        this._files = []
    }

    getWatchedFiles() {
        return this._files;
    }

    getFile(id) {
        return this.getWatchedFiles().find(file => file.id === id);
    }

    add(name, path) {
        if (name && path) {
            const id = uniqid();
            this._watchers.push({
                id,
                watcher: watch(path, {}, this.eventHandler.bind(this))
            });
            this.addFileToCollection(id, path, name);
        }
    }

    remove(id) {
        this._watchers = this._watchers.filter((f) => {
            if (f.id === id) {
                f.watcher.close();
                this.removeFileFromCollection(id);
            } else {
                return f;
            }
        });
        this._mainWindow.webContents.send("log:unloaded", id);
    }

    end() {
        this._watchers.map((w) => {
            w.watcher.close();
        });
        this._watchers = [];
        this._files = [];
    }

    async addFileToCollection(id, path, name) {
        const file = {
            id,
            name,
            path,
            content: await this.retrieveFileContents(path),
        };
        this._files.push(file);
        this._mainWindow.webContents.send("file:watching", file);
    }

    async updateFileCollection(path) {
        try {
            let file;
            const fileContent = await this.retrieveFileContents(path);
            this._files = this._files.map((f) => {
                if (f.path === path) {
                    f.content = fileContent;
                    file = f;
                }
                return f;
            });
            this._mainWindow.webContents.send("log:changed", file);
        } catch (error) {
            throw error;
        }
    }

    removeFileFromCollection(id) {
        this._files = this._files.filter((f) => f.id !== id);
    }

    eventHandler(event, filePath) {
        switch (event) {
            case "update":
                this.updateFileCollection(filePath);
                break;
            case "remove":
                const { id } = this._files.find((f) => f.path === filePath);
                this.remove(id);
                break;
            default:
                throw new Error(`Unknown event '${event}' has occurred.`);
        }
    }

    async retrieveFileContents(path) {
        return await promisifyReadFile(path, "utf-8");
    }
}
