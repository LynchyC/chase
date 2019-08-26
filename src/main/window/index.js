import { app } from "electron";

import watcher from "main/watcher";
import registerMenu from "main/window/menu";
import create from "main/window/create";

const isDev = process.env.NODE_ENV === "development";
let window;

const activate = () => {
    if (window === null) {
        window = create(isDev);
    }
};

const quit = () => {
    watcher.end();
};

const ready = () => {
    window = create(isDev);
    registerMenu(window, isDev);
};

const windowAllClosed = () => {
    app.quit();
};

export default () => {
    app.on("activate", activate);
    app.on("quit", quit);
    app.on("ready", ready); // Event invokes first
    app.on("window-all-closed", windowAllClosed);
}
