import { FSWatcher } from "chokidar";
import { BrowserWindow } from "electron";
import { readFile } from "fs";
import * as uniqid from "uniqid";
import { promisify } from "util";

interface IFile {
    id: string;
    name: string;
    path: string;
    content: string;
}

export default class Watcher {
    private _chokidar: FSWatcher;
    private _mainWindow: BrowserWindow;
    private _readFile: any;
    private _files: IFile[] = [];

    constructor(chokidar: FSWatcher, mainWindow: BrowserWindow) {
        this._chokidar = chokidar;
        this._mainWindow = mainWindow;
        this._readFile = promisify(readFile);

        this._chokidar.on("add", (path) => this.onAdd(path));
        this._chokidar.on("change", async (path) => await this.onChange(path));
        this._chokidar.on("unlink", (path) => this.onRemove(path));
    }

    add(name: string, path: string): void {
        const file: IFile = {
            id: uniqid(),
            name,
            path,
            content: "",
        };
        this._files.push(file);
        this._chokidar.add(path);
    }

    end() {
        this._chokidar.close();
    }

    getWatchedFiles(): IFile[] {
        return this._files;
    }

    remove(id: string): void {
        const { path } = this._files.find((f) => f.id === id);
        this._chokidar.unwatch(path);
    }

    private onAdd(path: string): void {
        const file = this._files.find((f) => f.path === path);
        this._mainWindow.webContents.send("file:watching", file);
    }

    private async onChange(path: string): Promise<void> {
        try {
            const fileContents = await this.retrieveFileContents(path);
            let fileToSend: IFile;
            this._files = this._files.map((file: IFile) => {
                if (file.path === path) {
                    file.content = fileContents;
                    fileToSend = file;
                }
                return file;
            });
            this._mainWindow.webContents.send("log:loaded", fileToSend);
        } catch (error) {
            throw error;
        }
    }

    private onRemove(path: string): void {
        this._files = this._files.filter((f: IFile) => f.path !== path);
        this._mainWindow.webContents.send("log:unloaded");
    }

    private async retrieveFileContents(path: string): Promise<string> {
        const fileContent: string = await this._readFile(path, "utf-8");
        return fileContent;
    }
}
