import { BrowserWindow } from "electron";
import { FSWatcher, readFile } from "fs";
// @ts-ignore
import * as watch from "node-watch";
import * as uniqid from "uniqid";
import { promisify } from "util";

const promisifyReadFile = promisify(readFile);

interface IFile {
    id: string;
    name: string;
    path: string;
    content: string;
}

interface IWatcher {
    id: string;
    watcher: FSWatcher;
}

export default class Watcher {
    private _watchers: IWatcher[] = []; // holds collection of all watched files
    private _mainWindow: BrowserWindow; // Allows sending of ipc events
    private _files: IFile[] = []; // collection of data the renderer cares about

    constructor(mainWindow: BrowserWindow) {
        this._mainWindow = mainWindow;
    }

    getWatchedFiles(): IFile[] {
        return this._files;
    }

    add(name: string, path: string): void {
        const id = uniqid();
        this._watchers.push({
            id,
            watcher: watch(path, {}, this.eventHandler.bind(this))});
        this.addFileToCollection(id, path, name);
    }

    remove(id: string): void {
        this._watchers = this._watchers.filter((f) => {
            if (f.id === id) {
                f.watcher.close();
                this.removeFileFromCollection(id);
            } else {
                return f;
            }
        });
        this._mainWindow.webContents.send("log:unloaded" , id);
    }

    end() {
        this._watchers.map((w) => {
            w.watcher.close();
        });
        this._watchers = [];
        this._files = [];
    }

    private async addFileToCollection(id: string, path: string, name: string): Promise<void> {
        const file: IFile = {
            id,
            name,
            path,
            content: await this.retrieveFileContents(path),
        };
        this._files.push(file);
        this._mainWindow.webContents.send("file:watching", file);
    }

    private async updateFileCollection(path: string): Promise<void> {
        try {
            let file: IFile;
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

    private removeFileFromCollection(id: string): void {
        this._files = this._files.filter((f: IFile) => f.id !== id);
    }

    private eventHandler(event: string, filePath: string): void {
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

    private async retrieveFileContents(path: string): Promise<string> {
        return await promisifyReadFile(path, "utf-8");
    }
}
