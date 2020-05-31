import { watch } from "chokidar";
import { readFile } from "fs";
import uniqid from "uniqid";
import { promisify } from "util";
import log from "electron-log";

const promisifyReadFile = promisify(readFile);

class Watcher {
    #files = {};
    #watcher = null;
    #window = null;

    #getByPath(path) {
        return Object.values(this.#files)
            .find(file => file.path === path) || {};
    }

    async #getFileContent(path) {
        return promisifyReadFile(path, "utf-8");
    }

    initialize(window) {
        this.#window = window;
    }

    getFile(id) {
        return this.#files[id];
    }

    async add(name = "", path = "") {
        try {
            const { id } = this.#getByPath(path);
            if (id) {
                this.#window.webContents.send("file:watching", id)
            } else {
                const file = {
                    id: uniqid(),
                    name,
                    path,
                    content: await this.#getFileContent(path)
                };
                if (!this.#watcher) {
                    this.#watcher = watch(path)
                        .on("change", this.update.bind(this))
                        .on("unlink", this.remove.bind(this))
                        .on("error", (error) => log.error(error));
                } else {
                    this.#watcher.add(path);
                }
                this.#files[file.id] = file;
                this.#window.webContents.send("file:watching", file);
            }
        } catch (error) {
            log.error(error);
        }
    }

    async update(path) {
        try {
            const { id } = this.#getByPath(path);
            this.#files[id].content = await this.#getFileContent(path);
            this.#window.webContents.send("log:changed", this.#files[id]);
        } catch (error) {
            log.error(error);
        }
    }

    remove(path) {
        try {
            const { id } = this.#getByPath(path);
            this.#watcher.unwatch(path);
            delete this.#files[id];
            this.#window.webContents.send("log:unloaded", id);
        } catch (error) {
            log.error(error);
        }
    }

    async end() {
        this.#files = {};
        if (this.#watcher) {
            await this.#watcher.close();
            this.#watcher = null;
        }
        this.#window = null;
    }
}

export default new Watcher();
